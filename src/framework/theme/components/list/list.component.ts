import { Component, Input, HostBinding } from '@angular/core';

/**
 * List component is a container component that wraps `nb-list-item` or `nb-list-items-group` components.
 *
 * Basic example:
 * @stacked-example(Showcase, list/list-showcase.component)
 */
@Component({
  selector: 'nb-list',
  template: `<ng-content></ng-content>`,
  styleUrls: [ './list.component.scss' ],
})
export class NbListComponent {
  /**
   * Role attribute value
   *
   * @type {string}
   */
  @Input()
  @HostBinding('attr.role')
  role = 'list';
}

/**
 * List item component is a grouping component that accepts arbitrary content.
 * It should be direct child of `nb-list` or `nb-list-items-group` componets.
 */
@Component({
  selector: 'nb-list-item',
  template: `<ng-content></ng-content>`,
  styleUrls: [ './list-item.component.scss' ],
})
export class NbListItemComponent {
  /**
   * Role attribute value
   *
   * @type {string}
   */
  @Input()
  @HostBinding('attr.role')
  role = 'listitem';
}

/**
 * List item group is a grouping component for `nb-list-item`.
 * It should be direct child of `nb-list` component.
 */
@Component({
  selector: 'nb-list-items-group',
  template: `<ng-content></ng-content>`,
})
export class NbListItemsGroupComponent {
  /**
   * Role attribute value
   *
   * @type {string}
   */
  @Input()
  @HostBinding('attr.role')
  role = 'group';
}
