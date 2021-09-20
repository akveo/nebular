import { Directive, InjectionToken } from '@angular/core';
import { NbPortal } from '../cdk/portal';

export const NB_TAB_LABEL = new InjectionToken<NbTabLabelDirective>('NbTabLabel');

/** Used to flag tab labels for use with the portal directive */
@Directive({
  selector: '[nbTabLabel]',
  providers: [{ provide: NB_TAB_LABEL, useExisting: NbTabLabelDirective }],
})
export class NbTabLabelDirective extends NbPortal {
}
