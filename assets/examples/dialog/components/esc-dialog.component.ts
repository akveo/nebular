import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  template: `
    <nb-card class="dialog-card">
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
        <button nbButton status="primary" (click)="dismiss()">Dismiss Dialog</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class EscDialogComponent {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<EscDialogComponent>) {
  }

  dismiss() {
    this.ref.close();
  }
}
