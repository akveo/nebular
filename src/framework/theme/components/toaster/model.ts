import { NbPortal, NbPortalContent } from '@nebular/theme/components/portal/portal-outlet';
import { ComponentRef } from '@angular/core';

export enum NbToastPosition {
  TOP_RIGHT = 'top-right',
  TOP_LEFT = 'top-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_LEFT = 'bottom-left',
  TOP_START = 'top-start',
  TOP_END = 'top-end',
  BOTTOM_START = 'bottom-start',
  BOTTOM_END = 'bottom-end',
}

export enum NbToastStatus {
  WARNING = 'warning',
  DANGER = 'danger',
  INFO = 'info',
  SUCCESS = 'success',
}

export class NbToast {
  content: NbPortalContent;
  context?: Object;
  position?: NbToastPosition;
  duration?: number;
  status?: NbToastStatus;
  margin?: number;
}

export class NbToastPortal extends NbPortal {
  position: string;
  duration: number;
  status: NbToastStatus;
  margin: number;
}

export class NbToastRegistryBag {
  ref: ComponentRef<any>;
  portal: NbToastPortal;
}
