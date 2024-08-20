import { Command } from '../Command.js'
import { getIndexFromSlotString, showError } from '../utils.js'

const readBaseBehavior =
  (dataIterator) =>
  (...args) => {
    const id = getIndexFromSlotString(args[0])

    if (args?.length !== 1) {
      throw `E${id}: O comando PGC deve receber 1 argumento!`
    }

    const destinySlot = document.getElementById(args[0])

    if (destinySlot === null) {
      throw `E${id}: ${args[0]} está errado!`
    }

    const { value } = dataIterator.next()

    if (value === undefined) {
      throw `E${id}: Fim dos dados`
    }

    destinySlot.value = String(value)
  }

const readBehavior =
  (dataIterator) =>
  (...args) => {
    try {
      readBaseBehavior(dataIterator)(...args)
      return 1
    } catch (err) {
      console.error(err)
      showError(err)
      return 0
    }
  }

export const readCommandFactory = (dataIterator) => {
  const command = new Command()

  command.setAcronym('PGC')

  command.setBehavior(readBehavior(dataIterator))

  return command
}
