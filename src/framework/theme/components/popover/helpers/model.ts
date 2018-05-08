import { Observable } from 'rxjs';

/**
 * Describes placement of the UI element on the screen.
 * */
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

export enum NbPopoverLogicalPlacement {
  START = 'start',
  END = 'end',
}

/**
 * NbPopoverMode describes when to trigger show and hide methods of the popover.
 * */
export enum NbPopoverMode {
  CLICK = 'click',
  HOVER = 'hover',
  HINT = 'hint',
}

/**
 * Popover uses different triggers for different {@link NbPopoverMode}.
 * see {@link NbTriggerHelper}
 * */
export class NbPopoverTrigger {
  toggle: Observable<Event>;
  open: Observable<Event>;
  close: Observable<Event>;
}

