import { CommandFactory } from './CommandFactory.js'

export class DocsGenerator {
  /**
   * Gera a documentação dos comandos para ser visualizada na aba "Lista de Comandos".
   *
   * @param {(typeof CommandFactory)[]} factories
   * @returns {void}
   */
  execute(factories) {
    this.generateDocsSidebar(factories)
    this.generateExpandedInfo(factories)
  }

  /**
   * Gera a sidebar da documentação dos comandos.
   *
   * @param {(typeof CommandFactory)[]} factories
   * @returns {void}
   */
  generateDocsSidebar(factories) {
    const sidebarContainer = document.querySelector('#commands-list-sidebar')

    const factoryGroups = factories.reduce((acc, Factory) => {
      const group = Factory.commandGroup

      if (!acc[group]) acc[group] = []

      acc[group].push(Factory)

      return acc
    }, {})

    const titlesByGroup = {
      data: 'Comandos de manipulação de dados',
      flow: 'Comandos de manipulação de fluxo',
    }

    const generatedHtml = Object.entries(factoryGroups)
      .map(([group, factories]) =>
        `
          <div class="commands-group">
            <h4 id="${group}-commands-controller">${titlesByGroup[group]}</h4>
            <div class="commands-sublist" id="${group}-commands">
              ${factories
                .map((Factory) => {
                  const commandNames = Array.from(
                    new Set(
                      [
                        Factory.commandAcronym,
                        ...Object.keys(Factory.commandAliases ?? {}),
                      ].sort()
                    )
                  )

                  return `<b id="${Factory.commandAcronym.toLocaleLowerCase()}">${commandNames.join(
                    ' / '
                  )}</b>`
                })
                .join('\n')}
            </div>
          </div>
        `.trim()
      )
      .join('\n')
      .trim()

    sidebarContainer.innerHTML = ''
    sidebarContainer.innerHTML = generatedHtml
  }

  /**
   * Gera a documentação expandida dos comandos.
   *
   * @param {(typeof CommandFactory)[]} factories
   * @returns {void}
   */
  generateExpandedInfo(factories) {
    const commandsContainer = document.querySelector('#commands-info-container')

    const generatedHtml = factories
      .map((Factory) => ({
        acronym: Factory.commandAcronym,
        aliases: Factory.commandAliases,
        desc: Factory.commandDescription,
        methods: Factory.commandUsage,
        methodsDesc: Factory.commandUsageDescription,
      }))
      .map((command) =>
        `
          <div id="${command.acronym.toLocaleLowerCase()}-info">
            <h2>${command.acronym}</h2>
            <p>${command.desc}</p>
            ${
              command.aliases === undefined
                ? ''
                : `<b>Sinônimos:</b>
                    ${Object.entries(command.aliases)
                      .map(([alias, desc]) => `<h4>"${alias}": ${desc}</h4>`)
                      .join('\n')}`
            }
            <b>
              ${command.methods.length === 1 ? 'Método' : 'Métodos'} de uso:
            </b>
            ${command.methods.map((method) => `<h4>${method}</h4>`).join('\n')}
            <p>
            ${
              command.methodsDesc.replaceAll('\n', '<br />').trim() +
              '<br /><br /><br />'
            }
            </p>
          </div>
        `.trim()
      )
      .join('\n')
      .trim()

    commandsContainer.innerHTML = ''
    commandsContainer.innerHTML = generatedHtml
  }
}
