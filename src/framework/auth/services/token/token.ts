import { urlBase64Decode } from '../../helpers';

export abstract class NbAuthToken {
  abstract getValue(): string;
  abstract isValid(): boolean;
  abstract getPayload(): string;
  // the strategy name used to acquire this token (needed for refreshing token)
  abstract getOwnerStrategyName(): string;
  abstract getCreatedAt(): Date;
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
  new (raw: any, ownerStrategyName: string, createdAt: Date): NbAuthToken;
}

export function nbAuthCreateToken(tokenClass: NbAuthTokenClass,
                                  token: any,
                                  ownerStrategyName: string,
                                  createdAt?: Date) {
  return new tokenClass(token, ownerStrategyName, createdAt);
}

/**
 * Wrapper for simple (text) token
 */
export class NbAuthSimpleToken extends NbAuthToken {

  static NAME = 'nb:auth:simple:token';

  constructor(protected readonly token: any,
              protected readonly ownerStrategyName: string,
              protected createdAt?: Date) {
    super();
    this.createdAt = this.prepareCreatedAt(createdAt);
  }

  protected prepareCreatedAt(date: Date) {
    // For simple tokens, if not set the creation date is 'now'
    return date ? date : new Date();
  }

  /**
   * Returns the token's creation date
   * @returns {Date}
   */
  getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Returns the token value
   * @returns string
   */
  getValue(): string {
    return this.token;
  }

  getOwnerStrategyName(): string {
    return this.ownerStrategyName;
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
   * for JWT token, the iat (issued at) field of the token payload contains the creation Date
   */
  protected prepareCreatedAt(date: Date) {
    date = super.prepareCreatedAt(date);
    let decoded = null;
    try { // needed as getPayload() throws error and we want the token to be created in any case
      decoded = this.getPayload();
    }
    finally {
      return decoded && decoded.iat ? new Date(Number(decoded.iat) * 1000) : date;
    }
  }

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
    date.setUTCSeconds(decoded.exp); // 'cause jwt token are set in seconds
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

  constructor( data: { [key: string]: string|number }|string = {},
               ownerStrategyName: string,
               createdAt?: Date) {

    // we may get it as string when retrieving from a storage
    super(prepareOAuth2Token(data), ownerStrategyName, createdAt);
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
    return new Date(this.createdAt.getTime() + Number(this.token.expires_in) * 1000);
}

  /**
   * Convert to string
   * @returns {string}
   */
  toString(): string {
    return JSON.stringify(this.token);
  }
}
