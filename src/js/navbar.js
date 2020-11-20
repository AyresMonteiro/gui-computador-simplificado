const { remote } = require("electron");

document.getElementById("minimize-button").addEventListener("click", () => {
  let window = remote.getCurrentWindow();
  window.minimize();
});

document.getElementById("close-button").addEventListener("click", () => {
  let window = remote.getCurrentWindow();
  window.close();
});
