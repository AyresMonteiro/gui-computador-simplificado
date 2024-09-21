export class Command {
  constructor() {}

  /**
   * Setter for the acronym property.
   *
   * @param {string} acronym
   */
  setAcronym(acronym) {
    this.acronym = acronym

    return this
  }

  /**
   * Getter for the acronym property.
   *
   * @returns {string}
   */
  getAcronym() {
    return this.acronym
  }

  /**
   * Setter for the aliases property.
   *
   * @param {Record<string, string>} aliases
   */
  setAliases(aliases) {
    this.aliases = aliases
  }

  /**
   * Getter for the aliases property.
   *
   * @returns {Record<string, string> | undefined}
   */
  getAliases() {
    return this.aliases
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
