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
export class NbAutoFocusDialogComponent {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<NbAutoFocusDialogComponent>) {
  }

  dismiss() {
    this.ref.close();
  }
}

@Component({
  selector: 'nb-dialog-auto-focus',
  template: `
    <div class="btn-group btn-divided-group btn-outline-divided-group">
      <button nbButton hero (click)="openWithAutoFocus()">Open with auto focus</button>
      <button nbButton hero (click)="openWithoutAutoFocus()">Open without auto focus</button>
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
export class NbDialogAutoFocusComponent {
  constructor(private dialogService: NbDialogService) {
  }

  openWithAutoFocus() {
    this.open(true);
  }

  openWithoutAutoFocus() {
    this.open(false);
  }

  protected open(autoFocus: boolean) {
    this.dialogService.open(NbAutoFocusDialogComponent, { autoFocus });
  }
}
