import { defaultFactories } from './commands/index.js'

export function loadInfoData() {
  const commandsContainer = document.querySelector('#commands-info-container')

  const generatedHtml = defaultFactories
    .map((Factory) => ({
      acronym: Factory.commandAcronym,
      desc: Factory.commandDescription,
      methods: Factory.commandUsage,
      methodsDesc: Factory.commandUsageDescription,
    }))
    .map((command) =>
      `
        <div id="${command.acronym.toLocaleLowerCase()}-info">
          <h2>${command.acronym}</h2>
          <p>${command.desc}</p>
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
