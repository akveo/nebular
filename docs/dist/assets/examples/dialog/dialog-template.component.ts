import { Component, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'nb-dialog-template',
  template: `
    <ng-template #dialog let-data let-ref="dialogRef">
      <nb-card>
        <nb-card-header>Template Dialog</nb-card-header>
        <nb-card-body>{{ data }}</nb-card-body>
        <nb-card-footer>
          <button nbButton (click)="ref.close()">Close Dialog</button>
        </nb-card-footer>
      </nb-card>
    </ng-template>
    <button nbButton (click)="open(dialog)">Open Dialog</button>
  `,
  styleUrls: ['./dialog-common.scss'],
})
export class DialogTemplateComponent {
  constructor(private dialogService: NbDialogService) {
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }
}
