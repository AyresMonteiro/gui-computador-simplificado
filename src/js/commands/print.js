import { Command } from '../Command.js'
import { CommandFactory } from '../CommandFactory.js'
import { InputIterator } from '../InputIterator.js'
import { SlotIterator } from '../SlotIterator.js'
import { numberToSlotId, scrollElementToBootom, showError } from '../utils.js'

export class PrintCommandFactory extends CommandFactory {
  static commandAcronym = 'IMP'
  static commandGroup = 'data'
  static commandDescription = 'Imprime o valor de um escaninho no console.'
  static commandUsage = ['IMP Ex']
  static commandUsageDescription = `
    Ex é o escaninho que contém o valor que será impresso.
    
    Exemplo:
    E16 = 2077;
    
    "IMP E16" imprimirá o valor 2077 no console.
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

    command.setAcronym(PrintCommandFactory.commandAcronym)

    const printBaseBehavior = (...args) => {
      const slotId = numberToSlotId(slotIterator.current())

      if (args.length !== 1) {
        throw `${slotId}: O comando ${PrintCommandFactory.commandAcronym} deve receber 1 argumento!`
      }

      const dataSlot = document.getElementById(args[0])

      if (dataSlot === null) {
        throw `${slotId}: ${args[0]} está errado!`
      }

      if (isNaN(dataSlot.value)) {
        throw `${slotId}: Escaninho "${args[0]}" inválido`
      }

      const textElm = document.getElementById('printed-text')

      textElm.innerHTML = textElm.innerHTML + `${dataSlot.value}<br>`
      scrollElementToBootom(textElm)
    }

    const printBehavior = (...args) => {
      try {
        printBaseBehavior(...args)
        return 1
      } catch (err) {
        showError(err)
        return 0
      }
    }

    command.setBehavior(printBehavior)

    return command
  }
}
