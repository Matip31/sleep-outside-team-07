// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}


export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
export function renderListWithTemplate(list, templateFunction, parentElement, clear = true, position = "afterbegin") {
  if (clear) {
    parentElement.innerHTML = "";
  }
  list.forEach((item) => {
    const html = templateFunction(item);
    parentElement.insertAdjacentHTML(position, html);
  });
}
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}


export async function loadHeaderFooter() {
  const baseURL = import.meta.env.BASE_URL;

  const headerTemplate = await loadTemplate(
    `${baseURL}partials/header.html`
  );

  const footerTemplate = await loadTemplate(
    `${baseURL}partials/footer.html`
  );

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  const logoImage = headerElement.querySelector(".logo img");
  const logoLink = headerElement.querySelector(".logo a");
  const cartLink = headerElement.querySelector(".cart a");

  logoImage.src = `${baseURL}images/noun_Tent_2517.svg`;
  logoLink.href = `${baseURL}index.html`;
  cartLink.href = `${baseURL}cart/index.html`;
}

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  return Object.fromEntries(formData.entries());
}




