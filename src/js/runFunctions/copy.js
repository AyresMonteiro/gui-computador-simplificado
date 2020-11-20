const showError = require("../showError.js");

module.exports = function (args = Array, id = Number, infoObject = {}) {
  try {
    if (args.length === 2) {
      let originSlot = parseInt(args[0].substr(1), 10);
      let destinySlot = parseInt(args[1].substr(1), 10);
      if (
        originSlot <= infoObject.numberOfSlots &&
        originSlot > 0 &&
        destinySlot <= infoObject.numberOfSlots &&
        destinySlot > 0
      ) {
        originSlot = document.getElementById(args[0]);
        destinySlot = document.getElementById(args[1]);

        destinySlot.value = originSlot.value;
      } else {
        throw `E${id}: ${args[0]} e/ou ${args[1]} estão errados!`;
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
