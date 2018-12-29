import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nb-components-overlay',
  styleUrls: [ './components-overlay.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="emitCloseClick()">Close</button>

    <ng-content></ng-content>
  `,
})
export class ComponentsOverlayComponent {
  @Output()
  closeClicked = new EventEmitter<undefined>();

  emitCloseClick() {
    this.closeClicked.next();
  }
}
