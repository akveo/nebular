import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowService } from '@nebular/theme';

@Component({
  template: `
    <button (click)="openWindowWithBackdrop()" nbButton>Open window with backdrop</button>
    <button (click)="openWindowWithoutBackdrop()" nbButton>Open window without backdrop</button>

    <ng-template #disabledEsc> Disabled close on escape click. </ng-template>
    <ng-template #escClose> Click escape to close. </ng-template>
  `,
  styleUrls: ['./window.scss'],
  standalone: false,
})
export class WindowsBackdropComponent {
  @ViewChild('escClose', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(private windowService: NbWindowService) {}

  openWindowWithBackdrop() {
    this.windowService.open(this.escCloseTemplate, { title: 'Window with backdrop', hasBackdrop: true });
  }

  openWindowWithoutBackdrop() {
    this.windowService.open(this.disabledEscTemplate, {
      title: 'Window without backdrop',
      hasBackdrop: false,
      closeOnEsc: false,
    });
  }
}
