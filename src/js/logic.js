import { LayoutManager } from './LayoutManager.js'
import { run, stop, reset } from './flow.js'
import { loadInfoData } from './generateInfo.js'
// import { importCode, exportCode } from './importExportHandler.js'
import {
  openInfo,
  openDataInput,
  openCommandsList,
  displayCommandsSublist,
  closeDataInput,
  closeCommandsList,
  closeAllInfo,
} from './otherTabs.js'

const $ = document.querySelector.bind(document)

let numberOfSlots = 16
let speed = 0.5
let data = []
let isDataLoaded = false

$('#slots-input').addEventListener('change', (e) => {
  numberOfSlots = parseInt(e.target.value, 10)
  new LayoutManager().generateLayout(numberOfSlots)
})

$('#speed-input').addEventListener('change', (e) => {
  speed = e.target.value.replace(/[^0-9,.]*/gu, '').replace(',', '.')
  speed = parseFloat(speed)
})

$('#run-button').addEventListener('click', () => {
  reset()
  run(numberOfSlots, data, speed)
})

$('#stop-button').addEventListener('click', () => {
  stop(numberOfSlots)
})

$('#clear-button').addEventListener('click', () => {
  clearSlots(numberOfSlots)
})

// $('#import-button').addEventListener('click', () => {
//   importCode(numberOfSlots)
// })

// $('#export-button').addEventListener('click', () => {
//   exportCode(numberOfSlots)
// })

$('#open-data-button').addEventListener('click', openDataInput)
$('#close-data-button').addEventListener('click', closeDataInput)

$('#data-values').addEventListener('change', (e) => {
  data = e.target.value.replace(/[^0-9,]*/gu, '').split(',').map(Number)
})

$('#open-commands-list-button').addEventListener('click', () => {
  if (!isDataLoaded) {
    loadInfoData()
    isDataLoaded = true
  }
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

new LayoutManager().generateLayout(numberOfSlots)
