import { Command } from '../Command.js'
import { showError } from '../utils.js'

const multiplyBaseBehavior = (...args) => {
  if (args.length !== 3) {
    throw `E${id}: O comando MUL deve receber 3 argumentos!`
  }

  const multiplicandSlot = document.getElementById(args[0])
  const multiplierSlot = document.getElementById(args[1])
  const destinySlot = document.getElementById(args[2])

  if (
    multiplicandSlot === null ||
    multiplierSlot === null ||
    destinySlot === null
  ) {
    throw `E${id}: ${args[0]}, ${args[1]} e/ou ${args[2]} estão errados!`
  }

  if (isNaN(multiplicandSlot.value)) throw `Escaninho "${args[0]}" inválido`
  if (isNaN(multiplierSlot.value)) throw `Escaninho "${args[1]}" inválido`

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

const multiplyCommandFactory = () => {
  const multiplyCommand = new Command()

  multiplyCommand.setAcronym('MUL')

  multiplyCommand.setBehavior(multiplyBehavior)

  return multiplyCommand
}

export const multiplyCommand = multiplyCommandFactory()
