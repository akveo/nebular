import { Component, Input } from '@angular/core';
import { NgdTabbedService } from '../../../@theme/services';

@Component({
  selector: 'ngd-component-block',
  template: `
    <ngd-overview-block *ngIf="hasOverview(source)" [source]="source">
    </ngd-overview-block>
    <ngd-props-block *ngIf="hasProps(source)" [source]="source">
    </ngd-props-block>
    <ngd-methods-block *ngIf="hasMethods(source)" [source]="source">
    </ngd-methods-block>
    <ngd-styles-block *ngIf="hasTheme(source)" [source]="source">
    </ngd-styles-block>
  `,
})
export class NgdComponentBlockComponent {

  @Input() source: any;

  constructor(private tabbedService: NgdTabbedService) {
  }

  hasOverview(component) {
    return this.tabbedService.componentHasOverview(component);
  }

  hasExamples(component) {
    return this.tabbedService.componentHasExamples(component);
  }

  hasTheme(component) {
    return this.tabbedService.componentHasTheme(component);
  }

  hasMethods(component) {
    return this.tabbedService.componentHasMethods(component);
  }

  hasProps(component) {
    return this.tabbedService.componentHasProps(component);
  }
}
