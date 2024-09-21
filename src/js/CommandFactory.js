import { Command } from './Command.js'
import { InputIterator } from './InputIterator.js'
import { SlotIterator } from './SlotIterator.js'

export class CommandFactory {
  /**
   * Command acronym.
   *
   * @type {string}
   */
  static commandAcronym = ''

  /**
   * Command aliases.
   * 
   * @type {Record<string, string> | undefined}
   */
  static commandAliases = undefined

  /**
   * Command Group.
   *
   * @type {string}
   * @example 'data', 'flow'
   */
  static commandGroup = ''

  /**
   * Command description.
   *
   * @type {string}
   */
  static commandDescription = ''

  /**
   * Usage examples.
   *
   * @type {string[]}
   */
  static commandUsage = []

  /**
   * Usage description.
   *
   * @type {string}
   */
  static commandUsageDescription = ''

  /**
   * Builds a command.
   *
   * @param {SlotIterator} slotIterator
   * @param {InputIterator} inputIterator
   *
   * @returns {Command}
   */
  build(slotIterator, inputIterator) {
    throw new Error('Not implemented')
  }
}
