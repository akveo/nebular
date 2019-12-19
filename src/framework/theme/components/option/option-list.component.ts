import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';

import { NbComponentSize } from '../component-size';
import { NbPosition } from '../cdk/overlay/overlay-position';

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

  @Input() size: NbComponentSize = 'medium';

  @Input() position: NbPosition;

  @HostBinding('class.position-top')
  get positionTop(): boolean {
    return this.position === NbPosition.TOP;
  }

  @HostBinding('class.position-bottom')
  get positionBottom(): boolean {
    return this.position === NbPosition.BOTTOM;
  }

  @HostBinding('class.size-tiny')
  get sizeTiny(): boolean {
    return this.size === 'tiny';
  }

  @HostBinding('class.size-small')
  get sizeSmall(): boolean {
    return this.size === 'small';
  }

  @HostBinding('class.size-medium')
  get sizeMedium(): boolean {
    return this.size === 'medium';
  }

  @HostBinding('class.size-large')
  get sizeLarge(): boolean {
    return this.size === 'large';
  }

  @HostBinding('class.size-giant')
  get sizeGiant(): boolean {
    return this.size === 'giant';
  }
}
