/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { InjectionToken } from '@angular/core';

import { NbToastStatus } from './model';
import { NbGlobalLogicalPosition, NbGlobalPosition } from '../cdk';


export const NB_TOASTR_CONFIG = new InjectionToken<NbToastrConfig>('Default toastr options');

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
  status: NbToastStatus = NbToastStatus.PRIMARY;
  /**
   * Duration is timeout between toast appears and disappears.
   * */
  duration: number = 3000;
  /**
   * Destroy by click means you can hide the toast by clicking it.
   * */
  destroyByClick: boolean = true;
  /**
   * If preventDuplicates is true then the next toast with the same title and message will not be rendered.
   * */
  preventDuplicates: boolean = false;
  /**
   * Determines render icon or not.
   * */
  hasIcon: boolean = true;
  /**
   * Icon name that can be provided to render custom icon.
   * */
  icon: string = 'email';
  /**
   * Icon pack to look for the icon in.
   * */
  iconPack: string;
  /**
   * Toast status icon-class mapping.
   * */
  protected icons = {
    [NbToastStatus.DANGER]: 'flash-outline',
    [NbToastStatus.SUCCESS]: 'checkmark-outline',
    [NbToastStatus.INFO]: 'question-mark-outline',
    [NbToastStatus.WARNING]: 'alert-triangle-outline',
    [NbToastStatus.PRIMARY]: 'email-outline',
  };

  constructor(config: Partial<NbToastrConfig>) {
    this.patchIcon(config);
    Object.assign(this, config);
  }

  protected patchIcon(config: Partial<NbToastrConfig>) {
    if (!('icon' in config)) {
      config.icon = this.icons[config.status || NbToastStatus.PRIMARY];
      config.iconPack = 'nebular-essentials';
    }
  }
}
