const commands = require("../data/commands.json");

function loadInfoData() {
  const commandsContainer = document.querySelector("#commands-info-container");

  const data = Object.keys(commands).
    map(command => `<div id="${command}">\n
  <h2>${commands[command].title}</h2>\n<p>${commands[command].desc}</p>\n
  <b>${
    commands[command].methods.length === 1 ? "Método" : "Métodos"
  } de uso:</b>\n
  ${commands[command].methods.map(method => `<h4>${method}</h4>\n`).join("\n")}
  <p>${commands[command].methodsDesc}</p></div>`).
    join("\n");

  commandsContainer.innerHTML = "";
  commandsContainer.innerHTML = data;
}

module.exports = {
  loadInfoData
};
