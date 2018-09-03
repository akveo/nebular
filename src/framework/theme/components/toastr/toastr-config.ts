import { InjectionToken } from '@angular/core';

import { NbToastStatus } from './model';
import { NbGlobalLogicalPosition, NbGlobalPosition } from '../cdk';


export const NB_TOASTR_CONFIG = new InjectionToken<NbToastrConfig>('Default toastr options');

export class NbToastrConfig {
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  status: NbToastStatus = NbToastStatus.PRIMARY;
  duration: number = 3000;
  destroyByClick: boolean = true;
  preventDuplicates: boolean = false;
  hasIcon: boolean = true;

  constructor(config: Partial<NbToastrConfig>) {
    Object.assign(this, config);
  }
}
