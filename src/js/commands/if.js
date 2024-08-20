import { Command } from '../Command.js'
import { showError, getIndexFromSlotString } from '../utils.js'

const ifBaseBehavior =
  (slotIterator) =>
  (...args) => {
    if (args.length !== 4) {
      throw `E${id}: O comando SE deve receber 4 argumentos!`
    }

    const validOperators = ['>', '<', '=']

    const operation = args[1]

    if (!validOperators.includes(operation)) {
      throw `E${id}: Operador "${operation}" inválido`
    }

    const firstSlot = document.getElementById(args[0])
    const secondSlot = document.getElementById(args[2])
    const destinySlot = document.getElementById(args[3])

    if (firstSlot === null || secondSlot === null || destinySlot === null) {
      throw `E${id}: ${args[0]}, ${args[2]} e/ou ${args[3]} estão errados!`
    }

    if (isNaN(firstSlot.value)) throw `Escaninho "${args[0]}" inválido`
    if (isNaN(secondSlot.value)) throw `Escaninho "${args[2]}" inválido`

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

const ifBehavior =
  (slotIterator) =>
  (...args) => {
    try {
      ifBaseBehavior(slotIterator)(...args)
      return 1
    } catch (err) {
      showError(err)
      return 0
    }
  }

export const ifCommandFactory = (slotIterator) => {
  const ifCommand = new Command()

  ifCommand.setAcronym('SE')

  ifCommand.setBehavior(ifBehavior(slotIterator))

  return ifCommand
}
