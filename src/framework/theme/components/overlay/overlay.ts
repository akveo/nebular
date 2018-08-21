import { TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';


export interface NbDisplayable {
  show();

  hide();
}

export interface NbToggleable extends NbDisplayable {
  toggle();
}

export type NbOverlayContent = ComponentType<any> | TemplateRef<any> | string;
