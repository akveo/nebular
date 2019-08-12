import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NbOverlayRef, NbOverlayService, NbPositionBuilderService, NbTemplatePortal } from '@nebular/theme';

@Component({
  selector: 'nb-overlay-showcase',
  template: `
    <ng-template #overlay>
      <nb-card>
        <nb-card-header>This is overlay</nb-card-header>
        <nb-card-body>
          <button nbButton status="success" (click)="dismissOverlay()">Dismiss overlay</button>
        </nb-card-body>
      </nb-card>
    </ng-template>
    <button nbButton status="primary" (click)="createOverlay()">Create overlay</button>
  `,
})
export class OverlayShowcaseComponent implements OnInit {
  @ViewChild('overlay', { static: false }) overlayTemplate: TemplateRef<any>;
  protected ref: NbOverlayRef;

  constructor(protected overlay: NbOverlayService,
              protected positionBuilder: NbPositionBuilderService,
              protected vcr: ViewContainerRef) {
  }

  ngOnInit() {
    const positionStrategy = this.positionBuilder.global().centerHorizontally().centerVertically();
    this.ref = this.overlay.create({ positionStrategy, hasBackdrop: true });
  }

  createOverlay() {
    if (this.ref.hasAttached()) {
      return;
    }

    this.ref.attach(new NbTemplatePortal(this.overlayTemplate, this.vcr));
  }

  dismissOverlay() {
    this.ref.detach();
  }
}
