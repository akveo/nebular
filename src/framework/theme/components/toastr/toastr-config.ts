import { InjectionToken } from '@angular/core';

import { NbToastPosition, NbToastStatus } from './model';


export const NB_TOASTR_CONFIG = new InjectionToken<NbToastrConfig>('Default toastr options');

export class NbToastrConfig {
  position: NbToastPosition = NbToastPosition.TOP_END;
  status: NbToastStatus = NbToastStatus.PRIMARY;
  duration: number = 3000;
  destroyByClick: boolean = true;
  preventDuplicates: boolean = false;
  hasIcon: boolean = true;

  constructor(config: Partial<NbToastrConfig>) {
    Object.assign(this, config);
  }
}
