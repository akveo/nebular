import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'nb-option-list',
  templateUrl: './option-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbOptionListComponent<T> {

  /**
   * If set element will fill container.
   */
  @Input() fullWidth: boolean;

}
