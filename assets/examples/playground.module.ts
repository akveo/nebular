import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  NbAlertModule,
  NbPlaygroundSharedModule,
  NbProgressBarModule,
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
];


@NgModule({
  imports: [
    CommonModule,
    NbPlaygroundRoutingModule,
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
