import { Observable } from 'rxjs/Observable';

export class NbPopoverPosition {
  placement: NbPopoverPlacement;
  position: {
    top: number;
    left: number;
  };
}

/**
 * Adjustment strategies.
 * */
export enum NbPopoverAdjustment {
  CLOCKWISE = 'clockwise',
  COUNTERCLOCKWISE = 'counterclockwise',
}

/**
 * Arrangement of one element relative to another.
 * */
export enum NbPopoverPlacement {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

/**
 * NbPopoverMode describes when to trigger show and hide methods of the popover.
 * */
export enum NbPopoverMode {
  CLICK = 'click',
  HOVER = 'hover',
}

export class NbPopoverTrigger {
  toggle: Observable<Event>;
  open: Observable<Event>;
  close: Observable<Event>;
}

