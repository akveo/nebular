import { Response, ResponseOptions } from '@angular/http';
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

  protected createFailResponse(data?: any): Response {
    return new Response(new ResponseOptions({ body: '{}', status: 401 }));
  }

  protected createSuccessResponse(data?: any): Response {
    return new Response(new ResponseOptions({ body: '{}', status: 200 }));
  }

  protected getJsonSafe(res: Response): any {
    let json;
    try {
      json = res.json();
    } catch (e) {
      json = {};
    }

    return json;
  }
}
