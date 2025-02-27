/**
 * @license
 * Copyright (c) 2021 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
import { ComboBoxScroller } from '@vaadin/vaadin-combo-box/src/vaadin-combo-box-scroller.js';

/**
 * An element used internally by `<vaadin-time-picker>`. Not intended to be used separately.
 *
 * @extends ComboBoxOverlay
 * @private
 */
class TimePickerScroller extends ComboBoxScroller {
  static get is() {
    return 'vaadin-time-picker-scroller';
  }
}

customElements.define(TimePickerScroller.is, TimePickerScroller);
