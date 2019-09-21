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
 * option-padding:
 * option-background-color:
 * option-text-line-height:
 * option-text-color:
 * option-text-font-family:
 * option-text-font-weight:
 * option-list-max-height:
 * option-list-shadow:
 * option-list-border-style:
 * option-list-border-width:
 * option-list-border-radius:
 * option-list-rectangle-border-radius:
 * option-list-semi-round-border-radius:
 * option-list-round-border-radius:
 * option-selected-background-color:
 * option-selected-text-color:
 * option-focus-background-color:
 * option-focus-text-color:
 * option-hover-background-color:
 * option-hover-text-color:
 * option-disabled-background-color:
 * option-disabled-text-color:
 * option-active-background-color:
 * option-active-text-color:
 * option-list-tiny-max-width:
 * option-list-small-max-width:
 * option-list-medium-max-width:
 * option-list-large-max-width:
 * option-list-giant-max-width:
 * option-tiny-padding:
 * option-small-padding:
 * option-medium-padding:
 * option-large-padding:
 * option-giant-padding:
 * option-tiny-text-font-size:
 * option-small-text-font-size:
 * option-medium-text-font-size:
 * option-large-text-font-size:
 * option-giant-text-font-size:
 * option-tiny-text-line-height:
 * option-small-text-line-height:
 * option-medium-text-line-height:
 * option-large-text-line-height:
 * option-giant-text-line-height:
 * option-group-tiny-start-padding:
 * option-group-small-start-padding:
 * option-group-medium-start-padding:
 * option-group-large-start-padding:
 * option-group-giant-start-padding:
 * option-group-tiny-text-font-size:
 * option-group-small-text-font-size:
 * option-group-medium-text-font-size:
 * option-group-large-text-font-size:
 * option-group-giant-text-font-size:
 * option-group-tiny-line-height:
 * option-group-small-line-height:
 * option-group-medium-line-height:
 * option-group-large-line-height:
 * option-group-giant-line-height:
 *
 * */
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
