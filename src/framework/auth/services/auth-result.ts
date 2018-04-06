import { NbAuthToken } from './token/token';

export interface FieldErrors {
  [key: string]: string[]
}

export class NbAuthResult {

  protected success: boolean;
  protected response: any;
  protected redirect: any = null;
  protected token: NbAuthToken;
  protected rawToken: string;
  protected errors: string[] = [];
  protected messages: string[] = [];
  protected fieldErrors: FieldErrors = {};


  /**
   *
   * @param {boolean} success
   * @param {any} response
   * @param {any} redirect
   * @param {any} errors
   * @param {FieldErrors} fieldErrors
   * @param {any} messages
   * @param {string} rawToken
   */
  constructor(
    {
      success,
      response,
      redirect,
      errors,
      fieldErrors,
      messages,
      rawToken,
    }: {
      success: boolean,
      response?: any,
      redirect?: any,
      errors?: any,
      fieldErrors?: FieldErrors,
      messages?: any,
      rawToken?: string,
    }) {

    this.errors = this.errors.concat([errors]);
    if (errors instanceof Array) {
      this.errors = errors;
    }

    this.messages = this.messages.concat([messages]);
    if (messages instanceof Array) {
      this.messages = messages;
    }

    this.success = success;

    if (response) {
      this.response = response;
    }

    if (redirect) {
      this.redirect = redirect;
    }

    if (fieldErrors) {
      this.fieldErrors = fieldErrors;
    }

    if (rawToken) {
      this.rawToken = rawToken;
    }
  }

  setToken(token: NbAuthToken) {
    this.token = token;
    this.rawToken = token.toString();
  }

  getResponse(): any {
    return this.response;
  }

  getRawToken(): any {
    return this.rawToken;
  }

  getToken(): any {
    return this.token;
  }

  getRedirect(): any {
    return this.redirect;
  }

  getErrors(): string[] {
    return this.errors.filter(val => !!val);
  }

  getFieldErrors(): FieldErrors {
    return this.fieldErrors;
  }

  getMessages(): string[] {
    return this.messages.filter(val => !!val);
  }

  isSuccess(): boolean {
    return this.success;
  }

  isFailure(): boolean {
    return !this.success;
  }
}
