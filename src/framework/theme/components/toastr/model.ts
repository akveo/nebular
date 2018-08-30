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
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  PRIMARY = 'primary',
  DANGER = 'danger',
  DEFAULT = 'default',
}

export class NbToast {
  title: string;
  message: string;
  config: NbToastConfig;
}

export class NbToastConfig {
  position: NbToastPosition = NbToastPosition.TOP_END;
  status: NbToastStatus = NbToastStatus.DEFAULT;
  duration: number = 3000;
  destroyByClick: boolean = true;

  constructor(config: Partial<NbToastConfig>) {
    Object.assign(this, config);
  }
}
