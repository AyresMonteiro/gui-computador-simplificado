import { Command } from '../Command.js'
import { scrollElementToBootom, showError } from '../utils.js'

const printBaseBehavior = (...args) => {
  if (args.length !== 1) {
    throw `E${id}: O comando IMP deve receber 1 argumento!`
  }

  const dataSlot = document.getElementById(args[0])

  if (dataSlot === null) {
    throw `E${id}: ${args[0]} está errado!`
  }

  if (isNaN(dataSlot.value)) {
    throw `Escaninho "${args[0]}" inválido`
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

const printCommandFactory = () => {
  const printCommand = new Command()

  printCommand.setAcronym('IMP')

  printCommand.setBehavior(printBehavior)

  return printCommand
}

export const printCommand = printCommandFactory()
