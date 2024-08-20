import { Command } from '../Command.js'
import { showError } from '../utils.js'

const subtractBaseBehavior = (...args) => {
  if (args.length !== 3) {
    throw `E${id}: O comando SUB deve receber 3 argumentos!`
  }

  const minuendSlot = document.getElementById(args[0])
  const subtrahendSlot = document.getElementById(args[1])
  const destinySlot = document.getElementById(args[2])

  if (minuendSlot === null || subtrahendSlot === null || destinySlot === null) {
    throw `E${id}: ${args[0]}, ${args[1]} e/ou ${args[2]} estão errados!`
  }

  if (isNaN(minuendSlot.value)) throw `Escaninho "${args[0]}" inválido`
  if (isNaN(subtrahendSlot.value)) throw `Escaninho "${args[1]}" inválido`

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

const subtractCommandFactory = () => {
  const subtractCommand = new Command()

  subtractCommand.setAcronym('SUB')

  subtractCommand.setBehavior(subtractBehavior)

  return subtractCommand
}

export const subtractCommand = subtractCommandFactory()
