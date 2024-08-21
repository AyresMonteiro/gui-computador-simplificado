import { Command } from '../Command.js'
import { CommandFactory } from '../CommandFactory.js'
import { InputIterator } from '../InputIterator.js'
import { SlotIterator } from '../SlotIterator.js'
import { showError, getIndexFromSlotString, numberToSlotId } from '../utils.js'

export class IfCommandFactory extends CommandFactory {
  static commandAcronym = 'SE'
  static commandGroup = 'flow'
  static commandDescription =
    'Faz o programa ir à um determinado escaninho caso sua condição seja verdadeira. Caso contrário, ele avançará para o próximo escaninho.'
  static commandUsage = ['SE Ex < Ey Ez', 'SE Ex > Ey Ez', 'SE Ex = Ey Ez']
  static commandUsageDescription = `
    Ex é o primeiro escaninho de comparação.
    Ey é o segundo escaninho de comparação.
    Ez é o escaninho de destino.
    "<" é o símbolo matemático que significa "menor que".
    ">" é o símbolo matemático que significa "maior que".
    "=" é o símbolo matemático que signifca "igual à".

    Exemplos:
    E09 = 7;
    E10 = 8;
    E11 = 9;

    Caso o escaninho 2 possua o comando "SE E10 < E09 E01", o computador simplificado analisará se E10 é menor que E09 e então confirmará que não e ao invés de ir para E01, avançará para o próximo escaninho, que nesse caso é E03.

    Caso o escaninho 2 possua o comando "SE E10 < E11 E01", o computador simplificado analisará se E10 é menor que E1 e então confirmará que sim e irá para E01, repetindo infinitamente.
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

    command.setAcronym(IfCommandFactory.commandAcronym)

    const ifBaseBehavior = (...args) => {
      const slotId = numberToSlotId(slotIterator.current())

      if (args.length !== 4) {
        throw `${slotId}: O comando ${IfCommandFactory.commandAcronym} deve receber 4 argumentos!`
      }

      const validOperators = ['>', '<', '=']

      const operation = args[1]

      if (!validOperators.includes(operation)) {
        throw `${slotId}: Operador "${operation}" inválido`
      }

      const firstSlot = document.getElementById(args[0])
      const secondSlot = document.getElementById(args[2])
      const destinySlot = document.getElementById(args[3])

      if (firstSlot === null || secondSlot === null || destinySlot === null) {
        throw `${slotId}: ${args[0]}, ${args[2]} e/ou ${args[3]} estão errados!`
      }

      if (isNaN(firstSlot.value))
        throw `${slotId}: Escaninho "${args[0]}" inválido`
      if (isNaN(secondSlot.value))
        throw `${slotId}: Escaninho "${args[2]}" inválido`

      const firstValue = parseInt(firstSlot.value, 10)
      const secondValue = parseInt(secondSlot.value, 10)

      const greaterThanExpr = operation === '>' && firstValue > secondValue
      const lessThanExpr = operation === '<' && firstValue < secondValue
      const equalToExpr = operation === '=' && firstValue === secondValue

      if (!greaterThanExpr && !lessThanExpr && !equalToExpr) {
        return
      }

      const destinySlotValue = getIndexFromSlotString(args[3])

      slotIterator.goTo(destinySlotValue)
    }

    const ifBehavior = (...args) => {
      try {
        ifBaseBehavior(...args)
        return 1
      } catch (err) {
        showError(err)
        return 0
      }
    }

    command.setBehavior(ifBehavior)

    return command
  }
}
