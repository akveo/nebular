import { Component, HostBinding, Input } from '@angular/core';
import { NbCardComponent } from '../card/card.component';

@Component({
  selector: 'nb-spinner',
  template: `
    <span class="loading  loading-{{spinnerSize}}">
      <span class="set-height">d</span>
      <span class="spin-circle"></span>
      <span class="loading-text">{{text}}</span>
    </span>
  `,
})

export class NbSpinnerComponent {

  static readonly SIZE_SMALL = 'small';
  static readonly SIZE_MEDIUM = 'medium';
  static readonly SIZE_LARGE = 'large';


  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';


  @Input() visible: boolean;
  spinnerSize: string;

  @Input('size') set size(val: string) {
    if (val === NbSpinnerComponent.SIZE_SMALL || NbSpinnerComponent.SIZE_MEDIUM ||
      NbSpinnerComponent.SIZE_LARGE) {
      this.spinnerSize = val
    } else {
      this.spinnerSize = NbSpinnerComponent.SIZE_MEDIUM
    }
  };

  @Input() disableBackground: boolean;
  @Input() inline: boolean;
  @Input() text: string = '';
  @Input() status: string = NbCardComponent.STATUS_PRIMARY;


  @HostBinding('class.hidden')
  get visibility() {
    return !this.visible;
  }

  @HostBinding('class.inline-spinner')
  get display() {
    return this.inline;
  }

  @HostBinding('class.background-disabled')
  get background() {
    return this.disableBackground;
  }

  @HostBinding('class.primary-spinner')
  get primary() {
    return this.status === NbCardComponent.STATUS_PRIMARY;
  }

  @HostBinding('class.info-spinner')
  get info() {
    return this.status === NbCardComponent.STATUS_INFO;
  }

  @HostBinding('class.success-spinner')
  get success() {
    return this.status === NbCardComponent.STATUS_SUCCESS;
  }

  @HostBinding('class.warning-spinner')
  get warning() {
    return this.status === NbCardComponent.STATUS_WARNING;
  }

  @HostBinding('class.danger-spinner')
  get danger() {
    return this.status === NbCardComponent.STATUS_DANGER;
  }


}
