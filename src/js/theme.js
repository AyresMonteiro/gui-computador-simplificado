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

let currentTheme = getTheme() || 'blue'

const themeNames = {
  blue: 'Blue',
  green: 'Green',
  purple: 'Purple',
  pale: 'Pale',
  honeycomb: 'Honeycomb',
}

/**
 * Set theme on the document.
 *
 * @param {string} theme
 */
const setTheme = (theme) => {
  const rootElement = document.documentElement

  rootElement.setAttribute('data-theme', theme)

  saveTheme(theme)
}

/**
 * Generate options for the theme selector.
 * 
 * @param {HTMLSelectElement} themeSelector 
 */
const generateOptions = (themeSelector) => {
  const options = Object.entries(themeNames)
    .map(([theme, path]) => {
      const optionElement = document.createElement('option')

      optionElement.value = theme
      optionElement.selected = theme === currentTheme
      optionElement.innerHTML = themeNames[theme] + ' '.repeat(3)

      return optionElement.outerHTML
    })
    .join('\n')

  themeSelector.innerHTML = options
}

/**
 * Setup theme selector.
 *
 * @param {string} initialTheme 
 */
const setupThemeSelector = (initialTheme) => {
  const themeSelector = document.querySelector('#theme-selector')

  themeSelector.addEventListener('change', (event) => {
    const theme = event.target.value
    setTheme(theme)
  })

  generateOptions(themeSelector)
  themeSelector.value = initialTheme
  setTheme(initialTheme)
}

setupThemeSelector(currentTheme)
