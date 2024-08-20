import { Command } from '../Command.js'
import { showError } from '../utils.js'

const sumBaseBehavior = (...args) => {
  if (args.length !== 3) {
    throw `E${id}: O comando SOM deve receber 3 argumentos!`
  }

  const firstSummandSlot = document.getElementById(args[0])
  const secondSummandSlot = document.getElementById(args[1])
  const destinySlot = document.getElementById(args[2])

  if (
    firstSummandSlot === null ||
    secondSummandSlot === null ||
    destinySlot === null
  ) {
    throw `E${id}: ${args[0]}, ${args[1]} e/ou ${args[2]} estão errados!`
  }

  if (isNaN(firstSummandSlot.value)) throw `Escaninho "${args[0]}" inválido`
  if (isNaN(secondSummandSlot.value)) throw `Escaninho "${args[1]}" inválido`

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

const sumCommandFactory = () => {
  const sumCommand = new Command()

  sumCommand.setAcronym('SOM')

  sumCommand.setBehavior(sumBehavior)

  return sumCommand
}

export const sumCommand = sumCommandFactory()
