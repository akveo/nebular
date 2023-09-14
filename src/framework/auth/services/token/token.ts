import { urlBase64Decode } from '../../helpers';

export abstract class NbAuthToken {
  protected payload: any = null;

  abstract getValue(): string;
  abstract isValid(): boolean;
  // the strategy name used to acquire this token (needed for refreshing token)
  abstract getOwnerStrategyName(): string;
  abstract getCreatedAt(): Date;
  abstract toString(): string;

  getName(): string {
    return (this.constructor as NbAuthTokenClass).NAME;
  }

  getPayload(): any {
    return this.payload;
  }
}

export class NbAuthTokenNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NbAuthIllegalTokenError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NbAuthEmptyTokenError extends NbAuthIllegalTokenError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NbAuthIllegalJWTTokenError extends NbAuthIllegalTokenError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export interface NbAuthRefreshableToken {
  getRefreshToken(): string;
  setRefreshToken(refreshToken: string);
}

export interface NbAuthTokenClass<T = NbAuthToken> {
  NAME: string;
  new (raw: any, strategyName: string, expDate?: Date): T;
}

export function nbAuthCreateToken<T extends NbAuthToken>(
  tokenClass: NbAuthTokenClass<T>,
  token: any,
  ownerStrategyName: string,
  createdAt?: Date,
) {
  return new tokenClass(token, ownerStrategyName, createdAt);
}

export function decodeJwtPayload(payload: string): any {
  if (payload.length === 0) {
    throw new NbAuthEmptyTokenError('Cannot extract from an empty payload.');
  }

  const parts = payload.split('.');

  if (parts.length !== 3) {
    throw new NbAuthIllegalJWTTokenError(
      `The payload ${payload} is not valid JWT payload and must consist of three parts.`,
    );
  }

  let decoded;
  try {
    decoded = urlBase64Decode(parts[1]);
  } catch (e) {
    throw new NbAuthIllegalJWTTokenError(`The payload ${payload} is not valid JWT payload and cannot be parsed.`);
  }

  if (!decoded) {
    throw new NbAuthIllegalJWTTokenError(`The payload ${payload} is not valid JWT payload and cannot be decoded.`);
  }
  return JSON.parse(decoded);
}

/**
 * Wrapper for simple (text) token
 */
export class NbAuthSimpleToken extends NbAuthToken {
  static NAME = 'nb:auth:simple:token';

  constructor(
    protected readonly token: any,
    protected readonly ownerStrategyName: string,
    protected createdAt?: Date,
  ) {
    super();
    try {
      this.parsePayload();
    } catch (err) {
      if (!(err instanceof NbAuthTokenNotFoundError)) {
        // token is present but has got a problem, including illegal
        throw err;
      }
    }
    this.createdAt = this.prepareCreatedAt(createdAt);
  }

  protected parsePayload(): any {
    this.payload = null;
  }

  protected prepareCreatedAt(date: Date) {
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
    const decoded = this.getPayload();
    return decoded && decoded.iat ? new Date(Number(decoded.iat) * 1000) : super.prepareCreatedAt(date);
  }

  /**
   * Returns payload object
   * @returns any
   */
  protected parsePayload(): void {
    if (!this.token) {
      throw new NbAuthTokenNotFoundError('Token not found. ');
    }
    this.payload = decodeJwtPayload(this.token);
  }

  /**
   * Returns expiration date
   * @returns Date
   */
  getTokenExpDate(): Date {
    const decoded = this.getPayload();
    if (decoded && !decoded.hasOwnProperty('exp')) {
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
 * Wrapper for OAuth2 token whose access_token is a JWT Token
 */
export class NbAuthOAuth2Token extends NbAuthSimpleToken {
  static NAME = 'nb:auth:oauth2:token';

  constructor(data: { [key: string]: string | number } | string = {}, ownerStrategyName: string, createdAt?: Date) {
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
   *  put refreshToken in the token payload
   * @param refreshToken
   */
  setRefreshToken(refreshToken: string) {
    this.token.refresh_token = refreshToken;
  }

  /**
   * Parses token payload
   * @returns any
   */
  protected parsePayload(): void {
    if (!this.token) {
      throw new NbAuthTokenNotFoundError('Token not found.');
    } else {
      if (!Object.keys(this.token).length) {
        throw new NbAuthEmptyTokenError('Cannot extract payload from an empty token.');
      }
    }
    this.payload = this.token;
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

/**
 * Wrapper for OAuth2 token embedding JWT tokens
 */
export class NbAuthOAuth2JWTToken extends NbAuthOAuth2Token {
  static NAME = 'nb:auth:oauth2:jwt:token';

  protected accessTokenPayload: any;

  protected parsePayload(): void {
    super.parsePayload();
    this.parseAccessTokenPayload();
  }

  protected parseAccessTokenPayload(): any {
    const accessToken = this.getValue();
    if (!accessToken) {
      throw new NbAuthTokenNotFoundError('access_token key not found.');
    }
    this.accessTokenPayload = decodeJwtPayload(accessToken);
  }

  /**
   * Returns access token payload
   * @returns any
   */
  getAccessTokenPayload(): any {
    return this.accessTokenPayload;
  }

  /**
   * for Oauth2 JWT token, the iat (issued at) field of the access_token payload
   */
  protected prepareCreatedAt(date: Date) {
    const payload = this.accessTokenPayload;
    return payload && payload.iat ? new Date(Number(payload.iat) * 1000) : super.prepareCreatedAt(date);
  }

  /**
   * Is token valid
   * @returns {boolean}
   */
  isValid(): boolean {
    return this.accessTokenPayload && super.isValid();
  }

  /**
   * Returns expiration date :
   * - exp if set,
   * - super.getExpDate() otherwise
   * @returns Date
   */
  getTokenExpDate(): Date {
    if (this.accessTokenPayload && this.accessTokenPayload.hasOwnProperty('exp')) {
      const date = new Date(0);
      date.setUTCSeconds(this.accessTokenPayload.exp);
      return date;
    } else {
      return super.getTokenExpDate();
    }
  }
}
