function showError(message) {
  let errors = document.getElementById("errors");
  errors.innerHTML = errors.innerHTML + `${message}<br>`;
  errors.scrollTop = errors.scrollHeight;
}

module.exports = showError;
