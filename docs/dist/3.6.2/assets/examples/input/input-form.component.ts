import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <input type="text" nbInput fullWidth fieldSize="small" placeholder="Input" [(ngModel)]="inputItemNgModel">
        <textarea nbInput fullWidth placeholder="Textarea" [(ngModel)]="textareaItemNgModel"></textarea>
        <input type="text" nbInput fullWidth fieldSize="small" placeholder="Input" [formControl]="inputItemFormControl">
        <textarea nbInput fullWidth placeholder="Textarea" [formControl]="textareaItemFormControl">
        </textarea>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./input-component.scss'],
})

export class InputFormComponent {
  inputItemNgModel;
  textareaItemNgModel;
  inputItemFormControl = new FormControl();
  textareaItemFormControl = new FormControl();
}
