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
 * list-item-border-color:
 * list-item-padding:
 */
@Component({
  selector: 'nb-list',
  templateUrl: './list.component.html',
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
  templateUrl: './list-item.component.html',
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
