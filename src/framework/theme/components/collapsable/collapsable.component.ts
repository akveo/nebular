import { Component, EventEmitter, HostBinding, Input, Output, TemplateRef, Type } from '@angular/core';
import { NbPortalContent } from '../portal/portal-outlet';
import { NbPortalComponent } from '../portal/portal.component';

@Component({
  selector: 'nb-collapsable',
  template: `
    <nb-card>
      <nb-card-header>
        <div class="collapsable-header">
          <div>{{ title }}</div>
          <div class="header-left">
            <i class="collapse-button nb-arrow-dropdown" (click)="toggleCollapse(portal)"></i>
            <i class="minimize-button nb-arrow-dropup" (click)="toggleExpand(portal)"></i>
            <i class="close-button nb-close" (click)="close(portal)"></i>
          </div>
        </div>
      </nb-card-header>
      <nb-card-body>
        <ng-container *ngIf="isTemplate">
          <ng-container *ngTemplateOutlet="content; context: context"></ng-container>
        </ng-container>
        <ng-container *ngIf="isComponent" [ngComponentOutlet]="content"></ng-container>
        <ng-container *ngIf="isPrimitive">
          <div class="primitive-collapsable">{{content}}</div>
        </ng-container>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['collapsable.component.scss'],
})

export class NbCollapsableComponent {

  /**
   * Content which will be rendered.
   * */
  @Input()
  content: NbPortalContent;

  /**
   * Context which will be passed to rendered component instance.
   * */
  @Input()
  context: Object;

  title: string;

  id: string;

  @HostBinding('class.collapsed')
  collapsed = false;

  @HostBinding('class.expanded')
  expanded = false;

  constructor(public portal: NbPortalComponent) { }

  toggleCollapse() {
    if (this.expanded) {
      this.toggleExpand();
    }
    this.collapsed = !this.collapsed;
    this.onCollapseToggle(this.portal, this.collapsed);
  }

  onExpandToggle(a, b) { };
  onCollapseToggle(a, b) {};
  onClose(a) {};

  toggleExpand() {
    if (this.collapsed) {
      this.collapsed = !this.collapsed;
    }
    this.expanded = !this.expanded;
    this.onExpandToggle(this.portal, this.expanded);
  }

  close() {
    if (this.expanded) {
      this.toggleExpand()
    }
    this.onClose(this.portal);
  }
  /**
   * Check that content is a TemplateRef.
   *
   * @return boolean
   * */
  get isTemplate(): boolean {
    return this.content instanceof TemplateRef;
  }

  /**
   * Check that content is an angular component.
   *
   * @return boolean
   * */
  get isComponent(): boolean {
    return this.content instanceof Type;
  }

  /**
   * Check that if content is not a TemplateRef or an angular component it means a primitive.
   * */
  get isPrimitive(): boolean {
    return !this.isTemplate && !this.isComponent;
  }
}
