import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './radio-form.component.html',
  styleUrls: ['./radio-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioFormComponent {

  ngModelValue = '1';
  formControl = new FormControl('1');
}
