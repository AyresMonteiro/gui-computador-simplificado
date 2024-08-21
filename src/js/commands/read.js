import { Command } from '../Command.js'
import { CommandFactory } from '../CommandFactory.js'
import { InputIterator } from '../InputIterator.js'
import { SlotIterator } from '../SlotIterator.js'
import { numberToSlotId, showError } from '../utils.js'

export class ReadCommandFactory extends CommandFactory {
  static commandAcronym = 'PGC'
  static commandGroup = 'data'
  static commandDescription =
    'Lê o próximo valor inserido pelo usuário. (Dados de entrada)'
  static commandUsage = ['PGC Ex']
  static commandUsageDescription = `
    Ex é o escaninho onde os dados serão salvos.
    
    Exemplo:
    "PGC E15" salvará o valor no escaninho 15.
  `.trim()

  /**
   * Builds a command.
   *
   * @param {SlotIterator} slotIterator
   * @param {InputIterator} inputIterator
   * @returns {Command}
   */
  build(slotIterator, inputIterator) {
    const command = new Command()

    command.setAcronym(ReadCommandFactory.commandAcronym)

    const readBaseBehavior = (...args) => {
      const slotId = numberToSlotId(slotIterator.current())

      if (args.length !== 1) {
        throw `${slotId}: O comando ${ReadCommandFactory.commandAcronym} deve receber 1 argumento!`
      }

      const destinySlot = document.getElementById(args[0])

      if (destinySlot === null) {
        throw `${slotId}: ${args[0]} está errado!`
      }

      const { value } = inputIterator.next()

      if (value === undefined) {
        throw `${slotId}: Fim dos dados`
      }

      destinySlot.value = String(value)
    }

    const readBehavior = (...args) => {
      try {
        readBaseBehavior(...args)
        return 1
      } catch (err) {
        showError(err)
        return 0
      }
    }

    command.setBehavior(readBehavior)

    return command
  }
}
