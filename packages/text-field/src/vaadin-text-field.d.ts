/**
 * @license
 * Copyright (c) 2021 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */
import { ElementMixin } from '@vaadin/component-base/src/element-mixin.js';
import { InputFieldMixin } from '@vaadin/field-base/src/input-field-mixin.js';
import { PatternMixin } from '@vaadin/field-base/src/pattern-mixin.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';

/**
 * Fired when the `invalid` property changes.
 */
export type TextFieldInvalidChangedEvent = CustomEvent<{ value: boolean }>;

/**
 * Fired when the `value` property changes.
 */
export type TextFieldValueChangedEvent = CustomEvent<{ value: string }>;

export interface TextFieldCustomEventMap {
  'invalid-changed': TextFieldInvalidChangedEvent;

  'value-changed': TextFieldValueChangedEvent;
}

export interface TextFieldEventMap extends HTMLElementEventMap, TextFieldCustomEventMap {}

/**
 * `<vaadin-text-field>` is a web component that allows the user to input and edit text.
 *
 * ```html
 * <vaadin-text-field label="First Name"></vaadin-text-field>
 * ```
 *
 * ### Prefixes and suffixes
 *
 * These are child elements of a `<vaadin-text-field>` that are displayed
 * inline with the input, before or after.
 * In order for an element to be considered as a prefix, it must have the slot
 * attribute set to `prefix` (and similarly for `suffix`).
 *
 * ```html
 * <vaadin-text-field label="Email address">
 *   <div slot="prefix">Sent to:</div>
 *   <div slot="suffix">@vaadin.com</div>
 * </vaadin-text-field>
 * ```
 *
 * ### Styling
 *
 * The following custom properties are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|-------------
 * `--vaadin-text-field-default-width` | Set the default width of the input field | `12em`
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name       | Description
 * ----------------|----------------
 * `label`         | The label element
 * `input-field`   | The element that wraps prefix, value and suffix
 * `error-message` | The error message element
 *
 * The following state attributes are available for styling:
 *
 * Attribute           | Description | Part name
 * --------------------|-------------|------------
 * `disabled`          | Set to a disabled text field | :host
 * `has-value`         | Set when the element has a value | :host
 * `has-label`         | Set when the element has a label | :host
 * `has-helper`        | Set when the element has helper text or slot | :host
 * `has-error-message` | Set when the element has an error message | :host
 * `invalid`           | Set when the element is invalid | :host
 * `input-prevented`   | Temporarily set when invalid input is prevented | :host
 * `focused`           | Set when the element is focused | :host
 * `focus-ring`        | Set when the element is keyboard focused | :host
 * `readonly`          | Set to a readonly text field | :host
 *
 * See [Styling Components](https://vaadin.com/docs/latest/ds/customization/styling-components) documentation.
 *
 * @fires {Event} input - Fired when the value is changed by the user: on every typing keystroke, and the value is cleared using the clear button.
 * @fires {Event} change - Fired when the user commits a value change.
 * @fires {CustomEvent} invalid-changed - Fired when the `invalid` property changes.
 * @fires {CustomEvent} value-changed - Fired when the `value` property changes.
 */
declare class TextField extends PatternMixin(InputFieldMixin(ThemableMixin(ElementMixin(HTMLElement)))) {
  /**
   * Maximum number of characters (in Unicode code points) that the user can enter.
   */
  maxlength: number | null | undefined;

  /**
   * Minimum number of characters (in Unicode code points) that the user can enter.
   */
  minlength: number | null | undefined;

  addEventListener<K extends keyof TextFieldEventMap>(
    type: K,
    listener: (this: TextField, ev: TextFieldEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<K extends keyof TextFieldEventMap>(
    type: K,
    listener: (this: TextField, ev: TextFieldEventMap[K]) => void,
    options?: boolean | EventListenerOptions
  ): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-text-field': TextField;
  }
}

export { TextField };
