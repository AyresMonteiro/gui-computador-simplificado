export function openDataInput() {
  let console = document.getElementById('console-container')
  let wrapper = document.getElementById('wrapper')
  let data = document.getElementById('data')

  console.style.display = 'none'
  wrapper.style.display = 'none'
  data.style.display = 'flex'
}

export function closeDataInput() {
  let console = document.getElementById('console-container')
  let wrapper = document.getElementById('wrapper')
  let data = document.getElementById('data')

  console.style.display = 'flex'
  wrapper.style.display = 'flex'
  data.style.display = 'none'
}

export function openCommandsList() {
  let console = document.getElementById('console-container')
  let wrapper = document.getElementById('wrapper')
  let commandsList = document.getElementById('commands-list-tab')

  console.style.display = 'none'
  wrapper.style.display = 'none'
  commandsList.style.display = 'flex'
}

export function closeCommandsList() {
  let console = document.getElementById('console-container')
  let wrapper = document.getElementById('wrapper')
  let commandsList = document.getElementById('commands-list-tab')

  console.style.display = 'flex'
  wrapper.style.display = 'flex'
  commandsList.style.display = 'none'
}

export function displayCommandsSublist(id = String) {
  let sublist = document.getElementById(id)

  let display = sublist.style.display === 'none' ? 'flex' : 'none'

  sublist.style.display = display
}

export function closeAllInfo() {
  const allInfo = document.querySelector('.command-info')
  Array.from(allInfo.children).forEach((div) => {
    div.style.display = 'none'
  })
}

export function openInfo(id) {
  const info = document.querySelector(`#${id}-info`)
  if (info) info.style.display = 'flex'
}
