/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbPlaygroundBaseComponent } from './playground-base.component';
import { NbPlaygroundLayoutComponent } from './playground-layout.component';

import { NbPopoverShowcaseComponent } from './popover/popover-showcase.component';
import { NbPopoverTemplateRefComponent } from './popover/popover-template-ref.component';
import { NbPopoverCustomComponentComponent } from './popover/popover-custom-component.component';
import { NbPopoverPlacementsComponent } from './popover/popover-placements.component';
import { NbPopoverModesComponent } from './popover/popover-modes.component';
import { NbCheckboxShowcaseComponent } from './checkbox/checkbox-showcase.component';
import { NbCheckboxStatusComponent } from './checkbox/checkbox-status.component';
import { NbCheckboxDisabledComponent } from './checkbox/checkbox-disabled.component';
import { NbLayoutShowcaseComponent } from './layout/layout-showcase.component';
import { NbLayoutWFooterComponent } from './layout/layout-w-footer.component';
import { NbLayoutFixedHeaderComponent } from './layout/layout-fixed-header.component';
import { NbLayoutColumnLeftComponent } from './layout/layout-column-left.component';
import { NbSidebarShowcaseComponent } from './sidebar/sidebar-showcase.component';
import { NbSidebarCompactedComponent } from './sidebar/sidebar-compacted.component';
import { NbSidebarRightComponent } from './sidebar/sidebar-right.component';
import { NbSidebarToggleComponent } from './sidebar/sidebar-toggle.component';
import { NbSidebarFixedComponent } from './sidebar/sidebar-fixed.component';
import { NbCardShowcaseComponent } from './card/card-showcase.component';
import { NbCardFullComponent } from './card/card-full.component';
import { NbCardColorsComponent } from './card/card-colors.component';
import { NbCardAccentsComponent } from './card/card-accents.component';
import { NbCardSizesComponent } from './card/card-sizes.component';
import { NbFlipCardShowcaseComponent } from './flip-card/flip-card-showcase.component';
import { NbFlipCardColorsComponent } from './flip-card/flip-card-colors.component';
import { NbFlipCardAccentsComponent } from './flip-card/flip-card-accents.component';
import { NbFlipCardSizesComponent } from './flip-card/flip-card-sizes.component';
import { NbFlipCardFullComponent } from './flip-card/flip-card-full.component';
import { NbRevealCardShowcaseComponent } from './reveal-card/reveal-card-showcase.component';
import { NbRevealCardColorsComponent } from './reveal-card/reveal-card-colors.component';
import { NbRevealCardAccentsComponent } from './reveal-card/reveal-card-accents.component';
import { NbRevealCardSizesComponent } from './reveal-card/reveal-card-sizes.component';
import { NbRevealCardFullComponent } from './reveal-card/reveal-card-full.component';
import { NbMenuShowcaseComponent } from './menu/menu-showcase.component';
import { NbMenuChildrenComponent } from './menu/menu-children.component';
import { NbActionShowcaseComponent } from './action/action-showcase.component';
import { NbActionSizesComponent } from './action/action-sizes.component';
import { NbActionBadgeComponent } from './action/action-badge.component';
import { NbActionWidthComponent } from './action/action-width.component';
import { NbSearchShowcaseComponent } from './search/search-showcase.component';
import { NbSearchEventComponent } from './search/search-event.component';
import { NbTabsetShowcaseComponent } from './tabset/tabset-showcase.component';
import { NbTabsetBadgeComponent } from './tabset/tabset-badge.component';
import { NbTabsetWidthComponent } from './tabset/tabset-width.component';
import { NbTabsetIconComponent } from './tabset/tabset-icon.component';
import { NbUserShowcaseComponent } from './user/user-showcase.component';
import { NbUserSizesComponent } from './user/user-sizes.component';
import { NbBadgeShowcaseComponent } from './badge/badge-showcase.component';
import { NbContextMenuShowcaseComponent } from './context-menu/context-menu-showcase.component';
import { NbContextMenuClickComponent } from './context-menu/context-menu-click.component';
import { NbCardTestComponent } from './card/card-test.component';
import { NbActionTestComponent } from './action/action-test.component';
import { NbCheckboxTestComponent } from './checkbox/checkbox-test.component';
import { NbContextMenuTestComponent } from './context-menu/context-menu-test.component';
import { NbLayoutHeaderTestComponent } from './layout/layout-header-test.component';
import { NbLayoutFooterTestComponent } from './layout/layout-footer-test.component';
import { NbThemeChangeTestComponent } from './layout/theme-change-test.component';
import { NbThemeBreakpointTestComponent } from './layout/theme-breakpoint-test.component';
import { NbLayoutTestComponent } from './layout/layout-test.component';
import {
  NbMenuItem1Component,
  NbMenuItem2Component,
  NbMenuItem31Component,
  NbMenuItem32Component,
  NbMenuItem331Component,
  NbMenuItem332Component,
  NbMenuItem33Component,
  NbMenuItem3Component,
  NbMenuItem4Component,
  NbMenuTestComponent,
} from './menu/menu-test.component';
import { NbPopoverTestComponent } from './popover/popover-test.component';
import {
  NbRouteTabsetShowcaseChild1Component,
  NbRouteTabsetShowcaseChild2Component,
  NbRouteTabsetShowcaseComponent,
} from './tabset/route-tabset-showcase.component';
import { NbSearchTestComponent } from './search/search-test.component';
import { NbSearchCustomizedTestComponent } from './search/search-customized-test.component';
import { NbSidebarTestComponent } from './sidebar/sidebar-test.component';
import { NbSidebarOneTestComponent } from './sidebar/sidebar-one-test.component';
import { NbSidebarTwoTestComponent } from './sidebar/sidebar-two-test.component';
import { NbSidebarThreeTestComponent } from './sidebar/sidebar-three-test.component';
import { NbTabsetTestComponent } from './tabset/tabset-test.component';
import { NbUserTestComponent } from './user/user-test.component';
import { NbBootstrapTestComponent } from './bootstrap/bootstrap-test.component';
import { NbProgressBarShowcaseComponent } from './progress-bar/progress-bar-showcase.component';
import { NbProgressBarStatusComponent } from './progress-bar/progress-bar-status.component';
import { NbProgressBarValueComponent } from './progress-bar/progress-bar-value.component';
import { NbProgressBarSizeComponent } from './progress-bar/progress-bar-size.component';
import { NbProgressBarInteractiveComponent } from './progress-bar/progress-bar-interactive.component';
import { NbAlertTestComponent } from './alert/alert-test.component';
import { NbAlertShowcaseComponent } from './alert/alert-showcase.component';
import { NbAlertColorsComponent } from './alert/alert-colors.component';
import { NbAlertAccentsComponent } from './alert/alert-accents.component';
import { NbAlertSizesComponent } from './alert/alert-sizes.component';
import { NbAlertOutlineComponent } from './alert/alert-outline.component';
import { NbChatShowcaseComponent } from './chat/chat-showcase.component';
import { NbChatColorsComponent } from './chat/chat-colors.component';
import { NbChatSizesComponent } from './chat/chat-sizes.component';
import { NbChatDropComponent } from './chat/chat-drop.component';
import { NbChatMessageTypesShowcaseComponent } from './chat/chat-message-types-showcase.component';
import { NbChatConversationShowcaseComponent } from './chat/chat-conversation-showcase.component';
import { NbChatTestComponent } from './chat/chat-test.component';
import { NbSpinnerCardComponent } from './spinner/spinner-card.component';
import { NbSpinnerButtonComponent } from './spinner/spinner-button.component';
import { NbSpinnerTabsComponent } from './spinner/spinner-tabs.component';
import { NbSpinnerSizesComponent } from './spinner/spinner-sizes.component';
import { NbSpinnerColorsComponent } from './spinner/spinner-colors.component';
import { NbStepperShowcaseComponent } from './stepper/stepper-showcase.component';
import { NbStepperValidationComponent } from './stepper/stepper-validation.component';
import { NbStepperVerticalComponent } from './stepper/stepper-vertical.component';
import { NbStepperTestComponent } from './stepper/stepper-test.component';
import { NbAccordionShowcaseComponent } from './accordion/accordion-showcase.component';
import { NbAccordionTestComponent } from './accordion/accordion-test.component';
import { NbAccordionMultiComponent } from './accordion/accordion-multi.component';
import { NbAccordionToggleComponent } from './accordion/accordion-toggle.component';
import { NbLayoutSidebarSubheaderComponent } from './layout/layout-sidebar-subheader.component';
import { NbLayoutSubheaderComponent } from './layout/layout-subheader.component';
import { NbButtonShowcaseComponent } from './button/button-showcase.component';
import { NbButtonColorsComponent } from './button/button-colors.component';
import { NbButtonShapesComponent } from './button/button-shapes.component';
import { NbButtonHeroComponent } from './button/button-hero.component';
import { NbButtonOutlineComponent } from './button/button-outline.component';
import { NbButtonSizesComponent } from './button/button-sizes.component';
import { NbButtonTypesComponent } from './button/button-types.component';
import { NbButtonFullWidthComponent } from './button/button-full-width.component';
import { NbSimpleListShowcaseComponent } from './list/simple-list-showcase.component';
import { NbUsersListShowcaseComponent } from './list/users-list-showcase.component';
import { NbCardWithoutBodyComponent } from './card/card-without-body.component';
import { NbInfiniteListShowcaseComponent } from './infinite-list/infinite-list-showcase.component';
import { NbInfiniteListScrollModesComponent } from './infinite-list/infinite-list-scroll-modes.component';
import { NbInfiniteNewsListComponent } from './infinite-list/infinite-news-list.component';
import { NbInfiniteListPlaceholdersComponent } from './infinite-list/infinite-list-placeholders.component';
import { NbInputsShowcaseComponent } from './input/input-showcase.component';
import { NbInputColorsComponent } from './input/input-colors.component';
import { NbInputSizesComponent } from './input/input-sizes.component';
import { NbInputShapesComponent } from './input/input-shapes.component';
import { NbInputTypesComponent } from './input/input-types.component';
import { NbInputFullWidthComponent } from './input/input-full-width.component';
import { NbScrollWindowComponent } from './scroll/scroll-window.component';
import { NbCalendarBoundingMonthComponent } from './calendar/calendar-bounding-month.component';
import { NbCalendarShowcaseComponent } from './calendar/calendar-showcase.component';
import { NbCalendarRangeShowcaseComponent } from './calendar/calendar-range-showcase.component';
import { NbCalendarStartViewComponent } from './calendar/calendar-start-view.component';
import { NbCalendarCustomDayCellShowcaseComponent } from './calendar/calendar-custom-day-cell-showcase.component';
import { NbCalendarFilterComponent } from './calendar/calendar-filter.component';
import { NbCalendarMinMaxComponent } from './calendar/calendar-min-max.component';
import { NbCalendarSizeComponent } from './calendar/calendar-size.component';
import { NbCalendarKitFullCalendarShowcaseComponent } from './calendar-kit/calendar-kit-full-calendar.component';
import { NbOverlayShowcaseComponent } from './overlay/overlay-showcase.component';
import { NbDialogShowcaseComponent } from './dialog/dialog-showcase.component';
import { NbDialogHasBackdropComponent } from './dialog/dialog-has-backdrop.component';
import { NbDialogBackdropClickComponent } from './dialog/dialog-backdrop-click.component';
import { NbDialogEscComponent } from './dialog/dialog-esc.component';
import { NbDialogScrollComponent } from './dialog/dialog-scroll.component';
import { NbDialogAutoFocusComponent } from './dialog/dialog-auto-focus.component';
import { NbDialogResultComponent } from './dialog/dialog-result.component';
import { NbDialogTemplateComponent } from './dialog/dialog-template.component';
import { NbToastrShowcaseComponent } from './toastr/toastr-showcase.component';
import { NbToastrPositionsComponent } from './toastr/toastr-positions.component';
import { NbToastrStatusesComponent } from './toastr/toastr-statuses.component';
import { NbToastrDurationComponent } from './toastr/toastr-duration.component';
import { NbToastrDestroyByClickComponent } from './toastr/toastr-destroy-by-click.component';
import { NbToastrPreventDuplicatesComponent } from './toastr/toastr-prevent-duplicates.component';
import { NbToastrIconComponent } from './toastr/toastr-icon.component';
import { NbTooltipShowcaseComponent } from './tooltip/tooltip-showcase.component';
import { NbTooltipWithIconComponent } from './tooltip/tooltip-with-icon.component';
import { NbTooltipPlacementsComponent } from './tooltip/tooltip-placements.component';
import { NbTooltipColorsComponent } from './tooltip/tooltip-colors.component';
import { NbSelectShowcaseComponent } from './select/select-showcase.component';
import { NbSelectMultipleComponent } from './select/select-multiple.component';
import { NbSelectStatusComponent } from './select/select-status.component';
import { NbSelectHeroComponent } from './select/select-hero.component';
import { NbSelectOutlineComponent } from './select/select-outline.component';
import { NbSelectShapeComponent } from './select/select-shapes.component';
import { NbSelectSizesComponent } from './select/select-sizes.component';
import { NbSelectPlaceholderComponent } from './select/select-placeholder.component';
import { NbSelectFormComponent } from './select/select-form.component';
import { NbSelectDisabledComponent } from './select/select-disabled.component';
import { NbSelectGroupsComponent } from './select/select-groups.component';
import { NbSelectLabelShowcaseComponent } from './select/select-label.component';
import { NbSelectCleanComponent } from './select/select-clean.component';
import { NbWindowShowcaseComponent } from './window/window-showcase.component';
import { NbTemplateWindowComponent } from './window/template-window.component';
import { NbWindowsBackdropComponent } from './window/windows-backdrop.component';
import { NbDatepickerShowcaseComponent } from './datepicker/datepicker-showcase.component';
import { NbDatepickerFormsComponent } from './datepicker/datepicker-forms.component';
import { NbDatepickerValidationComponent } from './datepicker/datepicker-validation.component';
import { NbRangepickerShowcaseComponent } from './datepicker/rangepicker-showcase.component';
import { NbRadioShowcaseComponent } from './radio/radio-showcase.component';
import { NbRadioDisabledComponent } from './radio/radio-disabled.component';
import { NbCalendarWithoutHeaderComponent } from './calendar/calendar-without-header.component';


