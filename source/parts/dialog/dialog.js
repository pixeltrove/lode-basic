// DIALOG
// -----------------------------------------------------------------------------

import initializeComponent from "../../helpers/initialize-component";
import transitionDisplay from "../../helpers/transition-display";
import toggleScroll from "../../helpers/toggle-scroll";
import trapFocus from "../../helpers/trap-focus";

const SELECTOR_DIALOG = ".dialog";
const SELECTOR_WRAPPER = ".dialog-wrapper";
const SELECTOR_SCRIM = ".dialog-scrim";
const SELECTOR_HIDE_DIALOG = "[data-hide-dialog]";
const CLASS_SHOWN = "shown";
const DATA_SHOW_DIALOG = "data-show-dialog";

function Dialog(dialog) {
  const dialogId = dialog.id;
  const trigger = document.querySelector(`[${DATA_SHOW_DIALOG}="${dialogId}"]`);
  const wrapper = dialog.closest(SELECTOR_WRAPPER);
  const scrim = wrapper.querySelector(SELECTOR_SCRIM);

  function show() {
    wrapper.classList.add(CLASS_SHOWN);
    transitionDisplay(dialog, "fade");
    transitionDisplay(scrim, "fade");
    dialog.setAttribute("tabindex", -1);
    dialog.focus();
    toggleScroll();

    dialog.addEventListener("click", handleHideClick);
    dialog.addEventListener("keydown", handleTabKeydown);
    scrim.addEventListener("click", handleScrimClick);
    document.addEventListener("keydown", handleEscapeKeydown);
  }

  function hide() {
    const handleWaitEnd = () => {
      wrapper.classList.remove(CLASS_SHOWN);

      scrim.removeEventListener("transitionend", handleWaitEnd);
    };

    transitionDisplay(dialog, "fade");
    transitionDisplay(scrim, "fade");
    dialog.removeAttribute("tabindex");
    trigger.focus();
    toggleScroll();

    scrim.addEventListener("transitionend", handleWaitEnd);

    dialog.removeEventListener("click", handleHideClick);
    dialog.removeEventListener("keydown", handleTabKeydown);
    scrim.removeEventListener("click", handleScrimClick);
    document.removeEventListener("keydown", handleEscapeKeydown);
  }

  function handleHideClick(event) {
    if (!event.target.closest(SELECTOR_HIDE_DIALOG)) return;

    hide();
  }

  function handleScrimClick(event) {
    if (!event.target.matches(SELECTOR_SCRIM)) return;

    hide();
  }

  function handleEscapeKeydown(event) {
    if (event.key !== "Escape") return;

    hide();
  }

  function handleTabKeydown(event) {
    if (event.key !== "Tab") return;

    trapFocus(dialog, event);
  }

  trigger.addEventListener("click", show);
}

initializeComponent(SELECTOR_DIALOG, Dialog);
