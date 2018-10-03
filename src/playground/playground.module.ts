/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbThemeModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbCardModule,
  NbCheckboxModule,
  NbLayoutModule,
  NbMenuModule,
  NbPopoverModule,
  NbSidebarModule,
  NbActionsModule,
  NbSearchModule,
  NbTabsetModule,
  NbUserModule,
  NbBadgeModule,
  NbContextMenuModule,
  NbRouteTabsetModule,
  NbProgressBarModule,
  NbAlertModule,
  NbChatModule,
  NbSpinnerModule,
  NbStepperModule,
  NbAccordionModule,
  NbListModule,
  NbButtonModule,
  NbInputModule,
  NbToastrModule,
  NbTooltipModule,
  NbDialogModule,
  NbSelectModule,
  NbWindowModule,
  NbDatepickerModule, NbRadioModule,
} from '@nebular/theme';

import { NbPlaygroundRoutingModule } from './playground-routing.module';
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
import { NbLayoutTestComponent } from './layout/layout-test.component';
import { NbLayoutHeaderTestComponent } from './layout/layout-header-test.component';
import { NbLayoutFooterTestComponent } from './layout/layout-footer-test.component';
import { NbThemeChangeTestComponent } from './layout/theme-change-test.component';
import { NbThemeBreakpointTestComponent } from './layout/theme-breakpoint-test.component';
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
import { NbStepperShowcaseComponent } from './stepper/stepper-showcase.component';
import { NbStepperValidationComponent } from './stepper/stepper-validation.component';
import { NbStepperVerticalComponent } from './stepper/stepper-vertical.component';
import { NbStepperTestComponent } from './stepper/stepper-test.component';
import { NbPlaygroundSharedModule } from './shared/shared.module';
import { NbProgressBarShowcaseComponent } from './progress-bar/progress-bar-showcase.component';
import { NbProgressBarStatusComponent } from './progress-bar/progress-bar-status.component';
import { NbProgressBarValueComponent } from './progress-bar/progress-bar-value.component';
import { NbProgressBarSizeComponent } from './progress-bar/progress-bar-size.component';
import { NbProgressBarInteractiveComponent } from './progress-bar/progress-bar-interactive.component';
import { NbAlertShowcaseComponent } from './alert/alert-showcase.component';
import { NbAlertColorsComponent } from './alert/alert-colors.component';
import { NbAlertAccentsComponent } from './alert/alert-accents.component';
import { NbAlertSizesComponent } from './alert/alert-sizes.component';
import { NbAlertTestComponent } from './alert/alert-test.component';
import { NbAlertOutlineComponent } from './alert/alert-outline.component';
import { NbChatShowcaseComponent } from './chat/chat-showcase.component';
import { NbChatColorsComponent } from './chat/chat-colors.component';
import { NbChatSizesComponent } from './chat/chat-sizes.component';
import { NbChatDropComponent } from './chat/chat-drop.component';
import { NbChatMessageTypesShowcaseComponent } from './chat/chat-message-types-showcase.component';
import { NbChatConversationShowcaseComponent } from './chat/chat-conversation-showcase.component';
import { NbChatTestComponent } from './chat/chat-test.component';
import { NbSpinnerCardComponent } from './spinner/spinner-card.component';
import { NbSpinnerTabsComponent } from './spinner/spinner-tabs.component';
import { NbSpinnerButtonComponent } from './spinner/spinner-button.component';
import { NbSpinnerSizesComponent } from './spinner/spinner-sizes.component';
import { NbSpinnerColorsComponent } from './spinner/spinner-colors.component';
import { NbAccordionShowcaseComponent } from './accordion/accordion-showcase.component';
import { NbAccordionTestComponent } from './accordion/accordion-test.component';
import { NbAccordionToggleComponent } from './accordion/accordion-toggle.component';
import { NbAccordionMultiComponent } from './accordion/accordion-multi.component';
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
import { NbInfiniteListShowcaseComponent } from './infinite-list/infinite-list-showcase.component'
import { NbInfiniteListScrollModesComponent } from './infinite-list/infinite-list-scroll-modes.component'
import { NbInfiniteNewsListComponent } from './infinite-list/infinite-news-list.component'
import { NbInfiniteListPlaceholdersComponent } from './infinite-list/infinite-list-placeholders.component';
import { NbNewsPostComponent, NbNewsPostPlaceholderComponent } from './infinite-list/news-post.component';
import { NbInputsShowcaseComponent } from './input/input-showcase.component';
import { NbInputColorsComponent } from './input/input-colors.component';
import { NbInputSizesComponent } from './input/input-sizes.component';
import { NbInputShapesComponent } from './input/input-shapes.component';
import { NbInputTypesComponent } from './input/input-types.component';
import { NbInputFullWidthComponent } from './input/input-full-width.component';
import { NbScrollWindowComponent } from './scroll/scroll-window.component';
import { NbCalendarShowcaseComponent } from './calendar/calendar-showcase.component';
import { NbCalendarBoundingMonthComponent } from './calendar/calendar-bounding-month.component';
import { NbCalendarRangeShowcaseComponent } from './calendar/calendar-range-showcase.component';
import { NbCalendarStartViewComponent } from './calendar/calendar-start-view.component';
import {
  NbCalendarCustomDayCellComponent,
  NbCalendarCustomDayCellShowcaseComponent,
} from './calendar/calendar-custom-day-cell-showcase.component';
import { NbCalendarFilterComponent } from './calendar/calendar-filter.component';
import { NbCalendarMinMaxComponent } from './calendar/calendar-min-max.component';
import { NbCalendarSizeComponent } from './calendar/calendar-size.component';
import {
  NbCalendarKitFullCalendarShowcaseComponent,
  NbCalendarKitMonthCellComponent,
} from './calendar-kit/calendar-kit-full-calendar.component';
import { NbOverlayShowcaseComponent } from './overlay/overlay-showcase.component';
import { NbToastrShowcaseComponent } from './toastr/toastr-showcase.component';
import { NbToastrPositionsComponent } from './toastr/toastr-positions.component';
import { NbToastrStatusesComponent } from './toastr/toastr-statuses.component';
import { NbToastrDurationComponent } from './toastr/toastr-duration.component';
import { NbToastrDestroyByClickComponent } from './toastr/toastr-destroy-by-click.component';
import { NbToastrPreventDuplicatesComponent } from './toastr/toastr-prevent-duplicates.component';
import { NbToastrIconComponent } from './toastr/toastr-icon.component';
import { NbDialogShowcaseComponent, NbShowcaseDialogComponent } from './dialog/dialog-showcase.component';
import { NbDialogHasBackdropComponent, NbHasBackdropDialogComponent } from './dialog/dialog-has-backdrop.component';
import {
  NbBackdropClickDialogComponent,
  NbDialogBackdropClickComponent,
} from './dialog/dialog-backdrop-click.component';
import { NbDialogEscComponent, NbEscDialogComponent } from './dialog/dialog-esc.component';
import { NbDialogScrollComponent, NbScrollDialogComponent } from './dialog/dialog-scroll.component';
import { NbAutoFocusDialogComponent, NbDialogAutoFocusComponent } from './dialog/dialog-auto-focus.component';
import { NbDialogNamePromptComponent, NbDialogResultComponent } from './dialog/dialog-result.component';
import { NbDialogTemplateComponent } from './dialog/dialog-template.component';
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
import { NbFormComponent, NbWindowShowcaseComponent } from './window/window-showcase.component';
import { NbTemplateWindowComponent } from './window/template-window.component';
import { NbWindowsBackdropComponent } from './window/windows-backdrop.component';
import { NbDatepickerShowcaseComponent } from './datepicker/datepicker-showcase.component';
import { NbDatepickerFormsComponent } from './datepicker/datepicker-forms.component';
import { NbDatepickerValidationComponent } from './datepicker/datepicker-validation.component';
import { NbRangepickerShowcaseComponent } from './datepicker/rangepicker-showcase.component';
import { NbRadioShowcaseComponent } from './radio/radio-showcase.component';
import { NbRadioDisabledComponent } from './radio/radio-disabled.component';
import { NbCalendarWithoutHeaderComponent } from './calendar/calendar-without-header.component';

