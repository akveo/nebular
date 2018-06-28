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
  NbRouteTabsetTestChild1Component,
  NbRouteTabsetTestChild2Component,
  NbRouteTabsetTestComponent,
} from './tabset/route-tabset-test.component';
import { NbSearchTestComponent } from './search/search-test.component';
import { NbSearchCustomizedTestComponent } from './search/search-customized-test.component';
import { NbSidebarTestComponent } from './sidebar/sidebar-test.component';
import { NbSidebarOneTestComponent } from './sidebar/sidebar-one-test.component';
import { NbSidebarTwoTestComponent } from './sidebar/sidebar-two-test.component';
import { NbSidebarThreeTestComponent } from './sidebar/sidebar-three-test.component';
import { NbTabsetTestComponent } from './tabset/tabset-test.component';
import { NbUserTestComponent } from './user/user-test.component';
import { NbThemeDynamicTestComponent } from './layout/theme-dynamic-test.component';
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
  NbLayoutColumnLeftComponent,
  NbLayoutTestComponent,
  NbLayoutHeaderTestComponent,
  NbLayoutFooterTestComponent,
  NbThemeDynamicTestComponent,
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
  NbRouteTabsetTestChild1Component,
  NbRouteTabsetTestChild2Component,
  NbRouteTabsetTestComponent,
  NbTabsetShowcaseComponent,
  NbTabsetBadgeComponent,
  NbTabsetWidthComponent,
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
})
export class NbPlaygroundModule {
}
