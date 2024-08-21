import { Command } from '../Command.js'
import { CommandFactory } from '../CommandFactory.js'
import { InputIterator } from '../InputIterator.js'
import { SlotIterator } from '../SlotIterator.js'
import { showError } from '../utils.js'

export class StopCommandFactory extends CommandFactory {
  static commandAcronym = 'PARE'
  static commandGroup = 'flow'
  static commandDescription = 'Para a execução do programa.'
  static commandUsage = ['PARE']
  static commandUsageDescription = 'Auto-explicativo.'

  /**
   * Builds a command.
   *
   * @param {SlotIterator} slotIterator
   * @param {InputIterator} inputIterator
   * @returns {Command}
   */
  build(slotIterator, inputIterator) {
    const command = new Command()

    command.setAcronym(StopCommandFactory.commandAcronym)

    const stopBaseBehavior = () => {
      slotIterator.stop()
    }

    const stopBehavior = () => {
      try {
        stopBaseBehavior()
        return 1
      } catch (err) {
        showError(err)
        return 0
      }
    }

    command.setBehavior(stopBehavior)

    return command
  }
}
