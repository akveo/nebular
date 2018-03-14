import { HostBinding } from '@angular/core';
import { Constructor } from './Constructor';

export interface CanStatus {
  status: Status;
}

export enum Status {
  EMPTY = '',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}

export function mixinStatus<T extends Constructor<{}>>(base: T): Constructor<CanStatus> & T {
  class MixinStatus extends base {

    _status: Status;

    /**
     * Checkbox status (success, warning, danger)
     * @param {string} val
     */
    set status(val: Status) {
      if (!Object.values(Status).includes(val)) {
        console.warn('Status [', val, '] is not part of status feature, so it could not be applied to HTML element');
      }
      this._status = val;
    }

    @HostBinding('class.success')
    private get success() {
      return this._status === Status.SUCCESS;
    }

    @HostBinding('class.warning')
    private get warning() {
      return this._status === Status.WARNING;
    }

    @HostBinding('class.danger')
    private get danger() {
      return this._status === Status.DANGER;
    }
  }
  return MixinStatus;
};
