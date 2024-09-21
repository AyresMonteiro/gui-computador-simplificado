import { run, stop, reset, clear, renderSlots } from './flow.js'
import { DocsGenerator } from './DocsGenerator.js'
import { FileHandler } from './FileHandler.js'
import {
  openInfo,
  openDataInput,
  openCommandsList,
  displayCommandsSublist,
  closeDataInput,
  closeCommandsList,
  closeAllInfo,
} from './otherTabs.js'
import { defaultFactories } from './commands/index.js'

new DocsGenerator().execute(defaultFactories)

const $ = document.querySelector.bind(document)

let numberOfSlots = 16
let speed = 0.5
let data = []
let isDataLoaded = false

$('#slots-input').addEventListener('change', (e) => {
  numberOfSlots = parseInt(e.target.value, 10)
  renderSlots(numberOfSlots)
})

$('#speed-input').addEventListener('change', (e) => {
  const timeUnits = new Map()

  timeUnits.set('ms', 0.001)
  timeUnits.set('m', 60)
  timeUnits.set('s', 1)

  const timeUnitsRegex = /(ms|m|s)/gu

  const rawValue = String(e.target.value)

  const firstUnitMatch = rawValue.match(timeUnitsRegex).shift()

  const numericValue = parseFloat(
    rawValue.replaceAll(timeUnitsRegex, '').replace(',', '.')
  )

  speed = numericValue * timeUnits.get(firstUnitMatch)
})

$('#run-button').addEventListener('click', () => {
  reset()
  run(numberOfSlots, data, speed)
})

$('#stop-button').addEventListener('click', () => {
  stop(numberOfSlots)
})

$('#clear-button').addEventListener('click', () => {
  clear(numberOfSlots)
})

$('#import-button').addEventListener('click', () => {
  new FileHandler().importCode().then((slots) => {
    if (slots !== numberOfSlots) numberOfSlots = slots
  })
})

$('#export-button').addEventListener('click', () => {
  new FileHandler().exportCode(numberOfSlots)
})

$('#open-data-button').addEventListener('click', openDataInput)
$('#close-data-button').addEventListener('click', closeDataInput)

$('#data-values').addEventListener('change', (e) => {
  const noWhiteSpaces = (string) => string.replace(/\s/gu, '')
  const onlyCommasNumbersAndHyphens = (string) =>
    string.replace(/[^0-9,-]*/gu, '')
  const noHyphensNotFollowedByNumbers = (string) =>
    string.replace(/(-(?!\d))*/gu, '')

  let value = e.target.value

  value = noWhiteSpaces(value)
  value = onlyCommasNumbersAndHyphens(value)
  value = noHyphensNotFollowedByNumbers(value)

  data = value.split(',').map(Number)
})

$('#open-commands-list-button').addEventListener('click', () => {
  openCommandsList()
  closeAllInfo()
  openInfo('pgc')
})
$('#close-commands-list-button').addEventListener('click', closeCommandsList)

$('#data-commands-controller').addEventListener('click', () => {
  displayCommandsSublist('data-commands', 273)
})

$('#flow-commands-controller').addEventListener('click', () => {
  displayCommandsSublist('flow-commands', 117)
})

Array.from($('#data-commands').children).forEach((element) => {
  element.addEventListener('click', () => {
    closeAllInfo()
    openInfo(element.id)
  })
})

Array.from($('#flow-commands').children).forEach((element) => {
  element.addEventListener('click', () => {
    closeAllInfo()
    openInfo(element.id)
  })
})

renderSlots(numberOfSlots)
