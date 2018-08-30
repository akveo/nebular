import { Component, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NbDialogComponent } from './dialog.component';


@Component({
  selector: 'nb-dialog-showcase',
  template: `
    <ng-template #dialog let-data let-ref="dialogRef">
      <nb-card>
        <nb-card-body>
          This is some data: {{ data }}
          <button nbButton (click)="ref.close()">Hide me</button>
        </nb-card-body>
      </nb-card>
    </ng-template>
    <button class="btn btn-primary" (click)="open()">Open Dialog Component</button>
    <button class="btn btn-primary" (click)="openTemplate(dialog)">Open Dialog Template</button>
  `,
  styles: [` /deep/ nb-layout-column {
    height: 80vw;
  } `],
})
export class NbDialogShowcaseComponent {
  constructor(private dialogService: NbDialogService) {
  }

  open() {
    this.dialogService.open(NbDialogComponent);
  }

  openTemplate(template: TemplateRef<any>) {
    this.dialogService.open(template, { context: 'any data' });
  }
}
