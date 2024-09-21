import { Command } from "./Command.js"

export class CommandRuntime {
  instance = null

  constructor() {}

  /**
   * Display all commands available in the runtime.
   *
   * @returns {void}
   */
  displayCommands() {
    console.log(this.commandMap)
  }

  /**
   * Append a command to the runtime.
   *
   * @param {Command} command
   * @returns {void}
   */
  appendCommand(command) {
    if (!this.commandMap) {
      this.commandMap = new Map()
    }

    this.commandMap.set(command.getAcronym(), command)

    for (const alias in command.getAliases()) {
      this.commandMap.set(alias, command)
    }
  }

  /**
   * Execute a command.
   *
   * @param {string} acronym 
   * @param  {...string} args 
   */
  executeCommand(acronym, ...args) {
    const command = this.commandMap.get(acronym)

    if (!command) {
      throw `Comando ${acronym} não encontrado!`
    }

    command.execute(...args)
  }

  /**
   * Singleton method.
   *
   * @returns {CommandRuntime}
   */
  static getInstance() {
    if (!CommandRuntime.instance) {
      CommandRuntime.instance = new CommandRuntime()
    }

    return CommandRuntime.instance
  }
}
