import { NbAuthSimpleToken } from './token.service';

export class NbAuthResult {

  protected token: any;
  // TODO add field rawToken: string;
  protected errors: string[] = [];
  protected messages: string[] = [];

  // TODO pass arguments in options object
  constructor(protected success: boolean,
              protected response?: any,
              protected redirect?: any,
              errors?: any,
              messages?: any,
              token?: NbAuthSimpleToken) {

    this.errors = this.errors.concat([errors]);
    if (errors instanceof Array) {
      this.errors = errors;
    }

    this.messages = this.messages.concat([messages]);
    if (messages instanceof Array) {
      this.messages = messages;
    }

    this.token = token;
  }

  getResponse(): any {
    return this.response;
  }

  // TODO is it really return value?
  getTokenValue(): any {
    return this.token;
  }

  // TODO could we get rid of this method
  replaceToken(token: NbAuthSimpleToken): any {
    this.token = token
  }

  getRedirect(): any {
    return this.redirect;
  }

  getErrors(): string[] {
    return this.errors.filter(val => !!val);
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
