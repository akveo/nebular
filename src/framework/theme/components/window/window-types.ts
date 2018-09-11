import { TemplateRef, InjectionToken, ViewContainerRef } from '@angular/core';
import { NbComponentType } from '../cdk/overlay';

export enum NbWindowSize {
  XXSMALL = 'xxsmall',
  XSMALL = 'xsmall',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'xlarge',
  XXLARGE = 'xxlarge',
}

export enum NbWindowState {
  MINIMIZED = 'minimized',
  MAXIMIZED = 'maximized',
  FULL_SCREEN = 'full-screen',
}

export interface NbWindowStateChange {
  oldState: NbWindowState;
  newState: NbWindowState;
}

export class NbWindowConfig {
  title: string = '';
  initialState: NbWindowState = NbWindowState.FULL_SCREEN;
  hasBackdrop: boolean = true;
  closeOnBackdropClick: boolean = true;
  closeOnEsc: boolean = true;
  size: NbWindowSize = NbWindowSize.LARGE;
  context?: Object = {};
  viewContainerRef: ViewContainerRef = null;

  constructor(...configs: Partial<NbWindowConfig>[]) {
    Object.assign(this, ...configs);
  }
}

export const NB_WINDOW_CONTENT = new InjectionToken<TemplateRef<any> | NbComponentType>('NB_WINDOW_CONTENT');
export const NB_DEFAULT_WINDOWS_CONFIG = new InjectionToken<NbWindowConfig>('NB_DEFAULT_WINDOWS_CONFIG');
