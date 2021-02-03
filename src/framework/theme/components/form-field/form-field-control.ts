/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { NbComponentOrCustomStatus } from '../component-status';
import { NbComponentSize } from '../component-size';
import { Observable } from 'rxjs';

/*
 * Class used as injection token to provide form element.
 **/
@Injectable()
export abstract class NbFormFieldControl {
  status$: Observable<NbComponentOrCustomStatus>;
  size$: Observable<NbComponentSize>;
  focused$: Observable<boolean>;
  disabled$: Observable<boolean>;
  fullWidth$: Observable<boolean>;
}

/*
 * Optional config to be provided on NbFormFieldControl to alter default settings.
 **/
@Injectable()
export class NbFormFieldControlConfig {
  supportsPrefix = true;
  supportsSuffix = true;
}

export interface NbFormControlState {
  status: NbComponentOrCustomStatus;
  size: NbComponentSize;
  fullWidth: boolean;
  focused: boolean;
  disabled: boolean;
}
