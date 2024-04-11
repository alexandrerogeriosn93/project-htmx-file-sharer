document.body.addEventListener("htmx:afterRequest", (event) => {
  const msgElement = document.querySelector("#msg");

  if (msgElement.textContent.trim() !== "") {
    msgElement.classList.remove("hidden");
  }

  const xhr = event.detail.xhr;
  const redirect = xhr.getResponseHeader("HX-Redirect");

  if (redirect) {
    window.location.href = redirect;
  }
});
