import { Component, HostBinding } from '@angular/core';
import { NbToastrService, NbToastRef } from '@nebular/theme';

@Component({
  selector: 'npg-toastr-actions',
  template: `
    <button nbButton (click)="show1Action()">With 1 action</button>
    <button nbButton (click)="show1Action(true)">With 1 action (destroy on callback)</button>
    <button nbButton (click)="showMultipleActions()">With multiple actions</button>
    <button nbButton (click)="showMultipleActions(true)">With multiple actions (destroy on callback)</button>
  `,
  styles: [
    `
      ::ng-deep nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class ToastrActionsComponent {
  private index: number = 0;

  @HostBinding('class')
  className = 'example-items-rows';

  constructor(private toastrService: NbToastrService) {}

  currentToast: NbToastRef | undefined;

  show1Action(destroyOnActionCallback = false) {
    this.currentToast = this.toastrService.show(
      'Message',
      `Toast: ${++this.index}`,
      [{ text: 'Close', color: 'basic', callback: () => this.currentToast?.close() }],
      {
        destroyOnActionCallback,
      },
    );
  }

  showMultipleActions(destroyOnActionCallback = false) {
    this.currentToast = this.toastrService.show(
      'Message',
      `Toast: ${++this.index}`,
      [
        { text: 'Close', color: 'basic', callback: () => this.currentToast?.close() },
        { text: 'Red Close', color: 'danger', callback: () => this.currentToast?.close() },
      ],
      {
        destroyOnActionCallback,
        duration: 0,
      },
    );
  }
}
