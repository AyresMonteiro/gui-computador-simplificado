const showError = require("../showError.js");

module.exports = function (args = Array, id = Number, infoObject = {}) {
  try {
    if (args.length === 3) {
      let firstHalf = parseInt(args[0].substr(1), 10);
      let secondHalf = parseInt(args[1].substr(1), 10);
      let destinySlot = parseInt(args[2].substr(1), 10);
      if (
        firstHalf <= infoObject.numberOfSlots &&
        firstHalf > 0 &&
        secondHalf <= infoObject.numberOfSlots &&
        secondHalf > 0 &&
        destinySlot <= infoObject.numberOfSlots &&
        destinySlot > 0
      ) {
        firstHalf = document.getElementById(args[0]).value;
        if (isNaN(firstHalf)) throw `Escaninho "${args[0]}" inválido`;

        secondHalf = document.getElementById(args[1]).value;
        if (isNaN(secondHalf)) throw `Escaninho "${args[0]}" inválido`;

        firstHalf = parseInt(firstHalf, 10);
        secondHalf = parseInt(secondHalf, 10);

        destinySlot = document.getElementById(args[2]);

        destinySlot.value = firstHalf - secondHalf;
      } else {
        throw `E${id}: ${args[0]}, ${args[1]} e/ou ${args[2]} estão errados!`;
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
