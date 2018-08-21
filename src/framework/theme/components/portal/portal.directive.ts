import { Directive } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[nbPortal]',
})
export class NbPortalDirective extends CdkPortal {}
