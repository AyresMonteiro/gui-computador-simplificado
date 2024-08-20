import { Command } from '../Command.js'
import { getIndexFromSlotString, showError } from '../utils.js'

const copyBaseBehavior = (...args) => {
  if (args.length !== 2) {
    throw `E${id}: O comando CP deve receber 2 argumentos!`
  }

  const originSlotIdx = getIndexFromSlotString(args[0])
  const destinySlotIdx = getIndexFromSlotString(args[1])

  const originSlot = document.getElementById(args[0])
  const destinySlot = document.getElementById(args[1])

  if (originSlot === null || destinySlot === null) {
    throw `E${id}: ${originSlotIdx} e/ou ${destinySlotIdx} estão errados!`
  }

  destinySlot.value = originSlot.value
}

const copyBehavior = (...args) => {
  try {
    copyBaseBehavior(...args)
    return 1
  } catch (err) {
    showError(err)
    return 0
  }
}

const copyCommandFactory = () => {
  const copyCommand = new Command()

  copyCommand.setAcronym('COP')

  copyCommand.setBehavior(copyBehavior)

  return copyCommand
}

export const copyCommand = copyCommandFactory()
