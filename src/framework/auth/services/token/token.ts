import { urlBase64Decode } from '../../helpers';

export abstract class NbAuthToken {
  abstract getValue(): string;
  abstract getAccessToken(): string;
  abstract isValid(): boolean;
  abstract getPayload(): string;
  // the strategy name used to acquire this token (needed for refreshing)
  abstract getStrategyName(): string;
  abstract toString(): string;
  // the token exp date (has to be stored in case of expires_in response)
  abstract getExpDate(): Date

  getName(): string {
    return (this.constructor as NbAuthTokenClass).NAME;
  }
}

export interface NbAuthRefreshableToken {
  getRefreshToken(): string;
  // Needed when refresh-token response does not repeat refresh_token value
  setRefreshToken(string): void;
}

export interface NbAuthTokenClass {
  NAME: string;
  new (raw: any, strategyName: string, expDate?: Date): NbAuthToken;
}

// All types of token are not refreshables
export function isNbAuthRefreshableToken(token: any): token is NbAuthRefreshableToken {
  return (<NbAuthRefreshableToken>token).getRefreshToken !== undefined ;
}

export function nbAuthCreateToken(tokenClass: NbAuthTokenClass,
                                  token: any,
                                  strategyName: string,
                                  expDate?: Date) {
  return new tokenClass(token, strategyName, expDate);
}

/**
 * Wrapper for simple (text) token
 */
export class NbAuthSimpleToken extends NbAuthToken {

  static NAME = 'nb:auth:simple:token';

  constructor(protected readonly token: any,
              protected readonly strategyName: string,
              protected expDate?: Date) {
    super();
  }

  /**
   * Returns the token value
   * @returns string
   */
  getValue(): string {
    return this.token;
  }

  getStrategyName(): string {
    return this.strategyName;
  }

  getAccessToken(): string {
    return this.token;
  }

  getPayload(): string {
    return null;
  }

  getExpDate(): Date {
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
  getExpDate(): Date {
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
    return super.isValid() && (!this.getExpDate() || new Date() < this.getExpDate());
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

  constructor(protected data: { [key: string]: string|number }|string = {},
              protected strategyName: string,
              protected expDate?: Date) {
    // we may get it as string when retrieving from a storage
    super(prepareOAuth2Token(data), strategyName, expDate);
    this.strategyName = strategyName;
    /** Since only expires_in is given, we have to calculate and store the expiration date
    but only if not already defined (i.e we must not update exp if restoring from storage) **/
    if (!this.expDate) {
      if (this.token && Object.keys(this.token).length > 0) {
        const decoded = this.getPayload();
        if (decoded.hasOwnProperty('exp')) {
          this.expDate = new Date(decoded.exp);
        }
      }
      if (!this.expDate) {
        if (this.token.expires_in) {
        this.expDate = new Date();
        this.expDate.setTime(this.expDate.getTime() + Number(this.token.expires_in) * 1000);
        }
      }
    }
  }

  /**
   * Returns the token value
   * @returns string
   */
  getAccessToken(): string {
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
   * Sets the refreshToken
   * @param {string} token
   */
  setRefreshToken(token: string): void {
    this.token.refresh_token = token;
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
    return super.isValid() && (!this.getExpDate() || new Date() < new Date(this.getExpDate().toString()));
  }

  /**
   * Returns expiration date
   * @returns Date
   */
  getExpDate(): Date {
    return (this.expDate ? this.expDate : null);
  }

  /**
   * Convert to string
   * @returns {string}
   */
  toString(): string {
    return JSON.stringify(this.token);
  }
}
