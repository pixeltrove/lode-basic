// ACCORDION
// -----------------------------------------------------------------------------

import initializeComponent from "../../helpers/initialize-component";
import transitionDisplay from "../../helpers/transition-display";

const SELECTOR_ACCORDION = ".accordion";
const SELECTOR_SLAT = ".accordion-slat";
const CLASS_ACTIVATED = "activated";
const DATA_TOGGLE_CONVERTIBLE = "data-toggle-convertible";

function Accordion(accordion) {
  function handleSlatClick(event) {
    if (!event.target.closest(SELECTOR_SLAT)) return;

    const targetSlat = event.target.closest(SELECTOR_SLAT);
    const panelId = targetSlat.getAttribute(DATA_TOGGLE_CONVERTIBLE);
    const panel = document.getElementById(panelId);
    const isExpanded = targetSlat.getAttribute("aria-expanded") === "true";

    targetSlat.classList.toggle(CLASS_ACTIVATED);
    targetSlat.setAttribute("aria-expanded", isExpanded ? "false" : "true");

    transitionDisplay(panel, "convert");
  }

  accordion.addEventListener("click", handleSlatClick);
}

initializeComponent(SELECTOR_ACCORDION, Accordion);
