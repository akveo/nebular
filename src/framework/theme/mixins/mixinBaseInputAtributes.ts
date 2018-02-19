import { Constructor } from './Constructor';
import { convertToBoolProperty } from '../components/helpers';

export interface BaseInputAttributes {
  id: string;
  disabled: boolean;
  required: boolean;
  checked: boolean;
}

export function mixinBaseInputAttributes<T extends Constructor<{}>>(base: T): Constructor<BaseInputAttributes> & T {
  return class extends base {

    _id: string = '';
    _disabled: boolean = false;
    _required: boolean = false;
    _checked: boolean = false;

    set id(val: string) {
      this._id = val;
    }

    get id(): string {
      return this._id;
    }

    set disabled(val: boolean) {
      this._disabled = convertToBoolProperty(val);
    }

    get disabled(): boolean {
      return this._disabled;
    }

    set required(val: boolean) {
      this._required = convertToBoolProperty(val);
    }

    get required(): boolean {
      return this._required;
    }

    set checked(val: boolean) {
      this._checked = convertToBoolProperty(val);
    }

    get checked(): boolean {
      return this._checked;
    }
  }
}
