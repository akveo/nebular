import {FieldErrors} from '../services/auth-result';
import {NB_AUTH_OPTIONS} from '../auth.options';
import {getDeepFromObject} from '../helpers';
import {Inject} from '@angular/core';

export abstract class AbstractAuthComponent {
  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  errors: string[] = [];
  fieldErrors: FieldErrors = {};
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;


  constructor(@Inject(NB_AUTH_OPTIONS) protected config = {}) {}

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  /**
   * If user change the field with the backend error, it should dissapear,
   * otherwise it looks confusing.
   * @param name
   */
  clearFieldErrors(name) {
    if (name in this.fieldErrors) {
      delete this.fieldErrors[name];
    }
  }
}
