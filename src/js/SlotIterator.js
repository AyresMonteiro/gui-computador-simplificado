export class SlotIterator {
  constructor(numberOfSlots) {
    this.numberOfSlots = numberOfSlots
    this.currentSlot = 1
  }

  reset() {
    this.currentSlot = 1
  }

  stop() {
    this.currentSlot = this.numberOfSlots + 1
  }

  goTo(slot) {
    this.currentSlot = slot
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    if (this.currentSlot > this.numberOfSlots) {
      return { done: true }
    }

    let slot = this.currentSlot
    this.currentSlot++
    return { value: slot, done: false }
  }
}
