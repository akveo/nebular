/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbComponentStatus } from '../component-status';
import { NbComponentSize } from '../component-size';
import { Observable } from 'rxjs';

/*
 * Class used as injection token to provide form element.
 **/
export abstract class NbFormFieldControl {
  status$: Observable<NbComponentStatus>;
  size$: Observable<NbComponentSize>;
  focused$: Observable<boolean>;
  disabled$: Observable<boolean>;
}
