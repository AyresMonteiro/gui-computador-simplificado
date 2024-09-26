import { Command } from '../Command.js'
import { CommandFactory } from '../CommandFactory.js'
import { InputIterator } from '../InputIterator.js'
import { SlotIterator } from '../SlotIterator.js'
import { numberToSlotId, showError } from '../utils.js'

export class BackCommandFactory extends CommandFactory {
  static commandAcronym = 'VT'
  static commandAliases = {
    AV: 'Avance para',
    VT: 'Volte para',
    VÁ: 'Vá para',
  }
  static commandGroup = 'flow'
  static commandDescription = 'Faz o programa ir à um determinado escaninho.'
  static commandUsage = ['VT Ex', 'AV Ex', 'VÁ Ex']
  static commandUsageDescription = `
    Ex é o escaninho de destino.

    Exemplo:
    E01 = IMP E16;
    E02 = VT E01;
    E16 = 42;
    
    O programa acima imprimirá o valor 42 no console repetidamente até que alguém force o programa a parar.

    Isso acontece porque o programa executa o comando IMP E16 armazenado no escaninho 1 e avança para o escaninho 2.
    O escaninho 2 por sua vez manda o programa voltar para o escaninho 1, reiniciando o ciclo.
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

    command.setAcronym(BackCommandFactory.commandAcronym)
    command.setAliases(BackCommandFactory.commandAliases)

    const backBaseBehavior = (...args) => {
      const slotId = numberToSlotId(slotIterator.current())

      const aliases = Object.keys(BackCommandFactory.commandAliases).filter(
        (key) => key !== BackCommandFactory.commandAcronym
      )

      if (args.length !== 1) {
        throw `${slotId}: O comando ${
          BackCommandFactory.commandAcronym
        } (ou ${aliases.join(', ')}) deve receber 1 argumento!`
      }

      const slot = document.getElementById(args[0])

      if (slot === null) {
        throw `${slotId}: ${args[0]} está errado!`
      }

      const slotNumber = parseInt(args[0].slice(1), 10)

      slotIterator.goTo(slotNumber)
    }

    const backBehavior = (...args) => {
      try {
        backBaseBehavior(...args)
        return 1
      } catch (err) {
        showError(err)
        return 0
      }
    }

    command.setBehavior(backBehavior)

    return command
  }
}
