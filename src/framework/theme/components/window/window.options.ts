import { TemplateRef, InjectionToken, ViewContainerRef } from '@angular/core';
// Do not remove (TS4023).
// tslint:disable-next-line
import { ComponentType } from '@angular/cdk/overlay';
import { NbComponentType } from '../cdk/overlay/mapping';

export enum NbWindowState {
  MINIMIZED = 'minimized',
  MAXIMIZED = 'maximized',
  FULL_SCREEN = 'full-screen',
}

export interface NbWindowStateChange {
  oldState: NbWindowState;
  newState: NbWindowState;
}

/**
 * Window configuration options.
 */
export class NbWindowConfig {
  /**
   * Window title.
   */
  title: string = '';

  /**
   * Initial window state. Full screen by default.
   */
  initialState: NbWindowState = NbWindowState.FULL_SCREEN;

  /**
   * If true than backdrop will be rendered behind window.
   * By default set to true.
   */
  hasBackdrop: boolean = true;

  /**
   * If set to true mouse clicks on backdrop will close a window.
   * Default is true.
   */
  closeOnBackdropClick: boolean = true;

  /**
   * If true then escape press will close a window.
   * Default is true.
   */
  closeOnEsc: boolean = true;

  /**
   * Class to be applied to the window.
   */
  windowClass: string = '';

  /**
   * Both, template and component may receive data through `config.context` property.
   * For components, this data will be set as component properties.
   * For templates, you can access it inside template as $implicit.
   */
  context?: Object = {};

  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the window. This does not affect where the window
   * content will be rendered.
   */
  viewContainerRef: ViewContainerRef = null;

  constructor(...configs: Partial<NbWindowConfig>[]) {
    Object.assign(this, ...configs);
  }
}

export const NB_WINDOW_CONTENT = new InjectionToken<TemplateRef<any> | NbComponentType>('Nebular Window Content');
export const NB_WINDOW_CONFIG = new InjectionToken<NbWindowConfig>('Nebular Window Config');
export const NB_WINDOW_CONTEXT = new InjectionToken<Object>('Nebular Window Context');
