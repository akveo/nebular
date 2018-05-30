import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nb-chips-colors',
  templateUrl: './chips-colors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChipsColorsComponent {
  chips = [
    { caption: 'default', status: null },
    { caption: 'active', status: 'active' },
    { caption: 'disabled', status: 'disabled' },
    { caption: 'primary', status: 'primary' },
    { caption: 'info', status: 'info' },
    { caption: 'success', status: 'success' },
    { caption: 'warning', status: 'warning' },
    { caption: 'danger', status: 'danger' },
  ];
}
