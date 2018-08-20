import { Injectable, TemplateRef, Type } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export type NbPortalContent = string | TemplateRef<any> | Type<any>;

export class NbPortal {
  content: NbPortalContent;
  context?: Object;
}

@Injectable()
export class NbPortalOutlet {

  create(portal: NbPortal): Observable<any> {
    return null;
  }
}
