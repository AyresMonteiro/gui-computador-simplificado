const { run, stop } = require("./src/js/flow.js");
const { loadInfoData } = require("./src/js/generateInfo.js");
const { importCode, exportCode } = require("./src/js/importExportHandler.js");
const { generateSlots, clearSlots } = require("./src/js/slots.js");
const {
  openInfo,
  openDataInput,
  openCommandsList,
  displayCommandsSublist,
  closeDataInput,
  closeCommandsList,
  closeAllInfo
} = require("./src/js/otherTabs.js");

const $ = document.querySelector.bind(document);

let numberOfSlots = 16;
let speed = 0.5;
let data = [];
let isDataLoaded = false;

$("#slots-input").addEventListener("change", e => {
  numberOfSlots = parseInt(e.target.value, 10);
  generateSlots(numberOfSlots);
});

$("#speed-input").addEventListener("change", e => {
  speed = e.target.value.replace(/[^0-9,.]*/gu, "").replace(",", ".");
  speed = parseFloat(speed);
  console.log(speed);
});

$("#run-button").addEventListener("click", () => {
  run(numberOfSlots, data, speed);
});

$("#stop-button").addEventListener("click", () => {
  stop(numberOfSlots);
});

$("#clear-button").addEventListener("click", () => {
  clearSlots(numberOfSlots);
});

$("#import-button").addEventListener("click", () => {
  importCode(numberOfSlots);
});

$("#export-button").addEventListener("click", () => {
  exportCode(numberOfSlots);
});

$("#open-data-button").addEventListener("click", openDataInput);
$("#close-data-button").addEventListener("click", closeDataInput);

$("#data-values").addEventListener("change", e => {
  data = e.target.value.replace(/[^0-9,]*/gu, "").split(",");
});

$("#open-commands-list-button").addEventListener("click", () => {
  if (!isDataLoaded) {
    loadInfoData();
    isDataLoaded = true;
  }
  openCommandsList();
  closeAllInfo();
  openInfo("pgc");
});
$("#close-commands-list-button").addEventListener("click", closeCommandsList);

$("#data-commands-controller").addEventListener("click", () => {
  displayCommandsSublist("data-commands", 273);
});

$("#flow-commands-controller").addEventListener("click", () => {
  displayCommandsSublist("flow-commands", 117);
});

Array.from($("#data-commands").children).forEach(element => {
  element.addEventListener("click", () => {
    closeAllInfo();
    openInfo(element.id);
  });
});

Array.from($("#flow-commands").children).forEach(element => {
  element.addEventListener("click", () => {
    closeAllInfo();
    openInfo(element.id);
  });
});

generateSlots(numberOfSlots);
