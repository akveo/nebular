import { NbAuthToken } from './token/token';

export class NbAuthResult {
  protected token: NbAuthToken;
  protected errors: string[] = [];
  protected messages: string[] = [];

  // TODO: better pass object
  constructor(
    protected success: boolean,
    protected response?: any,
    protected redirect?: any,
    errors?: any,
    messages?: any,
    token: NbAuthToken = null,
  ) {
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

  getToken(): NbAuthToken {
    return this.token;
  }

  getRedirect(): string {
    return this.redirect;
  }

  getErrors(): string[] {
    return this.errors.filter((val) => !!val);
  }

  getMessages(): string[] {
    return this.messages.filter((val) => !!val);
  }

  isSuccess(): boolean {
    return this.success;
  }

  isFailure(): boolean {
    return !this.success;
  }
}
