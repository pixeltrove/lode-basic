// INITIALIZE COMPONENT
// -----------------------------------------------------------------------------

function initializeComponent(selector, definition) {
  const elements = Array.from(document.querySelectorAll(selector));

  elements.forEach((element) => definition(element));
}

export default initializeComponent;
