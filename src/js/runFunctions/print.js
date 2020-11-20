const showError = require("../showError.js");

module.exports = function (args = Array, id = Number, infoObject = {}) {
  try {
    if (args.length === 1) {
      let slot = parseInt(args[0].substr(1), 10);
      if (slot <= infoObject.numberOfSlots && slot > 0) {
        let text = document.getElementById("printed-text");
        let textToAppend = document.getElementById(args[0]).value;

        if (isNaN(textToAppend)) throw `Escaninho "${args[0]}" inválido`;

        text.innerHTML = text.innerHTML + `${textToAppend}<br>`;
        text.scrollTop = text.scrollHeight;
      } else {
        throw `E${id}: Escaninho "${args[0]}" inválido`;
      }
    } else {
      return 0;
    }
    return 1;
  } catch (err) {
    showError(err);
    return 0;
  }
};
