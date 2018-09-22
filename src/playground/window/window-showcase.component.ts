import { Component } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';

@Component({
  template: `
    <form class="form">
      <label for="subject">Subject:</label>
      <input nbInput id="subject" type="text">

      <label class="text-label" for="text">Text:</label>
      <textarea nbInput id="text"></textarea>
    </form>
  `,
})
export class NbFormComponent {
  constructor(public windowRef: NbWindowRef) {}

  close() {
    this.windowRef.close();
  }
}

@Component({
  template: `<button (click)="openWindow()" nbButton>Open window</button>`,
  styleUrls: [ './window.scss' ],
})
export class NbWindowShowcaseComponent {

  constructor(private windowService: NbWindowService) {}

  openWindow() {
    this.windowService.open(NbFormComponent, { title: `Window` });
  }
}
