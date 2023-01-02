// MENU
// -----------------------------------------------------------------------------

import initializeComponent from "../../helpers/initialize-component";
import transitionDisplay from "../../helpers/transition-display";

const SELECTOR_MENU = ".menu";
const SELECTOR_FOCUSABLE_ELEMENTS = ":where(a[href], audio[controls], video[controls], summary, [contenteditable]):not([tabindex^='-']), :where(button, input, select, textarea):not([tabindex^='-'], [disabled])";
const CLASS_ACTIVATED = "activated";
const CLASS_SHOWN = "shown";
const DATA_TOGGLE_MENU = "data-toggle-menu";

function Menu(menu) {
  const menuId = menu.id;
  const trigger = document.querySelector(`[${DATA_TOGGLE_MENU}="${menuId}"]`);
  const focusableElements = Array.from(menu.querySelectorAll(SELECTOR_FOCUSABLE_ELEMENTS));
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  function toggle() {
    const isShown = menu.classList.contains(CLASS_SHOWN);

    isShown ? hide() : show();
  }

  function show() {
    trigger.classList.add(CLASS_ACTIVATED);
    trigger.setAttribute("aria-expanded", true);
    transitionDisplay(menu, "slide");

    trigger.addEventListener("keydown", handleTabKeydown);
    menu.addEventListener("keydown", handleTabKeydown);
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKeydown);
  }

  function hide() {
    trigger.classList.remove(CLASS_ACTIVATED);
    trigger.setAttribute("aria-expanded", false);
    transitionDisplay(menu, "slide");

    trigger.removeEventListener("keydown", handleTabKeydown);
    menu.removeEventListener("keydown", handleTabKeydown);
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("keydown", handleEscapeKeydown);
  }

  function handleOutsideClick(event) {
    if (!trigger.contains(event.target) && !menu.contains(event.target)) {
      hide();
    }
  }

  function handleEscapeKeydown(event) {
    if (event.key === "Escape") {
      hide();
    }
  }

  function handleTabKeydown(event) {
    if (event.key === "Tab" && ((event.shiftKey && document.activeElement === trigger) || (!event.shiftKey && document.activeElement === lastFocusableElement))) {
      hide();
    }
  }

  trigger.addEventListener("click", toggle);
}

initializeComponent(SELECTOR_MENU, Menu);
