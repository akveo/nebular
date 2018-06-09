import {
  Component,
  Input,
} from '@angular/core';
import { NbStepLabelDirective } from '../step.component';


@Component({
  selector: 'nb-step-header',
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss'],
})
export class NbStepHeaderComponent {

  @Input() state: string;

  @Input() label: NbStepLabelDirective | string;

  @Input() index: number;

  @Input() selected: boolean;

  @Input() active: boolean;

  @Input() optional: boolean;

  _isTemplateInside() {
    return this.label instanceof NbStepLabelDirective;
  }

}
