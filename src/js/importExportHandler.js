const fs = require("fs");
const { dialog } = require("electron").remote;

const showError = require("./showError.js");
const { clearSlots } = require("./slots");

async function importCode(numberOfSlots) {
  try {
    const path = await dialog.showOpenDialog({
      title: "Escolha o arquivo de importação:",
      properties: ["openFile"],
      filters: [
        {
          name: "Códigos",
          extensions: ["txt"]
        }
      ]
    });

    if (path.filePaths.length !== 1)
      throw "ERRO: Escolha um arquivo para importar!";

    // eslint-disable-next-line no-sync
    let data = fs.readFileSync(path.filePaths[0], { encoding: "utf-8" });

    data = data.split("\n");
    data = data.filter(item => item);

    clearSlots(numberOfSlots);

    data.forEach(command => {
      const info = command.split(":");
      if (info.length !== 2) return false;
      let id = parseInt(info[0].substr(1), 10);

      if (id <= numberOfSlots && id > 0) {
        id = `E${id < 10 ? "0" : ""}${id}`;

        const slot = document.getElementById(id);

        slot.value = info[1].trim();
      }

      return 0;
    });
  } catch (err) {
    showError(err);
  }
}

async function exportCode(numberOfSlots) {
  try {
    let code = "";
    for (let i = 1; i <= numberOfSlots; i++) {
      const id = `E${i < 10 ? "0" : ""}${i}`;
      const slot = document.getElementById(id);
      if (slot.value) code = code + id + ": " + slot.value + "\n";
    }

    const path = await dialog.showSaveDialog({
      title: "Salvar como:",
      properties: [
        "createDirectory",
        "showOverwriteConfirmation",
        "dontAddToRecent"
      ],
      filters: [
        {
          name: "Códigos",
          extensions: ["txt"]
        }
      ]
    });

    if (!path.filePath)
      throw "ERRO: Escolha um nome de arquivo para salvar o código!";

    // eslint-disable-next-line no-sync
    fs.writeFileSync(path.filePath, code);
  } catch (err) {
    showError(err);
  }
}

module.exports = {
  importCode,
  exportCode
};
