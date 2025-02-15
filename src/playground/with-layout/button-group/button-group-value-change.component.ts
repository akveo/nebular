import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    templateUrl: './button-group-value-change.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ButtonGroupValueChangeComponent {
  singleSelectGroupValue = [];
  multiSelectGroupValue = [];

  constructor(private cd: ChangeDetectorRef) {
  }

  updateSingleSelectGroupValue(value): void {
    this.singleSelectGroupValue = value;
    this.cd.markForCheck();
  }

  updateMultiSelectGroupValue(value): void {
    this.multiSelectGroupValue = value;
    this.cd.markForCheck();
  }
}
