import { Component, Input, HostBinding } from '@angular/core';

/**
 * List is a container component that wraps `nb-list-item` component.
 *
 * Basic example:
 * @stacked-example(Simple list, list/simple-list-showcase.component)
 *
 * `nb-list-item` accepts arbitrary content, so you can create a list of any components.
 *
 * ### Installation
 *
 * Import `NbListModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbListModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * List of users:
 * @stacked-example(Users list, list/users-list-showcase.component)
 *
 * @styles
 *
 * list-item-divider-color:
 * list-item-divider-style:
 * list-item-divider-width:
 * list-item-padding:
 * list-item-text-color:
 * list-item-font-family:
 * list-item-font-size:
 * list-item-font-weight:
 * list-item-line-height:
 */
@Component({
  selector: 'nb-list',
  template: `<ng-content select="nb-list-item"></ng-content>`,
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
 * It should be direct child of `nb-list` componet.
 */
@Component({
  selector: 'nb-list-item',
  template: `<ng-content></ng-content>`,
  styleUrls: [ 'list-item.component.scss' ],
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
