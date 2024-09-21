import { CommandRuntime } from './CommandRuntime.js'
import { InputIterator } from './InputIterator.js'
import { numberToSlotId, showError as showErrorBase } from './utils.js'
import { SlotIterator } from './SlotIterator.js'

import { defaultFactories } from './commands/index.js'
import { LayoutManager } from './LayoutManager.js'

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

    let [acronym, ...args] = value.trim().replaceAll(',', '').split(' ')

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

/**
 * Import algorithm from a string array.
 *
 * @param {string[]} algorithm - Algorithm to import.
 */
export const importAlgorithmFromString = (algorithm) => {
  const numberOfSlots = algorithm.length

  const slotIterator = new SlotIterator(numberOfSlots)

  clear(numberOfSlots)

  for (const slot of slotIterator) {
    const [slotId, ...rest] = algorithm
      .shift()
      .split(':')
      .map((item) => item.trim())

    const slotElement = document.getElementById(slotId)

    if (!slotElement) {
      showError(`Erro de Importação: Slot ${slotId} não encontrado!`)
      continue
    }

    slotElement.value = rest.join(':')
  }
}

/**
 * Export current slots algorithm to a string.
 *
 * @param {number} numberOfSlots
 * @returns {string[]}
 */
export const exportAlgorithmToString = (numberOfSlots) => {
  const slotIterator = new SlotIterator(numberOfSlots)

  /**
   * @type {string[]}
   */
  const algorithm = []

  for (const slot of slotIterator) {
    const slotId = numberToSlotId(slot)
    const slotElement = document.getElementById(slotId)

    if (!slotElement) {
      showError(`Erro de Exportação: Slot ${slotId} não encontrado!`)
      continue
    }

    const isEmpty = !String(slotElement.value).trim()

    if (!isEmpty) {
      algorithm.push(`${slotId}: ${slotElement.value ?? ''}`)
    }
  }

  return algorithm
}

export const stop = () => {
  lastIteratorInstance?.stop()
}

export const reset = () => {
  lastIteratorInstance?.reset()
  lastInputIteratorInstance?.reset()
}

export const resizeSlots = (numberOfSlots) => {
  const layoutManager = new LayoutManager()

  layoutManager.generateLayout(numberOfSlots)
}
