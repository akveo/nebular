import { Component } from '@angular/core';
import { NbLayoutDirectionService, NbLayoutDirection } from '@nebular/theme';

@Component({
  selector: 'nb-layout-direction-toggle',
  styleUrls: [ './layout-direction-toggle.component.scss' ],
  template: `
    <label dir="ltr">
      <input type="checkbox" value="isRtl" (click)="toggleFlow()" />
      <span>RTL</span>
    </label>
  `,
})
export class LayoutDirectionToggleComponent {
  constructor(private directionService: NbLayoutDirectionService) {}

  get isRtl() {
    return this.directionService.isRtl();
  }

  toggleFlow() {
    const oppositeDirection = this.isRtl
      ? NbLayoutDirection.LTR
      : NbLayoutDirection.RTL;
    this.directionService.setDirection(oppositeDirection);
  }
}
