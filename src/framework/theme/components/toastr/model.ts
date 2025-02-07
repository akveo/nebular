/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbToastrConfig } from './toastr-config';
import { NbComponentStatus } from '../component-status';

export class NbToast {
  title: string;
  message: string;
  actions?: { text: string; color: NbComponentStatus; callback: () => any }[] | undefined;
  config: NbToastrConfig;
}
