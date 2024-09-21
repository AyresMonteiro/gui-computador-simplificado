/**
  @param {string} slotString - A string that represents a slot. I.E: "E01"

  @returns {Number}
*/
export const getIndexFromSlotString = (slotString) => {
  return parseInt(slotString.substring(1), 10)
}

/**
 * Function to append error messages to the errors display.
 *
 * @param {string} message - The message
 */
export const showError = (message) => {
  let errors = document.getElementById('errors')
  errors.innerHTML = errors.innerHTML + `${message}<br>`
  errors.scrollTop = errors.scrollHeight
}

/**
 * Function to scroll an element to the bottom.
 *
 * @param {HTMLElement} element - The element to be scrolled.
 */
export const scrollElementToBootom = (element) => {
  element.scrollTop = element.scrollHeight
}

/**
 * Function to convert a number to a slot ID.
 *
 * @param {Number} number - The number to be converted.
 * @returns {string} - The slot ID. I.E: "E01"
 */
export const numberToSlotId = (number) => {
  number = typeof number === 'string' ? parseInt(number, 10) : number

  return number > 9 ? `E${number}` : `E0${number}`
}
