import { Command } from '../Command.js'
import { showError } from '../utils.js'

const divideBaseBehavior = (...args) => {
  if (args.length !== 3) {
    throw `E${id}: O comando DIV deve receber 3 argumentos!`
  }

  const dividendSlot = document.getElementById(args[0])
  const divisorSlot = document.getElementById(args[1])
  const destinySlot = document.getElementById(args[2])

  if (dividendSlot === null || divisorSlot === null || destinySlot === null) {
    throw `E${id}: ${args[0]}, ${args[1]} e/ou ${args[2]} estão errados!`
  }

  if (isNaN(dividendSlot.value)) throw `Escaninho "${args[0]}" inválido`
  if (isNaN(divisorSlot.value)) throw `Escaninho "${args[1]}" inválido`

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

const divideCommandFactory = () => {
  const divideCommand = new Command()

  divideCommand.setAcronym('DIV')

  divideCommand.setBehavior(divideBehavior)

  return divideCommand
}

export const divideCommand = divideCommandFactory()
