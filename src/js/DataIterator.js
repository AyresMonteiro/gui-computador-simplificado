export class DataIterator {
  constructor(data) {
    console.log({data})
    this.data = data || []
    this.index = 0
  }

  reset() {
    this.index = 0
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    if (this?.index === this.data?.length) {
      return { done: true }
    }

    return {
      value: this.data[this.index++],
      done: false,
    }
  }
}
