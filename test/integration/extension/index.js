var EVENT_DOM_CONTENT_LOADED = 'DOMContentLoaded';

function getGreetingId() {
  return 'greeting';
}

function getGreeting() {
  return 'Hello, World!';
}

function getGreetingElement() {
  return document.getElementById(getGreetingId());
}

function renderGreeting() {
  getGreetingElement().textContent = getGreeting();
}

function fireWhenDOMContentIsLoaded() {
  renderGreeting();
}

document.addEventListener(EVENT_DOM_CONTENT_LOADED, fireWhenDOMContentIsLoaded);