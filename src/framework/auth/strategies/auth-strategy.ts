import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbAuthResult } from '../services/auth-result';
import { NbAuthStrategyOptions } from './auth-strategy-options';
import { deepExtend, getDeepFromObject } from '../helpers';
import { NbAuthToken, nbAuthCreateToken } from '../services/token/token';

export abstract class NbAuthStrategy {

  protected defaultOptions: NbAuthStrategyOptions;
  protected options: NbAuthStrategyOptions;

  // we should keep this any and validation should be done in `register` method instead
  // otherwise it won't be possible to pass an empty object
  setOptions(options: any): void {
    this.options = deepExtend({}, this.defaultOptions, options);
  }

  getOption(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  createToken<T extends NbAuthToken>(value: any): T {
    return nbAuthCreateToken<T>(this.getOption('token.class'), value, this.getName());
  }

  getName(): string {
    return this.getOption('name');
  }

  abstract authenticate(data?: any): Observable<NbAuthResult>;

  abstract register(data?: any): Observable<NbAuthResult>;

  abstract requestPassword(data?: any): Observable<NbAuthResult>;

  abstract resetPassword(data?: any): Observable<NbAuthResult>;

  abstract logout(): Observable<NbAuthResult>;

  abstract refreshToken(data?: any): Observable<NbAuthResult>;

  protected createFailResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({ body: {}, status: 401 });
  }

  protected createSuccessResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({ body: {}, status: 200 });
  }

  protected getActionEndpoint(action: string): string {
    const actionEndpoint: string = this.getOption(`${action}.endpoint`);
    const baseEndpoint: string = this.getOption('baseEndpoint');
    return baseEndpoint + actionEndpoint;
  }
}
