import { Command } from '../Command.js'
import { showError } from '../utils.js'

const stopBaseBehavior = (slotIterator) => () => {
  slotIterator.stop()
}

const stopBehavior = (slotIterator) => () => {
  try {
    stopBaseBehavior(slotIterator)()
    return 1
  } catch (err) {
    showError(err)
    return 0
  }
}

export const stopCommandFactory = (slotIterator) => {
  const command = new Command()

  command.setAcronym('PARE')

  command.setBehavior(stopBehavior(slotIterator))

  return command
}
