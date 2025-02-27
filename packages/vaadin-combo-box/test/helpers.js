import { click, fire, mousedown, mouseup } from '@vaadin/testing-helpers';

export const createEventSpy = (type, preventDefault) => {
  // Fake a keydown event to mimic form submit.
  const event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true
  });
  event.preventDefault = preventDefault;
  return event;
};

export const fireDownUpClick = (node) => {
  mousedown(node);
  mouseup(node);
  click(node);
};

export const onceOpened = (element) => {
  return new Promise((resolve) => {
    const listener = (e) => {
      if (e.detail.value) {
        element.removeEventListener('opened-changed', listener);
        // wait for scroll position adjustment
        window.requestAnimationFrame(() => {
          resolve();
        });
      }
    };
    element.addEventListener('opened-changed', listener);
  });
};

export const onceScrolled = (comboBox) => {
  const scroller = comboBox.$.dropdown._scroller;
  return new Promise((resolve) => {
    const listener = () => {
      scroller.removeEventListener('scroll', listener);
      setTimeout(() => {
        resolve();
      });
    };
    scroller.addEventListener('scroll', listener);
  });
};

export const makeItems = (length) => {
  return Array(...new Array(length)).map((_, i) => `item ${i}`);
};

/**
 * Returns first item of the combo box dropdown.
 */
export const getFirstItem = (comboBox) => {
  return comboBox.$.dropdown._scroller.querySelector('vaadin-combo-box-item');
};

/**
 * Returns selected item in the combo box dropdown.
 */
export const getSelectedItem = (comboBox) => {
  return comboBox.$.dropdown._scroller.querySelector('[selected]');
};

/**
 * Returns all the items of the combo box dropdown.
 */
export const getAllItems = (comboBox) => {
  return Array.from(comboBox.$.dropdown._scroller.querySelectorAll('vaadin-combo-box-item'))
    .filter((item) => !item.hidden)
    .sort((a, b) => a.index - b.index);
};

/**
 * Returns the items that are inside the bounds of the given combo box's dropdown viewport.
 */
export const getViewportItems = (comboBox) => {
  const overlayRect = comboBox.$.dropdown.$.overlay.$.content.getBoundingClientRect();

  // Firefox can produce values like 19.199996948242188
  const top = Math.round(overlayRect.top);
  const bottom = Math.round(overlayRect.bottom);

  return getAllItems(comboBox).filter((item) => {
    const itemRect = item.getBoundingClientRect();
    return Math.round(itemRect.bottom) > top && Math.round(itemRect.top) < bottom;
  });
};

export const getVisibleItemsCount = (comboBox) => {
  return comboBox.$.dropdown._scroller._visibleItemsCount();
};

/**
 * Scrolls the combo box dropdown to the given index.
 */
export const scrollToIndex = (comboBox, index) => {
  comboBox.$.dropdown._scroller.__virtualizer.scrollToIndex(index);
};

/**
 * Flush the combo box scroller to mitigate timing issues.
 */
export const flushComboBox = (comboBox) => {
  comboBox.$.dropdown._scroller.__virtualizer.flush();
};

/**
 * Emulates selecting an item at the given index.
 */
export const selectItem = (comboBox, index) => {
  // simulates clicking on the overlay items, but it more reliable in tests.
  fire(comboBox.$.dropdown, 'selection-changed', {
    item: comboBox.items[index]
  });
};
