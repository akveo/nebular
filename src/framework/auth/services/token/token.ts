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

export interface NbAuthRefreshableToken {
  getRefreshToken(): string;
}

export interface NbAuthTokenClass {
  NAME: string;
  new (raw: any): NbAuthToken;
}

export function nbAuthCreateToken(tokenClass: NbAuthTokenClass, token: any) {
  return new tokenClass(token);
}

/**
 * Wrapper for simple (text) token
 */
export class NbAuthSimpleToken extends NbAuthToken {

  static NAME = 'nb:auth:simple:token';

  constructor(protected readonly token: any) {
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
    return !!this.getValue();
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

const prepareOAuth2Token = (data) => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {}
  }
  return data;
};

/**
 * Wrapper for OAuth2 token
 */
export class NbAuthOAuth2Token extends NbAuthSimpleToken {

  static NAME = 'nb:auth:oauth2:token';

  constructor(protected data: { [key: string]: string|number }|string = {}) {
    // we may get it as string when retrieving from a storage
    super(prepareOAuth2Token(data));
  }

  /**
   * Returns the token value
   * @returns string
   */
  getValue(): string {
    return this.token.access_token;
  }

  /**
   * Returns the refresh token
   * @returns string
   */
  getRefreshToken(): string {
    return this.token.refresh_token;
  }

  /**
   * Returns token payload
   * @returns any
   */
  getPayload(): any {
    if (!this.token || !Object.keys(this.token).length) {
      throw new Error('Cannot extract payload from an empty token.');
    }

    return this.token;
  }

  /**
   * Returns the token type
   * @returns string
   */
  getType(): string {
    return this.token.token_type;
  }

  /**
   * Is data expired
   * @returns {boolean}
   */
  isValid(): boolean {
    return super.isValid() && (!this.getTokenExpDate() || new Date() < this.getTokenExpDate());
  }

  /**
   * Returns expiration date
   * @returns Date
   */
  getTokenExpDate(): Date {
    if (!this.token.hasOwnProperty('expires_in')) {
      return null;
    }

    const date = new Date();
    date.setUTCSeconds(new Date().getUTCSeconds() + Number(this.token.expires_in));

    return date;
  }

  /**
   * Convert to string
   * @returns {string}
   */
  toString(): string {
    return JSON.stringify(this.token);
  }
}
