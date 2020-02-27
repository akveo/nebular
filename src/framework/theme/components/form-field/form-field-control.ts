/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { NbComponentStatus } from '../component-status';
import { NbComponentSize } from '../component-size';
import { Observable } from 'rxjs';

/*
 * Class used as injection token to provide form element.
 **/
@Injectable()
export abstract class NbFormFieldControl {
  status$: Observable<NbComponentStatus>;
  size$: Observable<NbComponentSize>;
  focused$: Observable<boolean>;
  disabled$: Observable<boolean>;
}

/*
 * Optional config to be provided on NbFormFieldControl to alter default settings.
 **/
@Injectable()
export class NbFormFieldControlConfig {
  supportsPrefix = true;
  supportsSuffix = true;

  constructor(config: { supportsPrefix?: boolean, supportsSuffix?: boolean } = {}) {
    if (config.supportsPrefix != null) {
      this.supportsPrefix = config.supportsPrefix;
    }
    if (config.supportsSuffix != null) {
      this.supportsSuffix = config.supportsSuffix;
    }
  }
}

export interface NbFormControlState {
  status: NbComponentStatus;
  size: NbComponentSize;
  focused: boolean;
  disabled: boolean;
}
