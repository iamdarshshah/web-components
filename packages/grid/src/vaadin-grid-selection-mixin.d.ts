declare function SelectionMixin<TItem, T extends new (...args: any[]) => {}>(
  base: T
): T & SelectionMixinConstructor<TItem>;

interface SelectionMixinConstructor<TItem> {
  new (...args: any[]): SelectionMixin<TItem>;
}

interface SelectionMixin<TItem> {
  /**
   * An array that contains the selected items.
   */
  selectedItems: Array<TItem>;

  /**
   * Selects the given item.
   *
   * @param item The item object
   */
  selectItem(item: TItem): void;

  /**
   * Deselects the given item if it is already selected.
   *
   * @param item The item object
   */
  deselectItem(item: TItem): void;
}

export { SelectionMixin, SelectionMixinConstructor };