export const routes: Routes = [
  {
    path: '',
    component: NbPlaygroundLayoutComponent,
    children: [
      {
        path: 'popover',
        children: [
          {
            path: 'popover-test.component',
            component: NbPopoverTestComponent,
          },
          {
            path: 'popover-showcase.component',
            component: NbPopoverShowcaseComponent,
          },
          {
            path: 'popover-template-ref.component',
            component: NbPopoverTemplateRefComponent,
          },
          {
            path: 'popover-custom-component.component',
            component: NbPopoverCustomComponentComponent,
          },
          {
            path: 'popover-placements.component',
            component: NbPopoverPlacementsComponent,
          },
          {
            path: 'popover-modes.component',
            component: NbPopoverModesComponent,
          },
        ],
      },
      {
        path: 'tooltip',
        children: [
          {
            path: 'tooltip-showcase.component',
            component: NbTooltipShowcaseComponent,
          },
          {
            path: 'tooltip-with-icon.component',
            component: NbTooltipWithIconComponent,
          },
          {
            path: 'tooltip-placements.component',
            component: NbTooltipPlacementsComponent,
          },
          {
            path: 'tooltip-colors.component',
            component: NbTooltipColorsComponent,
          },
        ],
      },
      {
        path: 'select',
        children: [
          {
            path: 'select-showcase.component',
            component: NbSelectShowcaseComponent,
          },
          {
            path: 'select-multiple.component',
            component: NbSelectMultipleComponent,
          },
          {
            path: 'select-status.component',
            component: NbSelectStatusComponent,
          },
          {
            path: 'select-hero.component',
            component: NbSelectHeroComponent,
          },
          {
            path: 'select-outline.component',
            component: NbSelectOutlineComponent,
          },
          {
            path: 'select-shapes.component',
            component: NbSelectShapeComponent,
          },
          {
            path: 'select-sizes.component',
            component: NbSelectSizesComponent,
          },
          {
            path: 'select-placeholder.component',
            component: NbSelectPlaceholderComponent,
          },
          {
            path: 'select-form.component',
            component: NbSelectFormComponent,
          },
          {
            path: 'select-disabled.component',
            component: NbSelectDisabledComponent,
          },
          {
            path: 'select-groups.component',
            component: NbSelectGroupsComponent,
          },
          {
            path: 'select-label.component',
            component: NbSelectLabelShowcaseComponent,
          },
          {
            path: 'select-clean.component',
            component: NbSelectCleanComponent,
          },
        ],
      },
      {
        path: 'radio',
        children: [
          {
            path: 'radio-showcase.component',
            component: NbRadioShowcaseComponent,
          },
          {
            path: 'radio-disabled.component',
            component: NbRadioDisabledComponent,
          },
        ],
      },
      {
        path: 'button',
        children: [
          {
            path: 'button-showcase.component',
            component: NbButtonShowcaseComponent,
          },
          {
            path: 'button-colors.component',
            component: NbButtonColorsComponent,
          },
          {
            path: 'button-shapes.component',
            component: NbButtonShapesComponent,
          },
          {
            path: 'button-hero.component',
            component: NbButtonHeroComponent,
          },
          {
            path: 'button-outline.component',
            component: NbButtonOutlineComponent,
          },
          {
            path: 'button-sizes.component',
            component: NbButtonSizesComponent,
          },
          {
            path: 'button-types.component',
            component: NbButtonTypesComponent,
          },
          {
            path: 'button-full-width.component',
            component: NbButtonFullWidthComponent,
          },
        ],
      },
      {
        path: 'checkbox',
        children: [
          {
            path: 'checkbox-test.component',
            component: NbCheckboxTestComponent,
          },
          {
            path: 'checkbox-showcase.component',
            component: NbCheckboxShowcaseComponent,
          },
          {
            path: 'checkbox-status.component',
            component: NbCheckboxStatusComponent,
          },
          {
            path: 'checkbox-disabled.component',
            component: NbCheckboxDisabledComponent,
          },
        ],
      },
      {
        path: 'spinner',
        children: [
          {
            path: 'spinner-card.component',
            component: NbSpinnerCardComponent,
          },
          {
            path: 'spinner-tabs.component',
            component: NbSpinnerTabsComponent,
          },
          {
            path: 'spinner-button.component',
            component: NbSpinnerButtonComponent,
          },
          {
            path: 'spinner-sizes.component',
            component: NbSpinnerSizesComponent,
          },
          {
            path: 'spinner-colors.component',
            component: NbSpinnerColorsComponent,
          },
        ],
      },
      {
        path: 'calendar',
        children: [
          {
            path: 'calendar-showcase.component',
            component: NbCalendarShowcaseComponent,
          },
          {
            path: 'calendar-bounding-month.component',
            component: NbCalendarBoundingMonthComponent,
          },
          {
            path: 'calendar-start-view.component',
            component: NbCalendarStartViewComponent,
          },
          {
            path: 'calendar-range-showcase.component',
            component: NbCalendarRangeShowcaseComponent,
          },
          {
            path: 'calendar-custom-day-cell-showcase.component',
            component: NbCalendarCustomDayCellShowcaseComponent,
          },
          {
            path: 'calendar-filter.component',
            component: NbCalendarFilterComponent,
          },
          {
            path: 'calendar-min-max.component',
            component: NbCalendarMinMaxComponent,
          },
          {
            path: 'calendar-size.component',
            component: NbCalendarSizeComponent,
          },
          {
            path: 'calendar-without-header.component',
            component: NbCalendarWithoutHeaderComponent,
          },
        ],
      },
      {
        path: 'calendar-kit',
        children: [
          {
            path: 'calendar-kit-full-calendar.component',
            component: NbCalendarKitFullCalendarShowcaseComponent,
          },
        ],
      },
      {
        path: 'card',
        children: [
          {
            path: 'card-test.component',
            component: NbCardTestComponent,
          },
          {
            path: 'card-showcase.component',
            component: NbCardShowcaseComponent,
          },
          {
            path: 'card-full.component',
            component: NbCardFullComponent,
          },
          {
            path: 'card-colors.component',
            component: NbCardColorsComponent,
          },
          {
            path: 'card-accents.component',
            component: NbCardAccentsComponent,
          },
          {
            path: 'card-sizes.component',
            component: NbCardSizesComponent,
          },
          {
            path: 'card-without-body.component',
            component: NbCardWithoutBodyComponent,
          },
        ],
      },
      {
        path: 'flip-card',
        children: [
          {
            path: 'flip-card-showcase.component',
            component: NbFlipCardShowcaseComponent,
          },
          {
            path: 'flip-card-full.component',
            component: NbFlipCardFullComponent,
          },
          {
            path: 'flip-card-colors.component',
            component: NbFlipCardColorsComponent,
          },
          {
            path: 'flip-card-accents.component',
            component: NbFlipCardAccentsComponent,
          },
          {
            path: 'flip-card-sizes.component',
            component: NbFlipCardSizesComponent,
          },
        ],
      },
      {
        path: 'reveal-card',
        children: [
          {
            path: 'reveal-card-full.component',
            component: NbRevealCardFullComponent,
          },
          {
            path: 'reveal-card-showcase.component',
            component: NbRevealCardShowcaseComponent,
          },
          {
            path: 'reveal-card-colors.component',
            component: NbRevealCardColorsComponent,
          },
          {
            path: 'reveal-card-accents.component',
            component: NbRevealCardAccentsComponent,
          },
          {
            path: 'reveal-card-sizes.component',
            component: NbRevealCardSizesComponent,
          },
          {
            path: 'reveal-card-full.component',
            component: NbRevealCardFullComponent,
          },
        ],
      },
      {
        path: 'alert',
        children: [
          {
            path: 'alert-test.component',
            component: NbAlertTestComponent,
          },
          {
            path: 'alert-showcase.component',
            component: NbAlertShowcaseComponent,
          },
          {
            path: 'alert-colors.component',
            component: NbAlertColorsComponent,
          },
          {
            path: 'alert-accents.component',
            component: NbAlertAccentsComponent,
          },
          {
            path: 'alert-sizes.component',
            component: NbAlertSizesComponent,
          },
          {
            path: 'alert-outline.component',
            component: NbAlertOutlineComponent,
          },
        ],
      },
      {
        path: 'menu',
        children: [
          {
            path: 'menu-showcase.component',
            component: NbMenuShowcaseComponent,
          },
          {
            path: 'menu-children.component',
            component: NbMenuChildrenComponent,
          },
        ],
      },
      {
        path: 'action',
        children: [
          {
            path: 'action-test.component',
            component: NbActionTestComponent,
          },
          {
            path: 'action-showcase.component',
            component: NbActionShowcaseComponent,
          },
          {
            path: 'action-sizes.component',
            component: NbActionSizesComponent,
          },
          {
            path: 'action-badge.component',
            component: NbActionBadgeComponent,
          },
          {
            path: 'action-width.component',
            component: NbActionWidthComponent,
          },
        ],
      },
      {
        path: 'tabset',
        children: [
          {
            path: 'tabset-test.component',
            component: NbTabsetTestComponent,
          },
          {
            path: 'tabset-test.component/:tab',
            component: NbTabsetTestComponent,
          },
          {
            path: 'tabset-showcase.component',
            component: NbTabsetShowcaseComponent,
          },
          {
            path: 'tabset-badge.component',
            component: NbTabsetBadgeComponent,
          },
          {
            path: 'tabset-width.component',
            component: NbTabsetWidthComponent,
          },
          {
            path: 'tabset-icon.component',
            component: NbTabsetIconComponent,
          },
          {
            path: 'route-tabset-showcase.component',
            component: NbRouteTabsetShowcaseComponent,
            children: [
              {
                path: '',
                redirectTo: 'tab1',
                pathMatch: 'full',
              },
              {
                path: 'tab1',
                component: NbRouteTabsetShowcaseChild1Component,
              },
              {
                path: 'tab2',
                component: NbRouteTabsetShowcaseChild2Component,
              },
            ],
          },
        ],
      },
      {
        path: 'stepper',
        children: [
          {
            path: 'stepper-test.component',
            component: NbStepperTestComponent,
          },
          {
            path: 'stepper-showcase.component',
            component: NbStepperShowcaseComponent,
          },
          {
            path: 'stepper-validation.component',
            component: NbStepperValidationComponent,
          },
          {
            path: 'stepper-vertical.component',
            component: NbStepperVerticalComponent,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'user-showcase.component',
            component: NbUserShowcaseComponent,
          },
          {
            path: 'user-sizes.component',
            component: NbUserSizesComponent,
          },
        ],
      },
      {
        path: 'badge',
        children: [
          {
            path: 'badge-showcase.component',
            component: NbBadgeShowcaseComponent,
          },
        ],
      },
      {
        path: 'progress-bar',
        children: [
          {
            path: 'progress-bar-showcase.component',
            component: NbProgressBarShowcaseComponent,
          },
          {
            path: 'progress-bar-status.component',
            component: NbProgressBarStatusComponent,
          },
          {
            path: 'progress-bar-size.component',
            component: NbProgressBarSizeComponent,
          },
          {
            path: 'progress-bar-value.component',
            component: NbProgressBarValueComponent,
          },
          {
            path: 'progress-bar-interactive.component',
            component: NbProgressBarInteractiveComponent,
          },
        ],
      },
      {
        path: 'chat',
        children: [
          {
            path: 'chat-showcase.component',
            component: NbChatShowcaseComponent,
          },
          {
            path: 'chat-colors.component',
            component: NbChatColorsComponent,
          },
          {
            path: 'chat-sizes.component',
            component: NbChatSizesComponent,
          },
          {
            path: 'chat-drop.component',
            component: NbChatDropComponent,
          },
          {
            path: 'chat-message-types-showcase.component',
            component: NbChatMessageTypesShowcaseComponent,
          },
          {
            path: 'chat-conversation-showcase.component',
            component: NbChatConversationShowcaseComponent,
          },
          {
            path: 'chat-test.component',
            component: NbChatTestComponent,
          },
        ],
      },
      {
        path: 'accordion',
        children: [
          {
            path: 'accordion-showcase.component',
            component: NbAccordionShowcaseComponent,
          },
          {
            path: 'accordion-multi.component',
            component: NbAccordionMultiComponent,
          },
          {
            path: 'accordion-toggle.component',
            component: NbAccordionToggleComponent,
          },
          {
            path: 'accordion-test.component',
            component: NbAccordionTestComponent,
          },
        ],
      },
      {
        path: 'list',
        children: [
          {
            path: 'simple-list-showcase.component',
            component: NbSimpleListShowcaseComponent,
          },
          {
            path: 'users-list-showcase.component',
            component: NbUsersListShowcaseComponent,
          },
        ],
      },
      {
        path: 'infinite-list',
        children: [
          {
            path: 'infinite-list-showcase.component',
            component: NbInfiniteListShowcaseComponent,
          },
          {
            path: 'infinite-list-scroll-modes.component',
            component: NbInfiniteListScrollModesComponent,
          },
          {
            path: 'infinite-news-list.component',
            component: NbInfiniteNewsListComponent,
          },
          {
            path: 'infinite-list-placeholders.component',
            component: NbInfiniteListPlaceholdersComponent,
          },
        ],
      },
      {
        path: 'input',
        children: [
          {
            path: 'input-showcase.component',
            component: NbInputsShowcaseComponent,
          },
          {
            path: 'input-colors.component',
            component: NbInputColorsComponent,
          },
          {
            path: 'input-sizes.component',
            component: NbInputSizesComponent,
          },
          {
            path: 'input-shapes.component',
            component: NbInputShapesComponent,
          },
          {
            path: 'input-types.component',
            component: NbInputTypesComponent,
          },
          {
            path: 'input-full-width.component',
            component: NbInputFullWidthComponent,
          },
        ],
      },
      {
        path: 'overlay',
        children: [
          {
            path: 'overlay-showcase.component',
            component: NbOverlayShowcaseComponent,
          },
        ],
      },
      {
        path: 'dialog',
        children: [
          {
            path: 'dialog-showcase.component',
            component: NbDialogShowcaseComponent,
          },
          {
            path: 'dialog-has-backdrop.component',
            component: NbDialogHasBackdropComponent,
          },
          {
            path: 'dialog-backdrop-click.component',
            component: NbDialogBackdropClickComponent,
          },
          {
            path: 'dialog-esc.component',
            component: NbDialogEscComponent,
          },
          {
            path: 'dialog-scroll.component',
            component: NbDialogScrollComponent,
          },
          {
            path: 'dialog-auto-focus.component',
            component: NbDialogAutoFocusComponent,
          },
          {
            path: 'dialog-result.component',
            component: NbDialogResultComponent,
          },
          {
            path: 'dialog-template.component',
            component: NbDialogTemplateComponent,
          },
        ],
      },
      {
        path: 'toastr',
        children: [
          {
            path: 'toastr-showcase.component',
            component: NbToastrShowcaseComponent,
          },
          {
            path: 'toastr-positions.component',
            component: NbToastrPositionsComponent,
          },
          {
            path: 'toastr-statuses.component',
            component: NbToastrStatusesComponent,
          },
          {
            path: 'toastr-duration.component',
            component: NbToastrDurationComponent,
          },
          {
            path: 'toastr-destroy-by-click.component',
            component: NbToastrDestroyByClickComponent,
          },
          {
            path: 'toastr-prevent-duplicates.component',
            component: NbToastrPreventDuplicatesComponent,
          },
          {
            path: 'toastr-icon.component',
            component: NbToastrIconComponent,
          },
        ],
      },
      {
        path: 'window',
        children: [
          {
            path: 'window-showcase.component',
            component: NbWindowShowcaseComponent,
          },
          {
            path: 'template-window.component',
            component: NbTemplateWindowComponent,
          },
          {
            path: 'windows-backdrop.component',
            component: NbWindowsBackdropComponent,
          },
        ],
      },
      {
        path: 'datepicker',
        children: [
          {
            path: 'datepicker-showcase.component',
            component: NbDatepickerShowcaseComponent,
          },
          {
            path: 'datepicker-forms.component',
            component: NbDatepickerFormsComponent,
          },
          {
            path: 'datepicker-validation.component',
            component: NbDatepickerValidationComponent,
          },
          {
            path: 'rangepicker-showcase.component',
            component: NbRangepickerShowcaseComponent,
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: NbPlaygroundBaseComponent,
    children: [
      {
        path: 'context-menu',
        children: [
          {
            path: 'context-menu-test.component',
            component: NbContextMenuTestComponent,
          },
          {
            path: 'context-menu-showcase.component',
            component: NbContextMenuShowcaseComponent,
          },
          {
            path: 'context-menu-click.component',
            component: NbContextMenuClickComponent,
          },
        ],
      },
      {
        path: 'layout',
        children: [
          {
            path: 'layout-test.component',
            component: NbLayoutTestComponent,
          },
          {
            path: 'layout-header-test.component',
            component: NbLayoutHeaderTestComponent,
          },
          {
            path: 'layout-footer-test.component',
            component: NbLayoutFooterTestComponent,
          },
          {
            path: 'theme-change-test.component',
            component: NbThemeChangeTestComponent,
          },
          {
            path: 'theme-breakpoint-test.component',
            component: NbThemeBreakpointTestComponent,
          },
          {
            path: 'layout-showcase.component',
            component: NbLayoutShowcaseComponent,
          },
          {
            path: 'layout-w-footer.component',
            component: NbLayoutWFooterComponent,
          },
          {
            path: 'layout-fixed-header.component',
            component: NbLayoutFixedHeaderComponent,
          },
          {
            path: 'layout-sidebar-subheader.component',
            component: NbLayoutSidebarSubheaderComponent,
          },
          {
            path: 'layout-subheader.component',
            component: NbLayoutSubheaderComponent,
          },
          {
            path: 'layout-column-left.component',
            component: NbLayoutColumnLeftComponent,
          },
        ],
      },
      {
        path: 'sidebar',
        children: [
          {
            path: 'sidebar-test.component',
            component: NbSidebarTestComponent,
          },
          {
            path: 'sidebar-one-test.component',
            component: NbSidebarOneTestComponent,
          },
          {
            path: 'sidebar-two-test.component',
            component: NbSidebarTwoTestComponent,
          },
          {
            path: 'sidebar-three-test.component',
            component: NbSidebarThreeTestComponent,
          },
          {
            path: 'sidebar-showcase.component',
            component: NbSidebarShowcaseComponent,
          },
          {
            path: 'sidebar-compacted.component',
            component: NbSidebarCompactedComponent,
          },
          {
            path: 'sidebar-right.component',
            component: NbSidebarRightComponent,
          },
          {
            path: 'sidebar-toggle.component',
            component: NbSidebarToggleComponent,
          },
          {
            path: 'sidebar-fixed.component',
            component: NbSidebarFixedComponent,
          },
        ],
      },
      {
        path: 'search',
        children: [
          {
            path: 'search-test.component',
            component: NbSearchTestComponent,
          },
          {
            path: 'search-customized-test.component',
            component: NbSearchCustomizedTestComponent,
          },
          {
            path: 'search-showcase.component',
            component: NbSearchShowcaseComponent,
          },
          {
            path: 'search-event.component',
            component: NbSearchEventComponent,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'user-test.component',
            component: NbUserTestComponent,
          },
        ],
      },
      {
        path: 'menu',
        children: [
          {
            path: 'menu-test.component',
            component: NbMenuTestComponent,
            children: [
              {
                path: '',
                redirectTo: '1',
                pathMatch: 'full',
              },
              {
                path: '1',
                component: NbMenuItem1Component,
              },
              {
                path: '2',
                component: NbMenuItem2Component,
              },
              {
                path: '12',
                component: NbMenuItem1Component,
              },
              {
                path: '3',
                component: NbMenuItem3Component,
                children: [
                  {
                    path: '',
                    redirectTo: '1',
                    pathMatch: 'full',
                  },
                  {
                    path: '1',
                    component: NbMenuItem31Component,
                  },
                  {
                    path: '2',
                    component: NbMenuItem32Component,
                  },
                  {
                    path: '3',
                    component: NbMenuItem33Component,
                    children: [
                      {
                        path: '',
                        redirectTo: '1',
                        pathMatch: 'full',
                      },
                      {
                        path: '1',
                        component: NbMenuItem331Component,
                      },
                      {
                        path: '2',
                        component: NbMenuItem332Component,
                      },
                    ],
                  },
                ],
              },
              {
                path: '4',
                component: NbMenuItem4Component,
              },
            ],
          },
        ],
      },
      {
        path: 'bootstrap',
        children: [
          {
            path: 'bootstrap-test.component',
            component: NbBootstrapTestComponent,
          },
        ],
      },
      {
        path: 'scroll',
        children: [
          {
            path: 'scroll-window.component',
            component: NbScrollWindowComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'oauth2',
    loadChildren: './oauth2/oauth2.module#NbOAuth2PlaygroundModule',
  },
  {
    path: 'oauth2-password',
    loadChildren: './oauth2-password/oauth2-password.module#NbOAuth2PasswordPlaygroundModule',
  },
  {
    path: 'smart-home',
    loadChildren: './smart-home/app.module#NgxAppModule',
  },
  {
    path: '',
    loadChildren: './auth/auth.module#NbAuthPlaygroundModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NbPlaygroundRoutingModule {
}
