import { Component, Input } from '@angular/core';
import { NbMenuItem } from '../../';

@Component({
  selector: 'nb-context-menu',
  styleUrls: ['./context-menu.component.scss'],
  template: '<nb-menu *ngIf="items" [items]="items"></nb-menu>',
})
export class NbContextMenuComponent {

  @Input()
  items: NbMenuItem[];
}
