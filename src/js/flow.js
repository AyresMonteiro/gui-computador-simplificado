import { CommandRuntime } from './CommandRuntime.js'
import { DataIterator } from './DataIterator.js'
import { numberToSlotId, showError as showErrorBase } from './utils.js'
import { SlotIterator } from './SlotIterator.js'

import { backCommandFactory } from './commands/back.js'
import { copyCommand } from './commands/copy.js'
import { divideCommand } from './commands/divide.js'
import { ifCommandFactory } from './commands/if.js'
import { multiplyCommand } from './commands/multiply.js'
import { printCommand } from './commands/print.js'
import { readCommandFactory } from './commands/read.js'
import { stopCommandFactory } from './commands/stop.js'
import { subtractCommand } from './commands/subtract.js'
import { sumCommand } from './commands/sum.js'

export const showError = showErrorBase;

const runtimeFactory = (numberOfSlots, data) => {
  const mainIterator = new SlotIterator(numberOfSlots)
  const dataIterator = new DataIterator(data)

  const commandRuntime = CommandRuntime.getInstance()

  commandRuntime.appendCommand(backCommandFactory(mainIterator))
  commandRuntime.appendCommand(copyCommand)
  commandRuntime.appendCommand(divideCommand)
  commandRuntime.appendCommand(ifCommandFactory(mainIterator))
  commandRuntime.appendCommand(multiplyCommand)
  commandRuntime.appendCommand(printCommand)
  commandRuntime.appendCommand(readCommandFactory(dataIterator))
  commandRuntime.appendCommand(stopCommandFactory(mainIterator))
  commandRuntime.appendCommand(subtractCommand)
  commandRuntime.appendCommand(sumCommand)

  return { mainIterator, commandRuntime, dataIterator }
}

let lastSlotsNumber = 0
let lastStringifiedData = ''
let lastIteratorInstance = null
let lastDataIteratorInstance = null
let generatedRuntimeData = null

const memoizedRuntimeFactory = (numberOfSlots, data) => {
  if (
    lastStringifiedData === JSON.stringify(data) &&
    lastSlotsNumber === numberOfSlots &&
    generatedRuntimeData
  ) {
    return generatedRuntimeData
  }

  const runtimeData = runtimeFactory(numberOfSlots, data)

  lastSlotsNumber = numberOfSlots
  lastStringifiedData = JSON.stringify(data)
  generatedRuntimeData = runtimeData
  lastIteratorInstance = runtimeData.mainIterator
  lastDataIteratorInstance = runtimeData.dataIterator

  return runtimeData
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function run(numberOfSlots, data, speed) {
  let text = document.getElementById('printed-text')
  let errors = document.getElementById('errors')
  text.innerHTML = ''
  errors.innerHTML = ''

  const { mainIterator, commandRuntime } = memoizedRuntimeFactory(
    numberOfSlots,
    data
  )

  for (let slot of mainIterator) {
    const slotId = numberToSlotId(slot)
    const slotElement = document.getElementById(slotId)

    slotElement.focus()

    let { value } = slotElement

    if (!value) {
      showError(`E${slot}: Escaninho em branco! Use o comando PARE.`)
      break
    }

    value = value.toUpperCase()

    let [acronym, ...args] = value.trim().split(' ')

    try {
      commandRuntime.executeCommand(acronym, ...args)
    } catch (err) {
      showError(`E${slot}: ${err}`)
    }

    // eslint-disable-next-line no-await-in-loop
    await sleep(speed * 1000)
  }
}

export const stop = () => {
  lastIteratorInstance?.stop()
}

export const reset = () => {
  lastIteratorInstance?.reset()
  lastDataIteratorInstance?.reset()
}
