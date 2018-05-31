import { urlBase64Decode } from '../../helpers';

export abstract class NbAuthToken {
  abstract getValue(): string;
  abstract isValid(): boolean;
  abstract getPayload(): string;
  abstract toString(): string;

  getName(): string {
    return (this.constructor as NbAuthTokenClass).NAME;
  }
}

export interface NbAuthTokenClass {
  NAME: string;
  new (raw: string): NbAuthToken;
}

export function nbAuthCreateToken(tokenClass: NbAuthTokenClass, token: string) {
  return new tokenClass(token);
}

/**
 * Wrapper for simple (text) token
 */
export class NbAuthSimpleToken extends NbAuthToken {

  static NAME = 'nb:auth:simple:token';

  constructor(readonly token: string) {
    super();
  }

  /**
   * Returns the token value
   * @returns string
   */
  getValue(): string {
    return this.token;
  }

  getPayload(): string {
    return null;
  }

  /**
   * Is non empty and valid
   * @returns {boolean}
   */
  isValid(): boolean {
    return !!this.token;
  }

  /**
   * Validate value and convert to string, if value is not valid return empty string
   * @returns {string}
   */
  toString(): string {
    return !!this.token ? this.token : '';
  }
}

/**
 * Wrapper for JWT token with additional methods.
 */
export class NbAuthJWTToken extends NbAuthSimpleToken {

  static NAME = 'nb:auth:jwt:token';

  /**
   * Returns payload object
   * @returns any
   */
  getPayload(): any {

    if (!this.token) {
      throw new Error('Cannot extract payload from an empty token.');
    }

    const parts = this.token.split('.');

    if (parts.length !== 3) {
      throw new Error(`The token ${this.token} is not valid JWT token and must consist of three parts.`);
    }

    let decoded;
    try {
      decoded = urlBase64Decode(parts[1]);
    } catch (e) {
      throw new Error(`The token ${this.token} is not valid JWT token and cannot be parsed.`);
    }

    if (!decoded) {
      throw new Error(`The token ${this.token} is not valid JWT token and cannot be decoded.`);
    }

    return JSON.parse(decoded);
  }

  /**
   * Returns expiration date
   * @returns Date
   */
  getTokenExpDate(): Date {
    const decoded = this.getPayload();
    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  /**
   * Is data expired
   * @returns {boolean}
   */
  isValid(): boolean {
    return super.isValid() && (!this.getTokenExpDate() || new Date() < this.getTokenExpDate());
  }
}
