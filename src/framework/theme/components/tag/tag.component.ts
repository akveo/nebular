import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {NbComponentStatus} from '../component-status';
import {convertToBoolProperty} from '../helpers';
import {NbComponentShape} from '../component-shape';

export type NbTagAppearance = 'filled' | 'outline';

@Component({
  selector: 'nb-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class NbTagComponent {

  @Input() text: string;

  /**
   * Tag status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   */
  @Input() status: NbComponentStatus = 'primary';

  /**
   * Tag appearance: `filled`, `outline`,
   */
  @Input() appearance: NbTagAppearance = 'filled';

  /**
   * Button shapes: `rectangle`, `round`, `semi-round`
   */
  @Input() shape: NbComponentShape = 'round';

  @HostBinding('class.appearance-filled')
  get filled(): boolean {
    return this.appearance === 'filled';
  }
  set filled(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'filled';
    }
  }

  @HostBinding('class.appearance-outline')
  get outline(): boolean {
    return this.appearance === 'outline';
  }
  set outline(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'outline';
    }
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === 'primary';
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === 'info';
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === 'success';
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger';
  }

  @HostBinding('class.status-basic')
  get basic() {
    return this.status === 'basic';
  }

  @HostBinding('class.status-control')
  get control() {
    return this.status === 'control';
  }

  @HostBinding('class.shape-rectangle')
  get rectangle() {
    return this.shape === 'rectangle';
  }

  @HostBinding('class.shape-round')
  get round() {
    return this.shape === 'round';
  }

  @HostBinding('class.shape-semi-round')
  get semiRound() {
    return this.shape === 'semi-round';
  }

  @Output() close = new EventEmitter();
}
