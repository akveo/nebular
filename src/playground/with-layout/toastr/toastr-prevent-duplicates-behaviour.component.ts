import { Component, HostBinding } from '@angular/core';
import { NbDuplicateToastBehaviour, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'nb-toastr-prevent-duplicates-behaviour',
  template: `
    <button nbButton (click)="showToast('Toast 1', 'success')">Show toast 1</button>
    <button nbButton (click)="showToast('Toast 2', 'danger')">Show toast 2</button>

    <nb-radio-group [(ngModel)]="option">
      <nb-radio
        *ngFor="let option of options"
        [value]="option.value">
        {{ option.label }}
      </nb-radio>
    </nb-radio-group>
  `,
  styles: [
    `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})

export class ToastrPreventDuplicatesBehaviourComponent {

  @HostBinding('class')
  classes = 'example-items-rows';

  constructor(private toastrService: NbToastrService) {
  }

  options = [
    { value: 'previous' , label: 'Duplicate previous', checked: true },
    { value: 'all' , label: 'Duplicate all' },
  ];

  option: NbDuplicateToastBehaviour = 'previous';

  showToast(message, status) {
    this.toastrService.show(
      message,
      `This is toast title`,
      { preventDuplicates: true, duplicatesBehaviour: this.option, status });
  }
}
