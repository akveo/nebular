import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { NbAuthResult } from '../services/auth.service';
import { deepExtend, getDeepFromObject } from '../helpers';

export abstract class NbAbstractAuthProvider {

  protected defaultConfig: any = {};
  protected config: any = {};

  setConfig(config: any): void {
    this.config = deepExtend({}, this.defaultConfig, config);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  abstract authenticate(data?: any): Observable<NbAuthResult>;

  abstract register(data?: any): Observable<NbAuthResult>;

  abstract requestPassword(data?: any): Observable<NbAuthResult>;

  abstract resetPassword(data?: any): Observable<NbAuthResult>;

  abstract logout(): Observable<NbAuthResult>;

  protected createFailResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({ body: {}, status: 401 });
  }

  protected createSuccessResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({ body: {}, status: 200 });
  }

  protected getJsonSafe(res: HttpResponse<Object>): any {
    return res.body;
  }
}
