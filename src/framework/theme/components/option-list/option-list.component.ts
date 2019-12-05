import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

/**
 * The `NbOptionListComponent` is container component for `NbOptionGroupComponent` and`NbOptionComponent` list.
 *
 * @styles
 *
 * option-list-max-height:
 * option-list-shadow:
 * option-list-background-color:
 * option-list-border-style:
 * option-list-border-width:
 * option-list-border-color:
 * option-list-border-radius:
 * option-list-adjacent-border-color:
 * option-list-adjacent-border-style:
 * option-list-adjacent-border-width:
 * */
@Component({
  selector: 'nb-option-list',
  template: `
    <ul class="option-list">
      <ng-content></ng-content>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbOptionListComponent<T> {

  /**
   * If set element will fill container.
   */
  @Input() fullWidth: boolean;

}
