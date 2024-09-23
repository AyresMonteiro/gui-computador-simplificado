import { Command } from '../Command.js'
import { CommandFactory } from '../CommandFactory.js'
import { InputIterator } from '../InputIterator.js'
import { SlotIterator } from '../SlotIterator.js'
import { numberToSlotId, showError } from '../utils.js'

export class SubtractCommandFactory extends CommandFactory {
  static commandAcronym = 'SUB'
  static commandGroup = 'data'
  static commandDescription =
    'Subtrai os dados de um escaninho e armazena a diferença em outro escaninho.'
  static commandUsage = ['SUB Ex, Ey, Ez']
  static commandUsageDescription = `
    Ex é o escaninho que possui o minuendo.
    Ey é o escaninho que possui o subtraendo.
    Ez é o escaninho onde a diferença será salva.
    
    Exemplo:
    E16 = 2;
    E15 = 3;
    
    "SUB E16, E15, E15" salvará o valor -1 no escaninho 15.
  `.trim()

  /**
   * Builds a command.
   *
   * @param {SlotIterator} slotIterator
   * @param {InputIterator} _inputIterator
   * @returns {Command}
   */
  build(slotIterator, _inputIterator) {
    const command = new Command()

    command.setAcronym(SubtractCommandFactory.commandAcronym)

    const subtractBaseBehavior = (...args) => {
      const slotId = numberToSlotId(slotIterator.current())

      if (args.length !== 3) {
        throw `${slotId}: O comando ${SubtractCommandFactory.commandAcronym} deve receber 3 argumentos!`
      }

      const minuendSlot = document.getElementById(args[0])
      const subtrahendSlot = document.getElementById(args[1])
      const destinySlot = document.getElementById(args[2])

      if (
        minuendSlot === null ||
        subtrahendSlot === null ||
        destinySlot === null
      ) {
        throw `${slotId}: ${args[0]}, ${args[1]} e/ou ${args[2]} estão errados!`
      }

      if (isNaN(minuendSlot.value))
        throw `${slotId}: Escaninho "${args[0]}" inválido.`
      if (isNaN(subtrahendSlot.value))
        throw `${slotId}: Escaninho "${args[1]}" inválido.`

      const minuend = parseInt(minuendSlot.value, 10)
      const subtrahend = parseInt(subtrahendSlot.value, 10)

      destinySlot.value = minuend - subtrahend
    }

    const subtractBehavior = (...args) => {
      try {
        subtractBaseBehavior(...args)
        return 1
      } catch (err) {
        showError(err)
        return 0
      }
    }

    command.setBehavior(subtractBehavior)

    return command
  }
}
