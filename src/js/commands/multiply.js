import { Command } from '../Command.js'
import { CommandFactory } from '../CommandFactory.js'
import { InputIterator } from '../InputIterator.js'
import { SlotIterator } from '../SlotIterator.js'
import { numberToSlotId, showError } from '../utils.js'

export class MultiplyCommandFactory extends CommandFactory {
  static commandAcronym = 'MUL'
  static commandGroup = 'data'
  static commandDescription =
    'Multiplica o valor de dois escaninhos e armazena o produto em um terceiro escaninho.'
  static commandUsage = ['MUL Ex, Ey, Ez']
  static commandUsageDescription = `
    Ex é o escaninho que possui o primeiro fator.
    Ey é o escaninho que possui o segundo fator.
    Ez é o escaninho onde o produto será salvo.
    
    Exemplo:
    E16 = 8;
    E15 = 5;
    
    "MUL E16, E15, E14" salvará o valor 40 no escaninho 14.
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

    command.setAcronym(MultiplyCommandFactory.commandAcronym)

    const multiplyBaseBehavior = (...args) => {
      const slotId = numberToSlotId(slotIterator.current())

      if (args.length !== 3) {
        throw `${slotId}: O comando ${MultiplyCommandFactory.commandAcronym} deve receber 3 argumentos!`
      }

      const multiplicandSlot = document.getElementById(args[0])
      const multiplierSlot = document.getElementById(args[1])
      const destinySlot = document.getElementById(args[2])

      if (
        multiplicandSlot === null ||
        multiplierSlot === null ||
        destinySlot === null
      ) {
        throw `${slotId}: ${args[0]}, ${args[1]} e/ou ${args[2]} estão errados!`
      }

      if (isNaN(multiplicandSlot.value))
        throw `${slotId}: Escaninho "${args[0]}" inválido`
      if (isNaN(multiplierSlot.value))
        throw `${slotId}: Escaninho "${args[1]}" inválido`

      const multiplicand = parseInt(multiplicandSlot.value, 10)
      const multiplier = parseInt(multiplierSlot.value, 10)

      destinySlot.value = multiplicand * multiplier
    }

    const multiplyBehavior = (...args) => {
      try {
        multiplyBaseBehavior(...args)
        return 1
      } catch (err) {
        showError(err)
        return 0
      }
    }

    command.setBehavior(multiplyBehavior)

    return command
  }
}
