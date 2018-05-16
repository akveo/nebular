import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgdTabbedService } from '../../../@theme/services';

@Component({
  selector: 'ngd-component-block',
  template: `
    <ngd-overview-block *ngIf="hasOverview(source)" [source]="source"></ngd-overview-block>
    <ngd-api-block *ngIf="hasAPI(source)" [source]="source"></ngd-api-block>
    <ngd-styles-block *ngIf="hasTheme(source)" [source]="source"></ngd-styles-block>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  hasAPI(component) {
    return this.hasMethods(component) || this.hasProps(component);
  }
}
