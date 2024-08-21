import { Command } from '../Command.js'
import { CommandFactory } from '../CommandFactory.js'
import { InputIterator } from '../InputIterator.js'
import { SlotIterator } from '../SlotIterator.js'
import { numberToSlotId, showError } from '../utils.js'

export class DivideCommandFactory extends CommandFactory {
  static commandAcronym = 'DIV'
  static commandGroup = 'data'
  static commandDescription =
    'Divide o valor de um escaninho e armazena o quociente em outro escaninho.'
  static commandUsage = ['DIV Ex Ey Ez']
  static commandUsageDescription = `
    Ex é o escaninho que possui o dividendo.
    Ey é o escaninho que possui o divisor.
    Ez é o escaninho onde o quociente será salvo.

    Exemplo:
    E16 = 17;
    E15 = 3;

    "DIV E16 E15 E14" salvará o valor 5 no escaninho 14.
    Note que o resto da divisão (2, nesse caso) é perdido no processo.
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

    command.setAcronym(DivideCommandFactory.commandAcronym)

    const divideBaseBehavior = (...args) => {
      const slotId = numberToSlotId(slotIterator.current())

      if (args.length !== 3) {
        throw `${slotId}: O comando ${DivideCommandFactory.commandAcronym} deve receber 3 argumentos!`
      }

      const dividendSlot = document.getElementById(args[0])
      const divisorSlot = document.getElementById(args[1])
      const destinySlot = document.getElementById(args[2])

      if (
        dividendSlot === null ||
        divisorSlot === null ||
        destinySlot === null
      ) {
        throw `${slotId}: ${args[0]}, ${args[1]} e/ou ${args[2]} estão errados!`
      }

      if (isNaN(dividendSlot.value))
        throw `${slotId}: Escaninho "${args[0]}" inválido`
      if (isNaN(divisorSlot.value))
        throw `${slotId}: Escaninho "${args[1]}" inválido`

      const dividend = parseInt(dividendSlot.value, 10)
      const divisor = parseInt(divisorSlot.value, 10)

      destinySlot.value = Math.ceil(dividend / divisor)
    }

    const divideBehavior = (...args) => {
      try {
        divideBaseBehavior(...args)
        return 1
      } catch (err) {
        showError(err)
        return 0
      }
    }

    command.setBehavior(divideBehavior)

    return command
  }
}
