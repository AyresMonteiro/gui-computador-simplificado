export class CommandRuntime {
  instance = null

  constructor() {}

  displayCommands() {
    console.log(this.commandMap)
  }

  appendCommand(command) {
    if (!this.commandMap) {
      this.commandMap = new Map()
    }

    this.commandMap.set(command.getAcronym(), command)
  }

  executeCommand(acronym, ...args) {
    const command = this.commandMap.get(acronym)

    if (!command) {
      throw `Comando ${acronym} não encontrado!`
    }

    const result = command.execute(...args)
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
