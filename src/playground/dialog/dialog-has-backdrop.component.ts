import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';


@Component({
  selector: 'nb-dialog',
  template: `
    <nb-card [style.width.px]="600" [style.height.px]="500">
      <nb-card-header>{{ title }}</nb-card-header>
      <nb-card-body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis tincidunt tincidunt.
        Vestibulum vulputate maximus massa vel tristique. Suspendisse potenti. Duis aliquet purus sed dictum dictum.
        Donec fringilla, purus at fermentum imperdiet, velit enim malesuada turpis, quis luctus arcu arcu nec orci.
        Duis eu mattis felis. Quisque sollicitudin elementum nunc vel tincidunt. Vestibulum egestas mi nec
        iaculis varius. Morbi in risus sed sapien ultricies feugiat. Quisque pulvinar mattis purus,
        in aliquet massa aliquet et.
      </nb-card-body>
      <nb-card-footer>
        <button nbButton hero status="primary" (click)="dismiss()">Dismiss Dialog</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class NbHasBackdropDialogComponent {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<NbHasBackdropDialogComponent>) {
  }

  dismiss() {
    this.ref.close();
  }
}

@Component({
  selector: 'nb-dialog-has-backdrop',
  template: `
    <div class="btn-group btn-divided-group btn-outline-divided-group">
      <button nbButton hero (click)="openWithBackdrop()">Open with backdrop</button>
      <button nbButton hero (click)="openWithoutBackdrop()">Open without backdrop</button>
    </div>
  `,
  styles: [`
    /deep/ nb-layout-column {
      height: 80vw;
    }

    button {
      margin: 1rem;
    }
  `],
})
export class NbDialogHasBackdropComponent {
  constructor(private dialogService: NbDialogService) {
  }

  openWithBackdrop() {
    this.open(true);
  }

  openWithoutBackdrop() {
    this.open(false);
  }

  protected open(hasBackdrop: boolean) {
    this.dialogService.open(NbHasBackdropDialogComponent, { hasBackdrop });
  }
}
