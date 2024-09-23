import { CommandRuntime } from './CommandRuntime.js'
import { InputIterator } from './InputIterator.js'
import {
  getIndexFromSlotString,
  numberToSlotId,
  showError as showErrorBase,
} from './utils.js'
import { SlotIterator } from './SlotIterator.js'

import { defaultFactories } from './commands/index.js'
import { LayoutManager } from './LayoutManager.js'

export const showError = showErrorBase

class RuntimeData {
  /**
   * @type {SlotIterator}
   */
  mainIterator
  /**
   * @type {CommandRuntime}
   */
  commandRuntime
  /**
   * @type {InputIterator}
   */
  inputIterator
}

/**
 * Factory function for creating runtime data.
 *
 * @param {number} numberOfSlots
 * @param {string} data
 * @returns {RuntimeData}
 */
const runtimeFactory = (numberOfSlots, data) => {
  const mainIterator = new SlotIterator(numberOfSlots)
  const inputIterator = new InputIterator(data)

  const commandRuntime = CommandRuntime.getInstance()

  defaultFactories.forEach((Factory) => {
    const factory = new Factory()

    commandRuntime.appendCommand(factory.build(mainIterator, inputIterator))
  })

  const runtimeData = new RuntimeData()

  runtimeData.mainIterator = mainIterator
  runtimeData.commandRuntime = commandRuntime
  runtimeData.inputIterator = inputIterator

  return runtimeData
}

let previousNumberOfSlots = 0
let previousInputData = ''
/**
 * @type {RuntimeData | null}
 */
let previousRuntimeData = null

/**
 * Memoized runtime factory.
 *
 * @param {number} numberOfSlots
 * @param {string} data
 * @returns {RuntimeData}
 */
const memoizedRuntimeFactory = (numberOfSlots, data) => {
  const dataHasChanged = previousInputData !== JSON.stringify(data)
  const numberOfSlotsHasChanged = previousNumberOfSlots !== numberOfSlots

  if (
    !dataHasChanged &&
    !numberOfSlotsHasChanged &&
    previousRuntimeData !== null
  ) {
    return previousRuntimeData
  }

  const runtimeData = runtimeFactory(numberOfSlots, data)

  previousNumberOfSlots = numberOfSlots
  previousInputData = JSON.stringify(data)
  previousRuntimeData = runtimeData

  return runtimeData
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * Run the algorithm.
 *
 * @param {number} numberOfSlots
 * @param {string} data
 * @param {number} speed
 */
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
  const layoutManager = new LayoutManager()

  layoutManager.clearLayoutValues(numberOfSlots)
}

/**
 * Given a {string[]} algorithm, returns the greatest slot number.
 *
 * @param {string[]} algorithm
 */
export const getGreatestSlot = (algorithm) => {
  let algorithmIndexes = algorithm
    .map((slot) => getIndexFromSlotString(slot.split(':')[0]))
    .sort((a, b) => a - b)

  return algorithmIndexes.pop()
}

/**
 * Import algorithm from a string array.
 *
 * @param {string[]} algorithm - Algorithm to import.
 */
export const importAlgorithmFromString = (algorithm) => {
  const algorithmGreatestSlot = getGreatestSlot(algorithm)
  const numberOfSlots = algorithmGreatestSlot < 16 ? 16 : algorithmGreatestSlot

  renderSlots(numberOfSlots)

  while (algorithm.length > 0) {
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

/**
 * Stop execution of the algorithm.
 */
export const stop = () => {
  previousRuntimeData?.mainIterator?.stop()
}

/**
 * Point back instruction and data iterators to the beginning.
 */
export const reset = () => {
  previousRuntimeData?.mainIterator?.reset()
  previousRuntimeData?.inputIterator?.reset()
}

/**
 * Render new slot configuration based on the number of slots.
 *
 * @param {number} numberOfSlots
 */
export const renderSlots = (numberOfSlots) => {
  const layoutManager = new LayoutManager()

  layoutManager.generateLayout(numberOfSlots)
}
