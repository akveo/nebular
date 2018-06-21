import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'nb-list',
  template: `<ng-content></ng-content>`,
  styleUrls: [ './list.component.scss' ],
})
export class NbListComponent {
  @Input()
  @HostBinding('attr.role')
  role = 'list';
}

@Component({
  selector: 'nb-list-item',
  template: `<ng-content></ng-content>`,
  styleUrls: [ './list-item.component.scss' ],
})
export class NbListItemComponent {
  @Input()
  @HostBinding('attr.role')
  role = 'listitem';
}

@Component({
  selector: 'nb-list-items-group',
  template: `<ng-content></ng-content>`,
})
export class NbListItemsGroupComponent {
  @Input()
  @HostBinding('attr.role')
  role = 'group';
}
