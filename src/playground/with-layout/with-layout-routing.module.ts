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
        loadChildren: () => import('./accordion/accordion.module').then(m => m.AccordionModule),
      },
      {
        path: 'action',
        loadChildren: () => import('./action/action.module').then(m => m.ActionModule),
      },
      {
        path: 'alert',
        loadChildren: () => import('./alert/alert.module').then(m => m.AlertModule),
      },
      {
        path: 'badge',
        loadChildren: () => import('./badge/badge.module').then(m => m.BadgeModule),
      },
      {
        path: 'button',
        loadChildren: () => import('./button/button.module').then(m => m.ButtonModule),
      },
      {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule),
      },
      {
        path: 'calendar-kit',
        loadChildren: () => import('./calendar-kit/calendar-kit.module').then(m => m.CalendarKitModule),
      },
      {
        path: 'card',
        loadChildren: () => import('./card/card.module').then(m => m.CardModule),
      },
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
      },
      {
        path: 'checkbox',
        loadChildren: () => import('./checkbox/checkbox.module').then(m => m.CheckboxModule),
      },
      {
        path: 'datepicker',
        loadChildren: () => import('./datepicker/datepicker.module').then(m => m.DatepickerModule),
      },
      {
        path: 'dialog',
        loadChildren: () => import('./dialog/dialog.module').then(m => m.DialogModule),
      },
      {
        path: 'flip-card',
        loadChildren: () => import('./flip-card/flip-card.module').then(m => m.FlipCardModule),
      },
      {
        path: 'infinite-list',
        loadChildren: () => import('./infinite-list/infinite-list.module').then(m => m.InfiniteListModule),
      },
      {
        path: 'input',
        loadChildren: () => import('./input/input.module').then(m => m.InputModule),
      },
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then(m => m.ListModule),
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule),
      },
      {
        path: 'overlay',
        loadChildren: () => import('./overlay/overlay.module').then(m => m.OverlayModule),
      },
      {
        path: 'popover',
        loadChildren: () => import('./popover/popover.module').then(m => m.PopoverModule),
      },
      {
        path: 'progress-bar',
        loadChildren: () => import('./progress-bar/progress-bar.module').then(m => m.ProgressBarModule),
      },
      {
        path: 'radio',
        loadChildren: () => import('./radio/radio.module').then(m => m.RadioModule),
      },
      {
        path: 'reveal-card',
        loadChildren: () => import('./reveal-card/reveal-card.module').then(m => m.RevealCardModule),
      },
      {
        path: 'select',
        loadChildren: () => import('./select/select.module').then(m => m.SelectModule),
      },
      {
        path: 'spinner',
        loadChildren: () => import('./spinner/spinner.module').then(m => m.SpinnerModule),
      },
      {
        path: 'stepper',
        loadChildren: () => import('./stepper/stepper.module').then(m => m.StepperModule),
      },
      {
        path: 'tabset',
        loadChildren: () => import('./tabset/tabset.module').then(m => m.TabsetModule),
      },
      {
        path: 'toastr',
        loadChildren: () => import('./toastr/toastr.module').then(m => m.ToastrModule),
      },
      {
        path: 'tooltip',
        loadChildren: () => import('./tooltip/tooltip.module').then(m => m.TooltipModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      },
      {
        path: 'window',
        loadChildren: () => import('./window/window.module').then(m => m.WindowModule),
      },
      {
        path: 'oauth2',
        loadChildren: () => import('./oauth2/oauth2.module').then(m => m.OAuth2PlaygroundModule),
      },
      {
        path: 'oauth2-password',
        loadChildren: () => import('./oauth2-password/oauth2-password.module')
          .then(m => m.OAuth2PasswordPlaygroundModule),
      },
      {
        path: 'tree-grid',
        loadChildren: () => import('./tree-grid/tree-grid.module').then(m => m.TreeGridModule),
      },
      {
        path: 'icon',
        loadChildren: () => import('./icon/icon.module').then(m => m.IconModule),
      },
      {
        path: 'toggle',
        loadChildren: () => import('./toggle/toggle.module').then(m => m.ToggleModule),
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class WithLayoutRoutingModule {}
