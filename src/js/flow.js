import { CommandRuntime } from './CommandRuntime.js'
import { InputIterator } from './InputIterator.js'
import { numberToSlotId, showError as showErrorBase } from './utils.js'
import { SlotIterator } from './SlotIterator.js'

import { defaultFactories } from './commands/index.js'

export const showError = showErrorBase

const runtimeFactory = (numberOfSlots, data) => {
  const mainIterator = new SlotIterator(numberOfSlots)
  const inputIterator = new InputIterator(data)

  const commandRuntime = CommandRuntime.getInstance()

  defaultFactories.forEach((Factory) => {
    const factory = new Factory()

    commandRuntime.appendCommand(factory.build(mainIterator, inputIterator))
  })

  return { mainIterator, commandRuntime, inputIterator }
}

let lastSlotsNumber = 0
let lastStringifiedData = ''
let lastIteratorInstance = null
let lastInputIteratorInstance = null
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
  lastInputIteratorInstance = runtimeData.inputIterator

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
      showError(`${slotId}: Escaninho em branco! Use o comando PARE.`)
      break
    }

    value = value.toUpperCase()

    let [acronym, ...args] = value.trim().split(' ')

    try {
      commandRuntime.executeCommand(acronym, ...args)
    } catch (err) {
      showError(`${slotId}: ${err}`)
    }

    // eslint-disable-next-line no-await-in-loop
    await sleep(speed * 1000)
  }
}

/**
 * Clear all slots.
 *
 * @param {number} numberOfSlots
 */
export const clear = (numberOfSlots) => {
  const slotIterator = new SlotIterator(numberOfSlots)

  for (const slot of slotIterator) {
    const slotId = numberToSlotId(slot)
    const slotElement = document.getElementById(slotId)

    slotElement.value = ''
  }
}

export const stop = () => {
  lastIteratorInstance?.stop()
}

export const reset = () => {
  lastIteratorInstance?.reset()
  lastInputIteratorInstance?.reset()
}
