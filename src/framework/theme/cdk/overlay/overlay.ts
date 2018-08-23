import { TemplateRef } from '@angular/core';

import { NbComponentType } from '../mapping';


export interface NbContainer {
  content: any;
  context: Object;
}

export type NbOverlayContent = NbComponentType<any> | TemplateRef<any> | string;
