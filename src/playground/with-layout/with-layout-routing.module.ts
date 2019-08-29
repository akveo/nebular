/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { PlaygroundLayoutComponent } from './playground-layout.component';

const routes: Route[] = [
  {
    path: '',
    component: PlaygroundLayoutComponent,
    children: [
      {
        path: 'accordion',
        loadChildren: './accordion/accordion.module#AccordionModule',
      },
      {
        path: 'action',
        loadChildren: './action/action.module#ActionModule',
      },
      {
        path: 'alert',
        loadChildren: './alert/alert.module#AlertModule',
      },
      {
        path: 'badge',
        loadChildren: './badge/badge.module#BadgeModule',
      },
      {
        path: 'button',
        loadChildren: './button/button.module#ButtonModule',
      },
      {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule',
      },
      {
        path: 'calendar-kit',
        loadChildren: './calendar-kit/calendar-kit.module#CalendarKitModule',
      },
      {
        path: 'card',
        loadChildren: './card/card.module#CardModule',
      },
      {
        path: 'chat',
        loadChildren: './chat/chat.module#ChatModule',
      },
      {
        path: 'checkbox',
        loadChildren: './checkbox/checkbox.module#CheckboxModule',
      },
      {
        path: 'datepicker',
        loadChildren: './datepicker/datepicker.module#DatepickerModule',
      },
      {
        path: 'dialog',
        loadChildren: './dialog/dialog.module#DialogModule',
      },
      {
        path: 'flip-card',
        loadChildren: './flip-card/flip-card.module#FlipCardModule',
      },
      {
        path: 'infinite-list',
        loadChildren: './infinite-list/infinite-list.module#InfiniteListModule',
      },
      {
        path: 'input',
        loadChildren: './input/input.module#InputModule',
      },
      {
        path: 'list',
        loadChildren: './list/list.module#ListModule',
      },
      {
        path: 'menu',
        loadChildren: './menu/menu.module#MenuModule',
      },
      {
        path: 'overlay',
        loadChildren: './overlay/overlay.module#OverlayModule',
      },
      {
        path: 'popover',
        loadChildren: './popover/popover.module#PopoverModule',
      },
      {
        path: 'progress-bar',
        loadChildren: './progress-bar/progress-bar.module#ProgressBarModule',
      },
      {
        path: 'radio',
        loadChildren: './radio/radio.module#RadioModule',
      },
      {
        path: 'reveal-card',
        loadChildren: './reveal-card/reveal-card.module#RevealCardModule',
      },
      {
        path: 'select',
        loadChildren: './select/select.module#SelectModule',
      },
      {
        path: 'spinner',
        loadChildren: './spinner/spinner.module#SpinnerModule',
      },
      {
        path: 'stepper',
        loadChildren: './stepper/stepper.module#StepperModule',
      },
      {
        path: 'tabset',
        loadChildren: './tabset/tabset.module#TabsetModule',
      },
      {
        path: 'toastr',
        loadChildren: './toastr/toastr.module#ToastrModule',
      },
      {
        path: 'tooltip',
        loadChildren: './tooltip/tooltip.module#TooltipModule',
      },
      {
        path: 'user',
        loadChildren: './user/user.module#UserModule',
      },
      {
        path: 'window',
        loadChildren: './window/window.module#WindowModule',
      },
      {
        path: 'oauth2',
        loadChildren: './oauth2/oauth2.module#OAuth2PlaygroundModule',
      },
      {
        path: 'oauth2-password',
        loadChildren: './oauth2-password/oauth2-password.module#OAuth2PasswordPlaygroundModule',
      },
      {
        path: 'tree-grid',
        loadChildren: './tree-grid/tree-grid.module#TreeGridModule',
      },
      {
        path: 'icon',
        loadChildren: './icon/icon.module#IconModule',
      },
      {
        path: 'toggle',
        loadChildren: './toggle/toggle.module#ToggleModule',
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class WithLayoutRoutingModule {}