export const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbPopoverModule,
  NbCheckboxModule,
  NbSidebarModule,
  NbSidebarModule.forRoot(),
  NbMenuModule,
  NbMenuModule.forRoot(),
  NbActionsModule,
  NbSearchModule,
  NbThemeModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbUserModule,
  NbBadgeModule,
  NbContextMenuModule,
  NbStepperModule,
  NbAlertModule,
  NbPlaygroundSharedModule,
  NbProgressBarModule,
  NbChatModule.forChild({
    messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
  }),
  NbSpinnerModule,
  NbAccordionModule,
  NbButtonModule,
  NbListModule,
  NbInputModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbCalendarKitModule,
  NbToastrModule.forRoot(),
  NbDialogModule.forRoot(),
  NbTooltipModule,
  NbSelectModule,
  NbWindowModule.forRoot(),
  NbDatepickerModule.forRoot(),
  NbRadioModule,
];

export const NB_EXAMPLE_COMPONENTS = [
  NbPopoverTestComponent,
  NbPopoverShowcaseComponent,
  NbPopoverTemplateRefComponent,
  NbPopoverCustomComponentComponent,
  NbPopoverPlacementsComponent,
  NbPopoverModesComponent,
  NbCheckboxShowcaseComponent,
  NbCheckboxStatusComponent,
  NbCheckboxDisabledComponent,
  NbCheckboxTestComponent,
  NbProgressBarShowcaseComponent,
  NbProgressBarStatusComponent,
  NbProgressBarValueComponent,
  NbProgressBarSizeComponent,
  NbProgressBarInteractiveComponent,
  NbLayoutShowcaseComponent,
  NbLayoutWFooterComponent,
  NbLayoutFixedHeaderComponent,
  NbLayoutSidebarSubheaderComponent,
  NbLayoutSubheaderComponent,
  NbLayoutColumnLeftComponent,
  NbLayoutTestComponent,
  NbLayoutHeaderTestComponent,
  NbLayoutFooterTestComponent,
  NbThemeChangeTestComponent,
  NbThemeBreakpointTestComponent,
  NbSidebarTestComponent,
  NbSidebarOneTestComponent,
  NbSidebarTwoTestComponent,
  NbSidebarThreeTestComponent,
  NbSidebarShowcaseComponent,
  NbSidebarCompactedComponent,
  NbSidebarRightComponent,
  NbSidebarToggleComponent,
  NbSidebarFixedComponent,
  NbCardShowcaseComponent,
  NbCardFullComponent,
  NbCardColorsComponent,
  NbCardAccentsComponent,
  NbCardWithoutBodyComponent,
  NbCardSizesComponent,
  NbCardTestComponent,
  NbFlipCardShowcaseComponent,
  NbFlipCardColorsComponent,
  NbFlipCardAccentsComponent,
  NbFlipCardSizesComponent,
  NbFlipCardFullComponent,
  NbRevealCardShowcaseComponent,
  NbRevealCardColorsComponent,
  NbRevealCardAccentsComponent,
  NbRevealCardSizesComponent,
  NbRevealCardFullComponent,
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
  NbMenuShowcaseComponent,
  NbMenuChildrenComponent,
  NbActionShowcaseComponent,
  NbActionSizesComponent,
  NbActionBadgeComponent,
  NbActionWidthComponent,
  NbActionTestComponent,
  NbSearchTestComponent,
  NbSearchCustomizedTestComponent,
  NbSearchShowcaseComponent,
  NbSearchEventComponent,
  NbTabsetTestComponent,
  NbRouteTabsetShowcaseChild1Component,
  NbRouteTabsetShowcaseChild2Component,
  NbRouteTabsetShowcaseComponent,
  NbTabsetShowcaseComponent,
  NbTabsetBadgeComponent,
  NbTabsetWidthComponent,
  NbTabsetIconComponent,
  NbUserTestComponent,
  NbUserShowcaseComponent,
  NbUserSizesComponent,
  NbBadgeShowcaseComponent,
  NbContextMenuShowcaseComponent,
  NbContextMenuClickComponent,
  NbContextMenuTestComponent,
  NbBootstrapTestComponent,
  NbAlertShowcaseComponent,
  NbAlertColorsComponent,
  NbAlertAccentsComponent,
  NbAlertSizesComponent,
  NbAlertTestComponent,
  NbAlertOutlineComponent,
  NbChatShowcaseComponent,
  NbChatColorsComponent,
  NbChatSizesComponent,
  NbChatDropComponent,
  NbChatMessageTypesShowcaseComponent,
  NbChatConversationShowcaseComponent,
  NbChatTestComponent,
  NbSpinnerCardComponent,
  NbSpinnerTabsComponent,
  NbSpinnerButtonComponent,
  NbSpinnerSizesComponent,
  NbSpinnerColorsComponent,
  NbStepperShowcaseComponent,
  NbStepperValidationComponent,
  NbStepperVerticalComponent,
  NbStepperTestComponent,
  NbAccordionShowcaseComponent,
  NbAccordionTestComponent,
  NbAccordionToggleComponent,
  NbAccordionMultiComponent,
  NbButtonShowcaseComponent,
  NbButtonColorsComponent,
  NbButtonShapesComponent,
  NbButtonHeroComponent,
  NbButtonOutlineComponent,
  NbButtonSizesComponent,
  NbButtonTypesComponent,
  NbButtonFullWidthComponent,
  NbSimpleListShowcaseComponent,
  NbUsersListShowcaseComponent,
  NbInfiniteNewsListComponent,
  NbInfiniteListPlaceholdersComponent,
  NbInfiniteListShowcaseComponent,
  NbInfiniteListScrollModesComponent,
  NbNewsPostComponent,
  NbNewsPostPlaceholderComponent,
  NbInputsShowcaseComponent,
  NbInputColorsComponent,
  NbInputSizesComponent,
  NbInputShapesComponent,
  NbInputTypesComponent,
  NbInputFullWidthComponent,
  NbScrollWindowComponent,
  NbCalendarShowcaseComponent,
  NbCalendarBoundingMonthComponent,
  NbCalendarRangeShowcaseComponent,
  NbCalendarStartViewComponent,
  NbCalendarCustomDayCellShowcaseComponent,
  NbCalendarCustomDayCellComponent,
  NbCalendarFilterComponent,
  NbCalendarMinMaxComponent,
  NbCalendarSizeComponent,
  NbCalendarWithoutHeaderComponent,
  NbCalendarKitFullCalendarShowcaseComponent,
  NbCalendarKitMonthCellComponent,
  NbOverlayShowcaseComponent,
  NbToastrShowcaseComponent,
  NbToastrPositionsComponent,
  NbToastrStatusesComponent,
  NbToastrDurationComponent,
  NbToastrDestroyByClickComponent,
  NbToastrPreventDuplicatesComponent,
  NbToastrIconComponent,
  NbAutoFocusDialogComponent,
  NbBackdropClickDialogComponent,
  NbEscDialogComponent,
  NbHasBackdropDialogComponent,
  NbScrollDialogComponent,
  NbShowcaseDialogComponent,
  NbDialogShowcaseComponent,
  NbDialogHasBackdropComponent,
  NbDialogBackdropClickComponent,
  NbDialogEscComponent,
  NbDialogScrollComponent,
  NbDialogAutoFocusComponent,
  NbDialogResultComponent,
  NbDialogNamePromptComponent,
  NbDialogTemplateComponent,
  NbTooltipShowcaseComponent,
  NbTooltipWithIconComponent,
  NbTooltipPlacementsComponent,
  NbTooltipColorsComponent,
  NbSelectShowcaseComponent,
  NbSelectMultipleComponent,
  NbSelectStatusComponent,
  NbSelectHeroComponent,
  NbSelectOutlineComponent,
  NbSelectShapeComponent,
  NbSelectSizesComponent,
  NbSelectPlaceholderComponent,
  NbSelectFormComponent,
  NbSelectDisabledComponent,
  NbSelectGroupsComponent,
  NbSelectLabelShowcaseComponent,
  NbSelectCleanComponent,
  NbWindowShowcaseComponent,
  NbFormComponent,
  NbTemplateWindowComponent,
  NbWindowsBackdropComponent,
  NbDatepickerShowcaseComponent,
  NbDatepickerFormsComponent,
  NbDatepickerValidationComponent,
  NbRangepickerShowcaseComponent,
  NbRadioShowcaseComponent,
  NbRadioDisabledComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NbPlaygroundRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...NB_MODULES,
  ],
  declarations: [
    NbPlaygroundLayoutComponent,
    NbPlaygroundBaseComponent,
    ...NB_EXAMPLE_COMPONENTS,
  ],
  entryComponents: [
    NbAutoFocusDialogComponent,
    NbDialogNamePromptComponent,
    NbEscDialogComponent,
    NbHasBackdropDialogComponent,
    NbScrollDialogComponent,
    NbShowcaseDialogComponent,
    NbBackdropClickDialogComponent,
    NbFormComponent,
  ],
})
export class NbPlaygroundModule {
}
