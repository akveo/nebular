import { animate, style, transition, trigger } from '@angular/animations';


const animationDuration = 300;

export const enterLeaveAnimations = [

  trigger('hostEnterLeave', [
    transition(':enter', [
      style({
        opacity: 0,
      }),
      animate(animationDuration, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({
        opacity: 1,
        position: 'absolute',
        top: 52,
        left: 16,
        bottom: 52,
        right: 20,
      }),
      animate(animationDuration, style({ opacity: 0 })),
    ]),
  ]),

  trigger('blockEnterLeave', [
    transition(':enter', [
      style({
        opacity: 0,
      }),
      animate(animationDuration, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({
        opacity: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }),
      animate(animationDuration, style({ opacity: 0 })),
    ]),
  ]),
];
