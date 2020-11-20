function generateSlots(numberOfSlots = Number) {
  let numberOfLines = Math.ceil(numberOfSlots / 4);
  let slotContainer = document.getElementById("generated-slots");
  let content = "";

  slotContainer.innerHTML = "";

  for (let i = 0; i < numberOfLines; i++) {
    content = content + `<div class="line" id="l${i + 1}">\n`;
    for (let j = 0; j < 4; j++) {
      let id = i * 4;
      id = id + j + 1;
      if (!(id - 1 < numberOfSlots)) break;
      id = `${id < 10 ? "0" : ""}${id}`;
      content =
        content +
        `<div class="slot">\n<h5>${id}</h5>\n<input id="E${id}" />\n</div>\n`;
    }
    content = content + "</div>\n";
  }

  slotContainer.innerHTML = content;
}

function clearSlots(numberOfSlots) {
  for (let i = 1; i <= numberOfSlots; i++) {
    const id = `E${i < 10 ? "0" : ""}${i}`;
    const slot = document.getElementById(id);
    slot.value = "";
  }
}

module.exports = {
  generateSlots,
  clearSlots
};
