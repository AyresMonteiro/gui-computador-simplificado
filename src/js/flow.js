const showError = require("./showError.js");

const IMP = require("./runFunctions/print.js");
const COP = require("./runFunctions/copy.js");
const SOM = require("./runFunctions/sum.js");
const SUB = require("./runFunctions/subtract.js");
const MUL = require("./runFunctions/multiply.js");
const DIV = require("./runFunctions/divide.js");

let dataIndex = 0;
let i = 1;

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const functions = {
  VT: function (args = Array, id = String, infoObject = {}) {
    try {
      if (args.length === 1) {
        let slot = parseInt(args[0].substr(1), 10);
        if (slot <= infoObject.numberOfSlots && slot > 0) {
          i = slot - 1;
        } else {
          throw `E${id}: Escaninho ${args[0]} inválido.`;
        }
      } else {
        return 0;
      }
      return 1;
    } catch (err) {
      showError(err);
      return 0;
    }
  },
  SUB,
  SOM,
  SE: function (args = Array, id = String, infoObject = {}) {
    try {
      if (args.length === 4) {
        let firstSlot = parseInt(args[0].substr(1), 10);
        // eslint-disable-next-line prefer-destructuring
        let operation = args[1];
        let secondSlot = parseInt(args[2].substr(1), 10);
        let destinySlot = parseInt(args[3].substr(1), 10);
        if (
          firstSlot <= infoObject.numberOfSlots &&
          firstSlot > 0 &&
          secondSlot <= infoObject.numberOfSlots &&
          secondSlot > 0 &&
          destinySlot <= infoObject.numberOfSlots &&
          destinySlot > 0 &&
          (operation === ">" || operation === "<" || operation === "=")
        ) {
          firstSlot = parseInt(document.getElementById(args[0]).value, 10);
          secondSlot = parseInt(document.getElementById(args[2]).value, 10);
          if (
            // eslint-disable-next-line no-extra-parens
            (operation === ">" && firstSlot > secondSlot) ||
            // eslint-disable-next-line no-extra-parens
            (operation === "<" && firstSlot < secondSlot) ||
            // eslint-disable-next-line no-extra-parens
            (operation === "=" && firstSlot === secondSlot)
          ) {
            i = destinySlot - 1;
          }
        } else {
          throw (
            `E${id}: Escaninhos ${args[0]}, ${args[2]} ou ${args[3]}` +
            ` inválidos ou operador ${args[1]} inválido.`
          );
        }
      } else {
        return 0;
      }
      return 1;
    } catch (err) {
      showError(err);
      return 0;
    }
  },
  PGC: function (args = Array, id = String, infoObject = {}) {
    try {
      if (args.length === 1) {
        let slot = parseInt(args[0].substr(1), 10);
        if (slot <= infoObject.numberOfSlots && slot > 0) {
          slot = document.getElementById(args[0]);
          if (dataIndex < infoObject.data.length) {
            slot.value = infoObject.data[dataIndex];
            dataIndex = dataIndex + 1;
          } else {
            throw `E${id}: Não há mais cartões!`;
          }
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
  },
  MUL,
  IMP,
  DIV,
  COP
};

async function run(numberOfSlots, data, speed) {
  let text = document.getElementById("printed-text");
  let errors = document.getElementById("errors");
  text.innerHTML = "";
  errors.innerHTML = "";

  dataIndex = 0;

  const infoObject = {
    numberOfSlots,
    data
  };

  for (i = 1; i <= numberOfSlots; i++) {
    let slotId = `E${i > 9 ? i : `0${i}`}`;
    let slot = document.getElementById(slotId);
    slot.focus();

    let { value } = slot;

    if (!value) {
      showError(`E${i}: Escaninho em branco! Use o comando PARE.`);
      break;
    }

    value = value.toUpperCase();

    let [fn, ...args] = value.split(" ");

    if (fn === "PARE") break;

    if (functions[fn]) {
      if (!functions[fn](args, i, infoObject)) {
        showError(`E${i}: Erro de sintaxe!`);
      }
    } else {
      showError(`E${i}: O comando ${fn} não existe!`);
    }

    // eslint-disable-next-line no-await-in-loop
    await sleep(speed * 1000);
  }
}

function stop(numberOfSlots) {
  i = numberOfSlots;
}

module.exports = {
  stop,
  showError,
  run
};
