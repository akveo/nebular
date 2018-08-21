import { TemplateRef } from '@angular/core';

import { NbComponentType } from './overlay-cdk.module';


export interface NbDisplayable {
  show();

  hide();
}

export interface NbToggleable extends NbDisplayable {
  toggle();
}

export type NbOverlayContent = NbComponentType<any> | TemplateRef<any> | string;
