import {
  Component,
  Input,
} from '@angular/core';


@Component({
  selector: 'nb-step-header',
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss'],
})
export class NbStepHeaderComponent {

  @Input() state: string;

  @Input() label: string;

  @Input() index: number;

  @Input() selected: boolean;

  @Input() active: boolean;

  @Input() optional: boolean;

  _isTemplateInside() {
    return false;
  }

}
