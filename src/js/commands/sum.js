import { Command } from '../Command.js'
import { CommandFactory } from '../CommandFactory.js'
import { InputIterator } from '../InputIterator.js'
import { SlotIterator } from '../SlotIterator.js'
import { numberToSlotId, showError } from '../utils.js'

export class SumCommandFactory extends CommandFactory {
  static commandAcronym = 'SOM'
  static commandGroup = 'data'
  static commandDescription =
    'Soma os dados de dois escaninhos e armazena em um terceiro escaninho.'
  static commandUsage = ['SOM Ex, Ey, Ez']
  static commandUsageDescription = `
    Ex é o escaninho que possui a primeira parcela da soma.
    Ey é o escaninho que possui a segunda parcela da soma.
    Ez é o escaninho onde o total será salvo.
    
    Exemplo:
    E16 = 2;
    E15 = 3;
    
    "SOM E16, E15, E16" salvará o valor 5 no escaninho 16.
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

    command.setAcronym(SumCommandFactory.commandAcronym)

    const sumBaseBehavior = (...args) => {
      const slotId = numberToSlotId(slotIterator.current())

      if (args.length !== 3) {
        throw `${slotId}: O comando ${SumCommandFactory.commandAcronym} deve receber 3 argumentos!`
      }

      const firstSummandSlot = document.getElementById(args[0])
      const secondSummandSlot = document.getElementById(args[1])
      const destinySlot = document.getElementById(args[2])

      if (
        firstSummandSlot === null ||
        secondSummandSlot === null ||
        destinySlot === null
      ) {
        throw `${slotId}: ${args[0]}, ${args[1]} e/ou ${args[2]} estão errados!`
      }

      if (isNaN(firstSummandSlot.value))
        throw `${slotId}: Escaninho "${args[0]}" inválido.`
      if (isNaN(secondSummandSlot.value))
        throw `${slotId}: Escaninho "${args[1]}" inválido.`

      const firstSummand = parseInt(firstSummandSlot.value, 10)
      const secondSummand = parseInt(secondSummandSlot.value, 10)

      destinySlot.value = firstSummand + secondSummand
    }

    const sumBehavior = (...args) => {
      try {
        sumBaseBehavior(...args)
        return 1
      } catch (err) {
        showError(err)
        return 0
      }
    }

    command.setBehavior(sumBehavior)

    return command
  }
}
