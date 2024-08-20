export class Command {
  constructor() {}

  /**
   * Setter for the acronym property.
   *
   * @param {String} acronym
   */
  setAcronym(acronym) {
    this.acronym = acronym

    return this;
  }

  /**
   * Getter for the acronym property.
   *
   * @returns {String}
   */
  getAcronym() {
    return this.acronym
  }

  /**
   * Setter for the behavior property.
   *
   * @param {Function} behavior
   */
  setBehavior(behavior) {
    this.behavior = behavior
  }

  /**
   * Executes the behavior function.
   *
   * @returns {Function}
   */
  execute(...args) {
    this.behavior(...args)
  }
}
