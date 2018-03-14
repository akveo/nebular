import { ControlValueAccessor } from '@angular/forms';
import { Constructor } from './Constructor';

export function mixinControlValueAccessor<T extends Constructor<{}>>(base: T): Constructor<ControlValueAccessor> & T {
  return class extends base {

    /**
     * Checkbox value
     * @type {boolean}
     * @private
     */
    _value: boolean = false;

    onChange: any = () => {
    };

    onTouched: any = () => {
    };

    get value() {
      return this._value;
    }

    set value(val) {
      this._value = val;
      this.onChange(val);
      this.onTouched();
    }

    registerOnChange(fn: any) {
      this.onChange = fn;
    }

    registerOnTouched(fn: any) {
      this.onTouched = fn;
    }

    writeValue(val: any) {
      this.value = val;
    }
  }
}
