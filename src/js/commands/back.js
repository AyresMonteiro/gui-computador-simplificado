import { Command } from '../Command.js'
import { showError } from '../utils.js'

const backBaseBehavior =
  (slotIterator) =>
  (...args) => {
    if (args.length !== 1) {
      throw `E${id}: O comando VT deve receber 1 argumento!`
    }

    const slot = document.getElementById(args[0])

    if (slot === null) {
      throw `E${id}: ${args[0]} está errado!`
    }

    const slotNumber = parseInt(args[0].slice(1), 10)

    slotIterator.goTo(slotNumber)
  }

const backBehavior =
  (slotIterator) =>
  (...args) => {
    try {
      backBaseBehavior(slotIterator)(...args)
      return 1
    } catch (err) {
      showError(err)
      return 0
    }
  }

export const backCommandFactory = (slotIterator) => {
  const command = new Command()

  command.setAcronym('VT')

  command.setBehavior(backBehavior(slotIterator))

  return command
}
