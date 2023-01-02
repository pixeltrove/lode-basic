// TRAP FOCUS
// -----------------------------------------------------------------------------

const SELECTOR_FOCUSABLE_ELEMENTS = ":where(a[href], audio[controls], video[controls], summary, [contenteditable]):not([tabindex^='-']), :where(button, input, select, textarea):not([tabindex^='-'], [disabled])";

function trapFocus(element, event) {
  const focusableElements = Array.from(element.querySelectorAll(SELECTOR_FOCUSABLE_ELEMENTS));
  const lastIndex = focusableElements.length - 1;
  const outgoingIndex = focusableElements.indexOf(document.activeElement);

  if (event.shiftKey && (outgoingIndex === 0 || document.activeElement === element)) {
    event.preventDefault();
    focusableElements[lastIndex].focus();
  } else if (!event.shiftKey && outgoingIndex === lastIndex) {
    event.preventDefault();
    focusableElements[0].focus();
  }
}

export default trapFocus;
