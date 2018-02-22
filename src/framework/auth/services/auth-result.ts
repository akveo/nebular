import { NbAuthToken } from './token/token';

export class NbAuthResult {

  protected token: NbAuthToken;
  protected rawToken: string;
  protected errors: string[] = [];
  protected messages: string[] = [];

  constructor(protected success: boolean,
              protected response?: any,
              protected redirect?: any,
              errors?: any,
              messages?: any,
              rawToken?: string) {

    this.errors = this.errors.concat([errors]);
    if (errors instanceof Array) {
      this.errors = errors;
    }

    this.messages = this.messages.concat([messages]);
    if (messages instanceof Array) {
      this.messages = messages;
    }

    this.rawToken = rawToken;
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
