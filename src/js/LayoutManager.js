import { SlotIterator } from './SlotIterator.js'
import { numberToSlotId } from './utils.js'

export class LayoutManager {
  getSlotHtml(id) {
    const slotId = numberToSlotId(id)

    return `
      <div class="slot">
        <label for="${slotId}">${slotId}</label>
        <input id="${slotId}" name="${slotId}" />
      </div>
    `.trim()
  }

  getSlotLineHtml(slots) {
    return `
      <div class="line">
        ${slots}
      </div>
    `.trim()
  }

  generateLayout(numberOfSlots) {
    const slotContainer = document.getElementById('generated-slots')
    const slotIterator = new SlotIterator(numberOfSlots)

    let lines = []

    for (let slot of slotIterator) {
      if (slot % 4 === 1) {
        lines.push([])
      }

      lines[lines.length - 1].push(this.getSlotHtml(slot))
    }

    const html = lines
      .map((line) => line.join('\n'))
      .map(this.getSlotLineHtml)
      .join('\n')

    slotContainer.innerHTML = html
  }

  clearLayoutValues(numberOfSlots) {
    const slotIterator = new SlotIterator(numberOfSlots)

    for (let slot of slotIterator) {
      const slotId = numberToSlotId(slot)

      const slotElement = document.getElementById(slotId)

      if (slotElement) slotElement.value = ''
    }
  }

  eraseLayout() {
    const layout = document.getElementById('layout')
    layout.innerHTML = ''
  }
}
