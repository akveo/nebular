import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ComponentLink } from '../playground-components';

export function convertToBoolProperty(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();

    return val === 'true' || val === '';
  }

  return !!val;
}

@Component({
    selector: 'npg-components-list',
    styleUrls: ['./components-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div *ngFor="let component of components; trackBy: trackByFn" class="component-block">
      <span *ngIf="!component.component">{{ component.path }}</span>

      <a
        *ngIf="component.link"
        [routerLink]="component.link"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
        #link="routerLinkActive"
        [npgComponentLink]="component.link"
        class="component-link"
      >
        {{ component.name }}
        <ng-container *ngIf="link.isActive"> - active</ng-container>
      </a>

      <npg-components-list *ngIf="component.children" vertical [components]="component.children"></npg-components-list>
    </div>
    `,
    standalone: false
})
export class ComponentsListComponent {
  @Input()
  components: ComponentLink[] = [];

  @HostBinding('class.column')
  protected isVertical: boolean;

  @Input()
  set vertical(value) {
    this.isVertical = convertToBoolProperty(value);
  }
  get vertical() {
    return this.isVertical;
  }
  static ngAcceptInputType_vertical: boolean | string | null | undefined;

  trackByFn(index, item) {
    return item.link || item.path;
  }
}
