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
export class NbShowcaseDialogComponent {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<NbShowcaseDialogComponent>) {
  }

  dismiss() {
    this.ref.close();
  }
}

@Component({
  selector: 'nb-dialog-showcase',
  template: '<button nbButton (click)="open()">Open Dialog</button>',
  styles: [` /deep/ nb-layout-column {
    height: 80vw;
  } `],
})
export class NbDialogShowcaseComponent {
  constructor(private dialogService: NbDialogService) {
  }

  open() {
    this.dialogService.open(NbShowcaseDialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
}
