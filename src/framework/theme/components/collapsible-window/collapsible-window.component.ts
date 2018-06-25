import { ChangeDetectorRef, Component, HostBinding, Input, TemplateRef, Type } from '@angular/core';
import { NbPortalContent } from '../portal/portal-outlet';
import { NbPortalComponent } from '../portal/portal.component';

@Component({
  selector: 'nb-collapsible-window',
  templateUrl: 'collapsible-window.component.html',
  styleUrls: ['collapsible-window.component.scss'],
})
export class NbCollapsibleWindowComponent {
  /**
   * Content which will be rendered.
   * */
  @Input() content: NbPortalContent;

  /**
   * Context which will be passed to rendered component instance.
   * */
  @Input() context: Object;

  title: string;

  @HostBinding('class.collapsed') collapsed = false;

  @HostBinding('class.expanded') expanded = false;

  constructor(public portal: NbPortalComponent,
              private changeDetectorRef: ChangeDetectorRef ) {}

  toggleCollapse() {
    if (this.expanded) {
      this.toggleExpand();
    }
    this.collapsed = !this.collapsed;
    this.changeDetectorRef.detectChanges();
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
      this.toggleExpand();
    }
    this.onClose(this.portal);
  }

  /**
   * Methods implemented in collapsable directive and assigned through context
   */
  onExpandToggle(a, b) {}
  onCollapseToggle(a, b) {}
  onClose(a) {}

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
