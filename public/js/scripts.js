document.body.addEventListener("htmx:afterRequest", (event) => {
  const xhr = event.detail.xhr;
  const redirect = xhr.getResponseHeader("HX-Redirect");

  if (redirect) {
    window.location.href = redirect;
  }
});
