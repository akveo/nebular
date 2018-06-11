import { Component, HostBinding, Input, TemplateRef, Type } from '@angular/core';
import { NbPortalContent } from '../portal/portal-outlet';
import { NbPortalComponent } from '../portal/portal.component';

@Component({
  selector: 'nb-collapsable',
  template: `
    <nb-card>
      <nb-card-header>
        <div class="collapsable-header">
          <div>{{ title }}</div>
          <div class="header-right">
            <div class="icon icon-collapse" (click)="toggleCollapse()"></div>
            <div class="icon"
                 [ngClass]="expanded ? 'icon-unexpand' : 'icon-expand'" (click)="toggleExpand()"></div>
            <i class="nb-close" (click)="close()"></i>
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
   * Methods implemented in collapsable directive and assigned through context
   */
  onExpandToggle(a, b) { };
  onCollapseToggle(a, b) { };
  onClose(a) { };

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
