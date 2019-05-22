import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, QueryList, ViewChildren,
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { ComponentLink } from '../playground-components';

export function convertToBoolProperty(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();

    return (val === 'true' || val === '');
  }

  return !!val;
}

@Component({
  selector: 'nb-components-list',
  styleUrls: [ './components-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let component of components" class="component-block">
      <span *ngIf="!component.component">{{ component.path }}</span>

      <a *ngIf="component.link"
         [routerLink]="component.link"
         routerLinkActive="active"
         [routerLinkActiveOptions]="{ exact: true }"
         #link="routerLinkActive"
         class="component-link">
        {{ component.name }}
        <ng-container *ngIf="link.isActive"> - active</ng-container>
      </a>

      <nb-components-list *ngIf="component.children" vertical [components]="component.children">
      </nb-components-list>
    </div>
  `,
})
export class ComponentsListComponent implements AfterViewInit {
  @Input()
  components: ComponentLink[] = [];

  @HostBinding('class.column')
  private isVertical: boolean;

  @Input()
  set vertical(value) {
    this.isVertical = convertToBoolProperty(value);
  }
  get vertical() {
    return this.isVertical;
  }

  @ViewChildren(RouterLinkActive) routerLinks: QueryList<RouterLinkActive>;
  @ViewChildren('link', { read: ElementRef }) linkElements: QueryList<ElementRef<HTMLAnchorElement>>;

  ngAfterViewInit() {
    // RouterLinkActive sets isActive asynchronously so it isn't available at the moment
    setTimeout(() => this.focusActiveLink());
  }

  private focusActiveLink() {
    const activeLink = this.routerLinks.find(({ isActive }) => isActive);
    if (activeLink) {
      const index = this.routerLinks.toArray().indexOf(activeLink);
      this.linkElements.toArray()[index].nativeElement.focus();
    }
  }
}
