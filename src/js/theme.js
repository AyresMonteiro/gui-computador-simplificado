const themeKey = 'theme'

/**
 * Save theme on local storage.
 *
 * @param {string} theme
 */
const saveTheme = (theme) => {
  localStorage.setItem(themeKey, theme)
}

/**
 * Get theme from local storage.
 *
 * @returns {string}
 */
const getTheme = () => {
  return localStorage.getItem(themeKey)
}

let currentTheme = getTheme()

const themeNames = {
  blue: 'Blue',
  green: 'Green',
  purple: 'Purple',
  pale: 'Pale',
  honeycomb: 'Honeycomb',
}

const themeMainColors = {
  blue: '#007ea7',
  green: '#4caf50',
  purple: '#9b59b6',
  pale: '#5c8c8c',
  honeycomb: '#ce8909',
}

const themeOptions = {
  blue: './src/css/themes/blue.css',
  green: './src/css/themes/green.css',
  purple: './src/css/themes/purple.css',
  pale: './src/css/themes/pale.css',
  honeycomb: './src/css/themes/honeycomb.css',
}

const currentThemeElement = document.querySelector('#current-theme')

/**
 * Set theme on the document.
 *
 * @param {string} theme
 */
const setTheme = (theme) => {
  const themePath = themeOptions[theme]
  const themeElement = document.querySelector('#current-theme')

  themeElement.href = themePath

  currentTheme = theme
  saveTheme(theme)
}

setTheme(currentTheme)

const themeSelector = document.querySelector('#theme-selector')

themeSelector.addEventListener('change', (event) => {
  const theme = event.target.value
  setTheme(theme)
})

const generateOptions = () => {
  const options = Object.entries(themeOptions)
    .map(([theme, path]) => {
      const themeMainColor = themeMainColors[theme]

      const optionElement = document.createElement('option')

      const smallColoredCircleElement = document.createElement('span')

      smallColoredCircleElement.style.display = 'inline-block'
      smallColoredCircleElement.style.width = '10px'
      smallColoredCircleElement.style.height = '10px'
      smallColoredCircleElement.style.borderRadius = '50%'
      smallColoredCircleElement.style.backgroundColor = themeMainColor

      optionElement.value = theme
      optionElement.selected = theme === currentTheme
      optionElement.innerHTML = `${themeNames[theme]} `
      optionElement.prepend(smallColoredCircleElement)

      return optionElement.outerHTML
    })
    .join('\n')

  themeSelector.innerHTML = options
}

generateOptions()
