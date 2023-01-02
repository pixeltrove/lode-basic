// TRANSITION DISPLAY
// -----------------------------------------------------------------------------

const CLASS_SHOWN = "shown";
const PROPERTY_CONVERTIBLE_HEIGHT = "--convertible-height";

// Enter

function enter(element, effect, classes, state) {
  const start = () => {
    element.classList.add(CLASS_SHOWN);
    element.classList.add(classes.enter);
    element.classList.add(classes.enterFrom);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (effect === "convert") {
          element.style.setProperty(PROPERTY_CONVERTIBLE_HEIGHT, element.scrollHeight + "px");
        }

        element.classList.remove(classes.enterFrom);
        element.classList.add(classes.enterTo);
      });
    });
  };

  const cancel = () => {
    element.classList.toggle(classes.enterTo);
    element.classList.toggle(classes.enterFrom);
  };

  const end = () => {
    if (effect === "convert") {
      element.style.removeProperty(PROPERTY_CONVERTIBLE_HEIGHT);
    }

    element.classList.remove(classes.enter);

    if (element.classList.contains(classes.enterTo)) {
      element.classList.remove(classes.enterTo);
    } else if (element.classList.contains(classes.enterFrom)) {
      element.classList.remove(classes.enterFrom);
      element.classList.remove(CLASS_SHOWN);
    }
  };

  const handleEnd = (event) => {
    if (event.target !== event.currentTarget) return;

    end();

    element.removeEventListener("transitionend", handleEnd);
  };

  if (!state.isEntering) {
    start();

    element.addEventListener("transitionend", handleEnd);
  } else {
    cancel();
  }
}

// Leave

function leave(element, effect, classes, state) {
  const start = () => {
    if (effect === "convert") {
      element.style.setProperty(PROPERTY_CONVERTIBLE_HEIGHT, element.scrollHeight + "px");
    }

    element.classList.add(classes.leave);
    element.classList.add(classes.leaveFrom);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.classList.remove(classes.leaveFrom);
        element.classList.add(classes.leaveTo);
      });
    });
  };

  const cancel = () => {
    element.classList.toggle(classes.leaveTo);
    element.classList.toggle(classes.leaveFrom);
  };

  const end = () => {
    if (effect === "convert") {
      element.style.removeProperty(PROPERTY_CONVERTIBLE_HEIGHT);
    }

    element.classList.remove(classes.leave);

    if (element.classList.contains(classes.leaveTo)) {
      element.classList.remove(classes.leaveTo);
      element.classList.remove(CLASS_SHOWN);
    } else if (element.classList.contains(classes.leaveFrom)) {
      element.classList.remove(classes.leaveFrom);
    }
  };

  const handleEnd = (event) => {
    if (event.target !== event.currentTarget) return;

    end();

    element.removeEventListener("transitionend", handleEnd);
  };

  if (!state.isLeaving) {
    start();

    element.addEventListener("transitionend", handleEnd);
  } else {
    cancel();
  }
}

// Transition display

function transitionDisplay(element, effect, timing = "regular") {
  const classes = {
    enter: `${effect}-enter-${timing}`,
    enterFrom: `${effect}-enter-from-${timing}`,
    enterTo: `${effect}-enter-to-${timing}`,
    leave: `${effect}-leave-${timing}`,
    leaveFrom: `${effect}-leave-from-${timing}`,
    leaveTo: `${effect}-leave-to-${timing}`,
  };

  const state = {
    isShown: element.classList.contains(CLASS_SHOWN),
    isEntering: element.classList.contains(classes.enter),
    isLeaving: element.classList.contains(classes.leave),
  };

  if (!state.isShown || state.isEntering) {
    enter(element, effect, classes, state);
  } else {
    leave(element, effect, classes, state);
  }
}

export default transitionDisplay;
