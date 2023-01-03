// TABSET
// -----------------------------------------------------------------------------

import initializeComponent from "../../helpers/initialize-component";

const SELECTOR_TABSET = ".tabset";
const SELECTOR_TAB = ".tabset-tab";
const CLASS_ACTIVATED = "activated";
const CLASS_SHOWN = "shown";
const DATA_SHOW_PANEL = "data-show-panel";

function Tabset(tabset) {
  const tabs = Array.from(tabset.querySelectorAll(SELECTOR_TAB));

  function swapPanel(targetTab) {
    const activatedTab = tabs.find((tab) => tab.classList.contains(CLASS_ACTIVATED));
    const activatedPanelId = activatedTab.getAttribute(DATA_SHOW_PANEL);
    const activatedPanel = document.querySelector(`#${activatedPanelId}`);
    const upcomingPanelId = targetTab.getAttribute(DATA_SHOW_PANEL);
    const upcomingPanel = document.querySelector(`#${upcomingPanelId}`);

    if (activatedTab !== targetTab) {
      activatedTab.classList.remove(CLASS_ACTIVATED);
      activatedTab.setAttribute("tabIndex", "-1");
      activatedPanel.classList.remove(CLASS_SHOWN);
      targetTab.classList.add(CLASS_ACTIVATED);
      targetTab.removeAttribute("tabIndex");
      upcomingPanel.classList.add(CLASS_SHOWN);
    }
  }

  function handleTabClick(event) {
    const targetTab = event.target.closest(SELECTOR_TAB);

    if (targetTab) {
      swapPanel(targetTab);
    }
  }

  tabset.addEventListener("click", handleTabClick);
}

initializeComponent(SELECTOR_TABSET, Tabset);
