/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { InjectionToken } from '@angular/core';

import { NbGlobalLogicalPosition, NbGlobalPosition } from '../cdk/overlay/position-helper';
import { NbComponentStatus } from '../component-status';
import { emptyStatusWarning } from '../helpers';
import { NbIconConfig } from '../icon/icon.component';

type IconToClassMap = {
  [status in NbComponentStatus]: string;
}

export const NB_TOASTR_CONFIG = new InjectionToken<NbToastrConfig>('Default toastr options');

export type NbDuplicateToastBehaviour = 'previous' | 'all';

/**
 * The `NbToastrConfig` class describes configuration of the `NbToastrService.show` and global toastr configuration.
 * */
export class NbToastrConfig {
  /**
   * Determines where on the screen toast have to be rendered.
   * */
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  /**
   * Status chooses color scheme for the toast.
   * */
  status: NbComponentStatus = 'primary';
  /**
   * Duration is timeout between toast appears and disappears.
   * */
  duration: number = 3000;
  /**
   * Destroy by click means you can hide the toast by clicking it.
   * */
  destroyByClick: boolean = true;
  /**
   * If preventDuplicates is true then the toast with the same title, message and status will not be rendered.
   * Find duplicates behaviour determined by `preventDuplicates`.
   * The default `previous` duplicate behaviour is used.
   * */
  preventDuplicates: boolean = false;
  /**
   * Determines the how to threat duplicates.
   * */
  duplicatesBehaviour: NbDuplicateToastBehaviour = 'previous';
  /*
  * The number of visible toasts. If the limit exceeded the oldest toast will be removed.
  * */
  limit?: number = null;
  /**
   * Class to be applied to the toast.
   */
  toastClass: string = '';
  /**
   * Determines render icon or not.
   * */
  hasIcon: boolean = true;
  /**
   * Icon name or icon config object that can be provided to render custom icon.
   * */
  icon: string | NbIconConfig = 'email';
  /**
   * Icon pack to look for the icon in.
   * @deprecated Set pack via icon config object passed to icon property
   * @breaking-change 5.0.0
   * */
  iconPack: string;
  /**
   * Toast status icon-class mapping.
   * */
  protected icons: IconToClassMap = {
    danger: 'flash-outline',
    success: 'checkmark-outline',
    info: 'question-mark-outline',
    warning: 'alert-triangle-outline',
    primary: 'email-outline',
    control: 'email-outline',
    basic: 'email-outline',
  };

  constructor(config: Partial<NbToastrConfig>) {
    if ((config.status as string) === '') {
      emptyStatusWarning('NbToastr');
      config.status = 'primary';
    }

    this.patchIcon(config);
    Object.assign(this, config);
  }

  protected patchIcon(config: Partial<NbToastrConfig>) {
    if (!('icon' in config)) {
      config.icon = {
        icon: this.icons[config.status || 'primary'],
        pack: 'nebular-essentials',
      };
    }
  }
}
