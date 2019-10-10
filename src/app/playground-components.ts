export abstract class ComponentLink {
  path: string;
  name?: string;
  component?: string;
  link?: any[] | string;
  children?: ComponentLink[];
}

export const PLAYGROUND_COMPONENTS: ComponentLink[] = [
  {
    path: 'accordion',
    children: [
      {
        path: 'accordion-multi.component',
        link: '/accordion/accordion-multi.component',
        component: 'AccordionMultiComponent',
        name: 'Accordion Multi',
      },
      {
        path: 'accordion-showcase.component',
        link: '/accordion/accordion-showcase.component',
        component: 'AccordionShowcaseComponent',
        name: 'Accordion Showcase',
      },
      {
        path: 'accordion-test.component',
        link: '/accordion/accordion-test.component',
        component: 'AccordionTestComponent',
        name: 'Accordion Test',
      },
      {
        path: 'accordion-toggle.component',
        link: '/accordion/accordion-toggle.component',
        component: 'AccordionToggleComponent',
        name: 'Accordion Toggle',
      },
    ],
  },
  {
    path: 'action',
    children: [
      {
        path: 'action-badge.component',
        link: '/action/action-badge.component',
        component: 'ActionBadgeComponent',
        name: 'Action Badge',
      },
      {
        path: 'action-showcase.component',
        link: '/action/action-showcase.component',
        component: 'ActionShowcaseComponent',
        name: 'Action Showcase',
      },
      {
        path: 'action-sizes.component',
        link: '/action/action-sizes.component',
        component: 'ActionSizesComponent',
        name: 'Action Sizes',
      },
      {
        path: 'action-test.component',
        link: '/action/action-test.component',
        component: 'ActionTestComponent',
        name: 'Action Test',
      },
      {
        path: 'action-width.component',
        link: '/action/action-width.component',
        component: 'ActionWidthComponent',
        name: 'Action Width',
      },
    ],
  },
  {
    path: 'alert',
    children: [
      {
        path: 'alert-accents.component',
        link: '/alert/alert-accents.component',
        component: 'AlertAccentsComponent',
        name: 'Alert Accents',
      },
      {
        path: 'alert-colors.component',
        link: '/alert/alert-colors.component',
        component: 'AlertColorsComponent',
        name: 'Alert Colors',
      },
      {
        path: 'alert-outline.component',
        link: '/alert/alert-outline.component',
        component: 'AlertOutlineComponent',
        name: 'Alert Outline',
      },
      {
        path: 'alert-showcase.component',
        link: '/alert/alert-showcase.component',
        component: 'AlertShowcaseComponent',
        name: 'Alert Showcase',
      },
      {
        path: 'alert-sizes.component',
        link: '/alert/alert-sizes.component',
        component: 'AlertSizesComponent',
        name: 'Alert Sizes',
      },
      {
        path: 'alert-test.component',
        link: '/alert/alert-test.component',
        component: 'AlertTestComponent',
        name: 'Alert Test',
      },
    ],
  },
  {
    path: 'badge',
    children: [
      {
        path: 'badge-showcase.component',
        link: '/badge/badge-showcase.component',
        component: 'BadgeShowcaseComponent',
        name: 'Badge Showcase',
      },
    ],
  },
  {
    path: 'button',
    children: [
      {
        path: 'button-colors.component',
        link: '/button/button-colors.component',
        component: 'ButtonColorsComponent',
        name: 'Button Colors',
      },
      {
        path: 'button-full-width.component',
        link: '/button/button-full-width.component',
        component: 'ButtonFullWidthComponent',
        name: 'Button Full Width',
      },
      {
        path: 'button-hero.component',
        link: '/button/button-hero.component',
        component: 'ButtonHeroComponent',
        name: 'Button Hero',
      },
      {
        path: 'button-outline.component',
        link: '/button/button-outline.component',
        component: 'ButtonOutlineComponent',
        name: 'Button Outline',
      },
      {
        path: 'button-shapes.component',
        link: '/button/button-shapes.component',
        component: 'ButtonShapesComponent',
        name: 'Button Shapes',
      },
      {
        path: 'button-showcase.component',
        link: '/button/button-showcase.component',
        component: 'ButtonShowcaseComponent',
        name: 'Button Showcase',
      },
      {
        path: 'button-sizes.component',
        link: '/button/button-sizes.component',
        component: 'ButtonSizesComponent',
        name: 'Button Sizes',
      },
      {
        path: 'button-types.component',
        link: '/button/button-types.component',
        component: 'ButtonTypesComponent',
        name: 'Button Types',
      },
      {
        path: 'button-icon.component',
        link: '/button/button-icon.component',
        component: 'ButtonIconComponent',
        name: 'Button Icon',
      },
      {
        path: 'button-interactive.component',
        link: '/button/button-interactive.component',
        component: 'ButtonInteractiveComponent',
        name: 'Button Interactive',
      },
    ],
  },
  {
    path: 'calendar',
    children: [
      {
        path: 'calendar-bounding-month.component',
        link: '/calendar/calendar-bounding-month.component',
        component: 'CalendarBoundingMonthComponent',
        name: 'Calendar Bounding Month',
      },
      {
        path: 'calendar-custom-day-cell-showcase.component',
        link: '/calendar/calendar-custom-day-cell-showcase.component',
        component: 'CalendarCustomDayCellShowcaseComponent',
        name: 'Calendar Custom Day Cell Showcase',
      },
      {
        path: 'calendar-filter.component',
        link: '/calendar/calendar-filter.component',
        component: 'CalendarFilterComponent',
        name: 'Calendar Filter',
      },
      {
        path: 'calendar-min-max.component',
        link: '/calendar/calendar-min-max.component',
        component: 'CalendarMinMaxComponent',
        name: 'Calendar Min Max',
      },
      {
        path: 'calendar-range-showcase.component',
        link: '/calendar/calendar-range-showcase.component',
        component: 'CalendarRangeShowcaseComponent',
        name: 'Calendar Range Showcase',
      },
      {
        path: 'calendar-showcase.component',
        link: '/calendar/calendar-showcase.component',
        component: 'CalendarShowcaseComponent',
        name: 'Calendar Showcase',
      },
      {
        path: 'calendar-size.component',
        link: '/calendar/calendar-size.component',
        component: 'CalendarSizeComponent',
        name: 'Calendar Size',
      },
      {
        path: 'calendar-start-view.component',
        link: '/calendar/calendar-start-view.component',
        component: 'CalendarStartViewComponent',
        name: 'Calendar Start View',
      },
      {
        path: 'calendar-without-header.component',
        link: '/calendar/calendar-without-header.component',
        component: 'CalendarWithoutHeaderComponent',
        name: 'Calendar Without Header',
      },
      {
        path: 'calendar-week-number.component',
        link: '/calendar/calendar-week-number.component',
        component: 'CalendarWeekNumberComponent',
        name: 'Calendar Week Number',
      },
    ],
  },
  {
    path: 'calendar-kit',
    children: [
      {
        path: 'calendar-kit-full-calendar.component',
        link: '/calendar-kit/calendar-kit-full-calendar.component',
        component: 'CalendarKitFullCalendarShowcaseComponent',
        name: 'Calendar Kit Full Calendar Showcase',
      },
    ],
  },
  {
    path: 'card',
    children: [
      {
        path: 'card-accents.component',
        link: '/card/card-accents.component',
        component: 'CardAccentsComponent',
        name: 'Card Accents',
      },
      {
        path: 'card-colors.component',
        link: '/card/card-colors.component',
        component: 'CardColorsComponent',
        name: 'Card Colors',
      },
      {
        path: 'card-full.component',
        link: '/card/card-full.component',
        component: 'CardFullComponent',
        name: 'Card Full',
      },
      {
        path: 'card-showcase.component',
        link: '/card/card-showcase.component',
        component: 'CardShowcaseComponent',
        name: 'Card Showcase',
      },
      {
        path: 'card-sizes.component',
        link: '/card/card-sizes.component',
        component: 'CardSizesComponent',
        name: 'Card Sizes',
      },
      {
        path: 'card-test.component',
        link: '/card/card-test.component',
        component: 'CardTestComponent',
        name: 'Card Test',
      },
      {
        path: 'card-without-body.component',
        link: '/card/card-without-body.component',
        component: 'CardWithoutBodyComponent',
        name: 'Card Without Body',
      },
      {
        path: 'card-sizes-combinations.component',
        link: '/card/card-sizes-combinations.component',
        component: 'CardSizesCombinationsComponent',
        name: 'Card Sizes Combinations',
      },
    ],
  },
  {
    path: 'chat',
    children: [
      {
        path: 'chat-colors.component',
        link: '/chat/chat-colors.component',
        component: 'ChatColorsComponent',
        name: 'Chat Colors',
      },
      {
        path: 'chat-conversation-showcase.component',
        link: '/chat/chat-conversation-showcase.component',
        component: 'ChatConversationShowcaseComponent',
        name: 'Chat Conversation Showcase',
      },
      {
        path: 'chat-drop.component',
        link: '/chat/chat-drop.component',
        component: 'ChatDropComponent',
        name: 'Chat Drop',
      },
      {
        path: 'chat-message-types-showcase.component',
        link: '/chat/chat-message-types-showcase.component',
        component: 'ChatMessageTypesShowcaseComponent',
        name: 'Chat Message Types Showcase',
      },
      {
        path: 'chat-showcase.component',
        link: '/chat/chat-showcase.component',
        component: 'ChatShowcaseComponent',
        name: 'Chat Showcase',
      },
      {
        path: 'chat-sizes.component',
        link: '/chat/chat-sizes.component',
        component: 'ChatSizesComponent',
        name: 'Chat Sizes',
      },
      {
        path: 'chat-test.component',
        link: '/chat/chat-test.component',
        component: 'ChatTestComponent',
        name: 'Chat Test',
      },
    ],
  },
  {
    path: 'checkbox',
    children: [
      {
        path: 'checkbox-disabled.component',
        link: '/checkbox/checkbox-disabled.component',
        component: 'CheckboxDisabledComponent',
        name: 'Checkbox Disabled',
      },
      {
        path: 'checkbox-showcase.component',
        link: '/checkbox/checkbox-showcase.component',
        component: 'CheckboxShowcaseComponent',
        name: 'Checkbox Showcase',
      },
      {
        path: 'checkbox-status.component',
        link: '/checkbox/checkbox-status.component',
        component: 'CheckboxStatusComponent',
        name: 'Checkbox Status',
      },
      {
        path: 'checkbox-test.component',
        link: '/checkbox/checkbox-test.component',
        component: 'CheckboxTestComponent',
        name: 'Checkbox Test',
      },
      {
        path: 'checkbox-indeterminate.component',
        link: '/checkbox/checkbox-indeterminate.component',
        component: 'CheckboxIndeterminateComponent',
        name: 'Checkbox Indeterminate',
      },
    ],
  },
  {
    path: 'datepicker',
    children: [
      {
        path: 'datepicker-forms.component',
        link: '/datepicker/datepicker-forms.component',
        component: 'DatepickerFormsComponent',
        name: 'Datepicker Forms',
      },
      {
        path: 'datepicker-showcase.component',
        link: '/datepicker/datepicker-showcase.component',
        component: 'DatepickerShowcaseComponent',
        name: 'Datepicker Showcase',
      },
      {
        path: 'datepicker-validation.component',
        link: '/datepicker/datepicker-validation.component',
        component: 'DatepickerValidationComponent',
        name: 'Datepicker Validation',
      },
      {
        path: 'rangepicker-showcase.component',
        link: '/datepicker/rangepicker-showcase.component',
        component: 'RangepickerShowcaseComponent',
        name: 'Rangepicker Showcase',
      },
    ],
  },
  {
    path: 'dialog',
    children: [
      {
        path: 'dialog-auto-focus.component',
        link: '/dialog/dialog-auto-focus.component',
        component: 'DialogAutoFocusComponent',
        name: 'Dialog Auto Focus',
      },
      {
        path: 'dialog-backdrop-click.component',
        link: '/dialog/dialog-backdrop-click.component',
        component: 'DialogBackdropClickComponent',
        name: 'Dialog Backdrop Click',
      },
      {
        path: 'dialog-esc.component',
        link: '/dialog/dialog-esc.component',
        component: 'DialogEscComponent',
        name: 'Dialog Esc',
      },
      {
        path: 'dialog-has-backdrop.component',
        link: '/dialog/dialog-has-backdrop.component',
        component: 'DialogHasBackdropComponent',
        name: 'Dialog Has Backdrop',
      },
      {
        path: 'dialog-result.component',
        link: '/dialog/dialog-result.component',
        component: 'DialogResultComponent',
        name: 'Dialog Result',
      },
      {
        path: 'dialog-scroll.component',
        link: '/dialog/dialog-scroll.component',
        component: 'DialogScrollComponent',
        name: 'Dialog Scroll',
      },
      {
        path: 'dialog-showcase.component',
        link: '/dialog/dialog-showcase.component',
        component: 'DialogShowcaseComponent',
        name: 'Dialog Showcase',
      },
      {
        path: 'dialog-template.component',
        link: '/dialog/dialog-template.component',
        component: 'DialogTemplateComponent',
        name: 'Dialog Template',
      },
    ],
  },
  {
    path: 'flip-card',
    children: [
      {
        path: 'flip-card-accents.component',
        link: '/flip-card/flip-card-accents.component',
        component: 'FlipCardAccentsComponent',
        name: 'Flip Card Accents',
      },
      {
        path: 'flip-card-colors.component',
        link: '/flip-card/flip-card-colors.component',
        component: 'FlipCardColorsComponent',
        name: 'Flip Card Colors',
      },
      {
        path: 'flip-card-full.component',
        link: '/flip-card/flip-card-full.component',
        component: 'FlipCardFullComponent',
        name: 'Flip Card Full',
      },
      {
        path: 'flip-card-showcase.component',
        link: '/flip-card/flip-card-showcase.component',
        component: 'FlipCardShowcaseComponent',
        name: 'Flip Card Showcase',
      },
      {
        path: 'flip-card-sizes.component',
        link: '/flip-card/flip-card-sizes.component',
        component: 'FlipCardSizesComponent',
        name: 'Flip Card Sizes',
      },
    ],
  },
  {
    path: 'infinite-list',
    children: [
      {
        path: 'infinite-list-placeholders.component',
        link: '/infinite-list/infinite-list-placeholders.component',
        component: 'InfiniteListPlaceholdersComponent',
        name: 'Infinite List Placeholders',
      },
      {
        path: 'infinite-list-scroll-modes.component',
        link: '/infinite-list/infinite-list-scroll-modes.component',
        component: 'InfiniteListScrollModesComponent',
        name: 'Infinite List Scroll Modes',
      },
      {
        path: 'infinite-list-showcase.component',
        link: '/infinite-list/infinite-list-showcase.component',
        component: 'InfiniteListShowcaseComponent',
        name: 'Infinite List Showcase',
      },
      {
        path: 'infinite-news-list.component',
        link: '/infinite-list/infinite-news-list.component',
        component: 'InfiniteNewsListComponent',
        name: 'Infinite News List',
      },
    ],
  },
  {
    path: 'input',
    children: [
      {
        path: 'input-colors.component',
        link: '/input/input-colors.component',
        component: 'InputColorsComponent',
        name: 'Input Colors',
      },
      {
        path: 'input-full-width.component',
        link: '/input/input-full-width.component',
        component: 'InputFullWidthComponent',
        name: 'Input Full Width',
      },
      {
        path: 'input-shapes.component',
        link: '/input/input-shapes.component',
        component: 'InputShapesComponent',
        name: 'Input Shapes',
      },
      {
        path: 'input-showcase.component',
        link: '/input/input-showcase.component',
        component: 'InputsShowcaseComponent',
        name: 'Inputs Showcase',
      },
      {
        path: 'input-sizes.component',
        link: '/input/input-sizes.component',
        component: 'InputSizesComponent',
        name: 'Input Sizes',
      },
      {
        path: 'input-types.component',
        link: '/input/input-types.component',
        component: 'InputTypesComponent',
        name: 'Input Types',
      },
      {
        path: 'input-form.component',
        link: '/input/input-form.component',
        component: 'InputFormComponent',
        name: 'Input Form',
      },
    ],
  },
  {
    path: 'list',
    children: [
      {
        path: 'simple-list-showcase.component',
        link: '/list/simple-list-showcase.component',
        component: 'SimpleListShowcaseComponent',
        name: 'Simple List Showcase',
      },
      {
        path: 'users-list-showcase.component',
        link: '/list/users-list-showcase.component',
        component: 'UsersListShowcaseComponent',
        name: 'Users List Showcase',
      },
    ],
  },
  {
    path: 'menu',
    children: [
      {
        path: 'menu-children.component',
        link: '/menu/menu-children.component',
        component: 'MenuChildrenComponent',
        name: 'Menu Children',
      },
      {
        path: 'menu-showcase.component',
        link: '/menu/menu-showcase.component',
        component: 'MenuShowcaseComponent',
        name: 'Menu Showcase',
      },
      {
        path: 'menu-autocollapse.component',
        link: '/menu/menu-autocollapse.component',
        component: 'MenuAutoCollapseComponent',
        name: 'Menu Auto Collapse',
      },
      {
        path: 'menu-link-params.component',
        link: '/menu/menu-link-params.component',
        component: 'MenuLinkParamsComponent',
        name: 'Menu Link Params',
      },
      {
        path: 'menu-service.component',
        link: '/menu/menu-service.component',
        component: 'MenuServiceComponent',
        name: 'Menu Service',
        children: [
          {
            path: '2',
            link: '/menu/menu-service.component/2',
            component: 'MenuServiceItem2Component',
            name: 'Menu Service Item2',
          },
          {
            path: '3',
            link: '/menu/menu-service.component/3',
            component: 'MenuServiceItem3Component',
            name: 'Menu Service Item3',
            children: [
              {
                path: '1',
                link: '/menu/menu-service.component/3/1',
                component: 'MenuServiceItem31Component',
                name: 'Menu Service Item31',
              },
              {
                path: '2',
                link: '/menu/menu-service.component/3/2',
                component: 'MenuServiceItem32Component',
                name: 'Menu Service Item32',
              },
              {
                path: '3',
                link: '/menu/menu-service.component/3/3',
                component: 'MenuServiceItem33Component',
                name: 'Menu Service Item33',
                children: [
                  {
                    path: '1',
                    link: '/menu/menu-service.component/3/3/1',
                    component: 'MenuServiceItem331Component',
                    name: 'Menu Service Item331',
                  },
                  {
                    path: '2',
                    link: '/menu/menu-service.component/3/3/2',
                    component: 'MenuServiceItem332Component',
                    name: 'Menu Service Item332',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'overlay',
    children: [
      {
        path: 'overlay-showcase.component',
        link: '/overlay/overlay-showcase.component',
        component: 'OverlayShowcaseComponent',
        name: 'Overlay Showcase',
      },
    ],
  },
  {
    path: 'popover',
    children: [
      {
        path: 'popover-custom-component.component',
        link: '/popover/popover-custom-component.component',
        component: 'PopoverCustomComponentComponent',
        name: 'Popover Custom Component',
      },
      {
        path: 'popover-modes.component',
        link: '/popover/popover-modes.component',
        component: 'PopoverModesComponent',
        name: 'Popover Modes',
      },
      {
        path: 'popover-placements.component',
        link: '/popover/popover-placements.component',
        component: 'PopoverPlacementsComponent',
        name: 'Popover Placements',
      },
      {
        path: 'popover-showcase.component',
        link: '/popover/popover-showcase.component',
        component: 'PopoverShowcaseComponent',
        name: 'Popover Showcase',
      },
      {
        path: 'popover-template-ref.component',
        link: '/popover/popover-template-ref.component',
        component: 'PopoverTemplateRefComponent',
        name: 'Popover Template Ref',
      },
      {
        path: 'popover-test.component',
        link: '/popover/popover-test.component',
        component: 'PopoverTestComponent',
        name: 'Popover Test',
      },
      {
        path: 'popover-noop.component',
        link: '/popover/popover-noop.component',
        component: 'PopoverNoopComponent',
        name: 'Popover Noop',
      },
      {
        path: 'popover-dynamic.component',
        link: '/popover/popover-dynamic.component',
        component: 'PopoverDynamicComponent',
        name: 'Popover Dynamic',
      },
      {
        path: 'popover-dynamic-code.component',
        link: '/popover/popover-dynamic-code.component',
        component: 'PopoverDynamicCodeComponent',
        name: 'Popover Dynamic Code',
      },
    ],
  },
  {
    path: 'progress-bar',
    children: [
      {
        path: 'progress-bar-interactive.component',
        link: '/progress-bar/progress-bar-interactive.component',
        component: 'ProgressBarInteractiveComponent',
        name: 'Progress Bar Interactive',
      },
      {
        path: 'progress-bar-showcase.component',
        link: '/progress-bar/progress-bar-showcase.component',
        component: 'ProgressBarShowcaseComponent',
        name: 'Progress Bar Showcase',
      },
      {
        path: 'progress-bar-size.component',
        link: '/progress-bar/progress-bar-size.component',
        component: 'ProgressBarSizeComponent',
        name: 'Progress Bar Size',
      },
      {
        path: 'progress-bar-status.component',
        link: '/progress-bar/progress-bar-status.component',
        component: 'ProgressBarStatusComponent',
        name: 'Progress Bar Status',
      },
      {
        path: 'progress-bar-value.component',
        link: '/progress-bar/progress-bar-value.component',
        component: 'ProgressBarValueComponent',
        name: 'Progress Bar Value',
      },
    ],
  },
  {
    path: 'radio',
    children: [
      {
        path: 'radio-disabled.component',
        link: '/radio/radio-disabled.component',
        component: 'RadioDisabledComponent',
        name: 'Radio Disabled',
      },
      {
        path: 'radio-showcase.component',
        link: '/radio/radio-showcase.component',
        component: 'RadioShowcaseComponent',
        name: 'Radio Showcase',
      },
      {
        path: 'radio-statuses.component',
        link: '/radio/radio-statuses.component',
        component: 'RadioStatusesComponent',
        name: 'Radio Statuses',
      },
      {
        path: 'radio-disabled-group.component',
        link: '/radio/radio-disabled-group.component',
        component: 'RadioDisabledGroupComponent',
        name: 'Radio Disabled Group',
      },
    ],
  },
  {
    path: 'reveal-card',
    children: [
      {
        path: 'reveal-card-accents.component',
        link: '/reveal-card/reveal-card-accents.component',
        component: 'RevealCardAccentsComponent',
        name: 'Reveal Card Accents',
      },
      {
        path: 'reveal-card-colors.component',
        link: '/reveal-card/reveal-card-colors.component',
        component: 'RevealCardColorsComponent',
        name: 'Reveal Card Colors',
      },
      {
        path: 'reveal-card-full.component',
        link: '/reveal-card/reveal-card-full.component',
        component: 'RevealCardFullComponent',
        name: 'Reveal Card Full',
      },
      {
        path: 'reveal-card-showcase.component',
        link: '/reveal-card/reveal-card-showcase.component',
        component: 'RevealCardShowcaseComponent',
        name: 'Reveal Card Showcase',
      },
      {
        path: 'reveal-card-sizes.component',
        link: '/reveal-card/reveal-card-sizes.component',
        component: 'RevealCardSizesComponent',
        name: 'Reveal Card Sizes',
      },
    ],
  },
  {
    path: 'select',
    children: [
      {
        path: 'select-clean.component',
        link: '/select/select-clean.component',
        component: 'SelectCleanComponent',
        name: 'Select Clean',
      },
      {
        path: 'select-disabled.component',
        link: '/select/select-disabled.component',
        component: 'SelectDisabledComponent',
        name: 'Select Disabled',
      },
      {
        path: 'select-form.component',
        link: '/select/select-form.component',
        component: 'SelectFormComponent',
        name: 'Select Form',
      },
      {
        path: 'select-groups.component',
        link: '/select/select-groups.component',
        component: 'SelectGroupsComponent',
        name: 'Select Groups',
      },
      {
        path: 'select-hero.component',
        link: '/select/select-hero.component',
        component: 'SelectHeroComponent',
        name: 'Select Hero',
      },
      {
        path: 'select-label.component',
        link: '/select/select-label.component',
        component: 'SelectLabelShowcaseComponent',
        name: 'Select Label Showcase',
      },
      {
        path: 'select-multiple.component',
        link: '/select/select-multiple.component',
        component: 'SelectMultipleComponent',
        name: 'Select Multiple',
      },
      {
        path: 'select-filled.component',
        link: '/select/select-filled.component',
        component: 'SelectFilledComponent',
        name: 'Select Filled',
      },
      {
        path: 'select-placeholder.component',
        link: '/select/select-placeholder.component',
        component: 'SelectPlaceholderComponent',
        name: 'Select Placeholder',
      },
      {
        path: 'select-shapes.component',
        link: '/select/select-shapes.component',
        component: 'SelectShapeComponent',
        name: 'Select Shape',
      },
      {
        path: 'select-showcase.component',
        link: '/select/select-showcase.component',
        component: 'SelectShowcaseComponent',
        name: 'Select Showcase',
      },
      {
        path: 'select-sizes.component',
        link: '/select/select-sizes.component',
        component: 'SelectSizesComponent',
        name: 'Select Sizes',
      },
      {
        path: 'select-status.component',
        link: '/select/select-status.component',
        component: 'SelectStatusComponent',
        name: 'Select Status',
      },
      {
        path: 'select-interactive.component',
        link: '/select/select-interactive.component',
        component: 'SelectInteractiveComponent',
        name: 'Select Interactive',
      },
      {
        path: 'select-test.component',
        link: '/select/select-test.component',
        component: 'SelectTestComponent',
        name: 'Select Test',
      },
    ],
  },
  {
    path: 'spinner',
    children: [
      {
        path: 'spinner-button.component',
        link: '/spinner/spinner-button.component',
        component: 'SpinnerButtonComponent',
        name: 'Spinner Button',
      },
      {
        path: 'spinner-card.component',
        link: '/spinner/spinner-card.component',
        component: 'SpinnerCardComponent',
        name: 'Spinner Card',
      },
      {
        path: 'spinner-colors.component',
        link: '/spinner/spinner-colors.component',
        component: 'SpinnerColorsComponent',
        name: 'Spinner Colors',
      },
      {
        path: 'spinner-sizes.component',
        link: '/spinner/spinner-sizes.component',
        component: 'SpinnerSizesComponent',
        name: 'Spinner Sizes',
      },
      {
        path: 'spinner-tabs.component',
        link: '/spinner/spinner-tabs.component',
        component: 'SpinnerTabsComponent',
        name: 'Spinner Tabs',
      },
    ],
  },
  {
    path: 'stepper',
    children: [
      {
        path: 'stepper-showcase.component',
        link: '/stepper/stepper-showcase.component',
        component: 'StepperShowcaseComponent',
        name: 'Stepper Showcase',
      },
      {
        path: 'stepper-test.component',
        link: '/stepper/stepper-test.component',
        component: 'StepperTestComponent',
        name: 'Stepper Test',
      },
      {
        path: 'stepper-validation.component',
        link: '/stepper/stepper-validation.component',
        component: 'StepperValidationComponent',
        name: 'Stepper Validation',
      },
      {
        path: 'stepper-vertical.component',
        link: '/stepper/stepper-vertical.component',
        component: 'StepperVerticalComponent',
        name: 'Stepper Vertical',
      },
      {
        path: 'stepper-disabled-step-nav.component',
        link: '/stepper/stepper-disabled-step-nav.component',
        component: 'StepperDisabledStepNavComponent',
        name: 'Stepper Disabled Step Nav',
      },
      {
        path: 'stepper-linear.component',
        link: '/stepper/stepper-linear.component',
        component: 'StepperLinearComponent',
        name: 'Stepper Linear',
      },
    ],
  },
  {
    path: 'tabset',
    children: [
      {
        path: 'route-tabset-showcase.component',
        link: '/tabset/route-tabset-showcase.component',
        component: 'RouteTabsetShowcaseComponent',
        name: 'Route Tabset Showcase',
        children: [
          {
            path: 'tab1',
            link: '/tabset/route-tabset-showcase.component/tab1',
            component: 'RouteTabsetShowcaseChild1Component',
            name: 'Route Tabset Showcase Child1',
          },
          {
            path: 'tab2',
            link: '/tabset/route-tabset-showcase.component/tab2',
            component: 'RouteTabsetShowcaseChild2Component',
            name: 'Route Tabset Showcase Child2',
          },
        ],
      },
      {
        path: 'tabset-badge.component',
        link: '/tabset/tabset-badge.component',
        component: 'TabsetBadgeComponent',
        name: 'Tabset Badge',
      },
      {
        path: 'tabset-icon.component',
        link: '/tabset/tabset-icon.component',
        component: 'TabsetIconComponent',
        name: 'Tabset Icon',
      },
      {
        path: 'tabset-showcase.component',
        link: '/tabset/tabset-showcase.component',
        component: 'TabsetShowcaseComponent',
        name: 'Tabset Showcase',
      },
      {
        path: 'tabset-test.component',
        link: '/tabset/tabset-test.component',
        component: 'TabsetTestComponent',
        name: 'Tabset Test',
      },
      {
        path: 'tabset-test.component/:tab',
        link: '/tabset/tabset-test.component/:tab',
        component: 'TabsetTestComponent',
        name: 'Tabset Test',
      },
      {
        path: 'tabset-width.component',
        link: '/tabset/tabset-width.component',
        component: 'TabsetWidthComponent',
        name: 'Tabset Width',
      },
      {
        path: 'tabset-disabled.component',
        link: '/tabset/tabset-disabled.component',
        component: 'TabsetDisabledComponent',
        name: 'Tabset Disabled',
      },
    ],
  },
  {
    path: 'toastr',
    children: [
      {
        path: 'toastr-destroy-by-click.component',
        link: '/toastr/toastr-destroy-by-click.component',
        component: 'ToastrDestroyByClickComponent',
        name: 'Toastr Destroy By Click',
      },
      {
        path: 'toastr-duration.component',
        link: '/toastr/toastr-duration.component',
        component: 'ToastrDurationComponent',
        name: 'Toastr Duration',
      },
      {
        path: 'toastr-icon.component',
        link: '/toastr/toastr-icon.component',
        component: 'ToastrIconComponent',
        name: 'Toastr Icon',
      },
      {
        path: 'toastr-positions.component',
        link: '/toastr/toastr-positions.component',
        component: 'ToastrPositionsComponent',
        name: 'Toastr Positions',
      },
      {
        path: 'toastr-prevent-duplicates.component',
        link: '/toastr/toastr-prevent-duplicates.component',
        component: 'ToastrPreventDuplicatesComponent',
        name: 'Toastr Prevent Duplicates',
      },
      {
        path: 'toastr-prevent-duplicates-behaviour.component',
        link: '/toastr/toastr-prevent-duplicates-behaviour.component',
        component: 'ToastrPreventDuplicatesBehaviourComponent',
        name: 'Toastr Prevent Duplicates Behaviour',
      },
      {
        path: 'toastr-showcase.component',
        link: '/toastr/toastr-showcase.component',
        component: 'ToastrShowcaseComponent',
        name: 'Toastr Showcase',
      },
      {
        path: 'toastr-statuses.component',
        link: '/toastr/toastr-statuses.component',
        component: 'ToastrStatusesComponent',
        name: 'Toastr Statuses',
      },
      {
        path: 'toastr-limit.component',
        link: '/toastr/toastr-limit.component',
        component: 'ToastrLimitComponent',
        name: 'Toastr Limit',
      },
    ],
  },
  {
    path: 'tooltip',
    children: [
      {
        path: 'tooltip-colors.component',
        link: '/tooltip/tooltip-colors.component',
        component: 'TooltipColorsComponent',
        name: 'Tooltip Colors',
      },
      {
        path: 'tooltip-placements.component',
        link: '/tooltip/tooltip-placements.component',
        component: 'TooltipPlacementsComponent',
        name: 'Tooltip Placements',
      },
      {
        path: 'tooltip-showcase.component',
        link: '/tooltip/tooltip-showcase.component',
        component: 'TooltipShowcaseComponent',
        name: 'Tooltip Showcase',
      },
      {
        path: 'tooltip-with-icon.component',
        link: '/tooltip/tooltip-with-icon.component',
        component: 'TooltipWithIconComponent',
        name: 'Tooltip With Icon',
      },
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: 'user-showcase.component',
        link: '/user/user-showcase.component',
        component: 'UserShowcaseComponent',
        name: 'User Showcase',
      },
      {
        path: 'user-sizes.component',
        link: '/user/user-sizes.component',
        component: 'UserSizesComponent',
        name: 'User Sizes',
      },
      {
        path: 'user-avatar-settings.component',
        link: '/user/user-avatar-settings.component',
        component: 'UserAvatarSettingsComponent',
        name: 'User Avatar Settings',
      },
      {
        path: 'user-hide-captions.component',
        link: '/user/user-hide-captions.component',
        component: 'UserHideCaptionsComponent',
        name: 'User Hide Captions',
      },
      {
        path: 'user-shape.component',
        link: '/user/user-shape.component',
        component: 'NbUserShapeComponent',
        name: 'Nb User Shape',
      },
    ],
  },
  {
    path: 'window',
    children: [
      {
        path: 'template-window.component',
        link: '/window/template-window.component',
        component: 'TemplateWindowComponent',
        name: 'Template Window',
      },
      {
        path: 'window-showcase.component',
        link: '/window/window-showcase.component',
        component: 'WindowShowcaseComponent',
        name: 'Window Showcase',
      },
      {
        path: 'windows-backdrop.component',
        link: '/window/windows-backdrop.component',
        component: 'WindowsBackdropComponent',
        name: 'Windows Backdrop',
      },
    ],
  },
  {
    path: 'oauth2',
    children: [
      {
        path: 'callback',
        link: '/oauth2/callback',
        component: 'OAuth2CallbackComponent',
        name: 'OAuth2Callback',
      },
    ],
  },
  {
    path: 'oauth2-password',
  },
  {
    path: 'tree-grid',
    children: [
      {
        path: 'tree-grid-showcase.component',
        link: '/tree-grid/tree-grid-showcase.component',
        component: 'TreeGridShowcaseComponent',
        name: 'Tree Grid Showcase',
      },
      {
        path: 'tree-grid-sortable.component',
        link: '/tree-grid/tree-grid-sortable.component',
        component: 'TreeGridSortableComponent',
        name: 'Tree Grid Sortable',
      },
      {
        path: 'tree-grid-filterable.component',
        link: '/tree-grid/tree-grid-filterable.component',
        component: 'TreeGridFilterableComponent',
        name: 'Tree Grid Filterable',
      },
      {
        path: 'tree-grid-basic.component',
        link: '/tree-grid/tree-grid-basic.component',
        component: 'TreeGridBasicComponent',
        name: 'Tree Grid Basic',
      },
      {
        path: 'tree-grid-responsive.component',
        link: '/tree-grid/tree-grid-responsive.component',
        component: 'TreeGridResponsiveComponent',
        name: 'Tree Grid Responsive',
      },
      {
        path: 'tree-grid-custom-icons.component',
        link: '/tree-grid/tree-grid-custom-icons.component',
        component: 'TreeGridCustomIconsComponent',
        name: 'Tree Grid Custom Icons',
      },
      {
        path: 'tree-grid-disable-click-toggle.component',
        link: '/tree-grid/tree-grid-disable-click-toggle.component',
        component: 'TreeGridDisableClickToggleComponent',
        name: 'Tree Grid Disable Click Toggle',
      },
      {
        path: 'tree-grid-custom-node-structure.component',
        link: '/tree-grid/tree-grid-custom-node-structure.component',
        component: 'TreeGridCustomNodeStructureComponent',
        name: 'Tree Grid Custom Node Structure',
      },
    ],
  },
  {
    path: 'icon',
    children: [
      {
        path: 'icon-showcase.component',
        link: '/icon/icon-showcase.component',
        component: 'IconShowcaseComponent',
        name: 'Icon Showcase',
      },
      {
        path: 'icon-colors.component',
        link: '/icon/icon-colors.component',
        component: 'IconColorsComponent',
        name: 'Icon Colors',
      },
    ],
  },
  {
    path: 'toggle',
    children: [
      {
        path: 'toggle-disabled.component',
        link: '/toggle/toggle-disabled.component',
        component: 'ToggleDisabledComponent',
        name: 'Toggle Disabled',
      },
      {
        path: 'toggle-showcase.component',
        link: '/toggle/toggle-showcase.component',
        component: 'ToggleShowcaseComponent',
        name: 'Toggle Showcase',
      },
      {
        path: 'toggle-status.component',
        link: '/toggle/toggle-status.component',
        component: 'ToggleStatusComponent',
        name: 'Toggle Status',
      },
      {
        path: 'toggle-test.component',
        link: '/toggle/toggle-test.component',
        component: 'ToggleTestComponent',
        name: 'Toggle Test',
      },
      {
        path: 'toggle-label-position.component',
        link: '/toggle/toggle-label-position.component',
        component: 'ToggleLabelPositionComponent',
        name: 'Toggle Label Position',
      },
      {
        path: 'toggle-form.component',
        link: '/toggle/toggle-form.component',
        component: 'ToggleFormComponent',
        name: 'Toggle Form',
      },
    ],
  },
  {
    path: 'context-menu',
    children: [
      {
        path: 'context-menu-click.component',
        link: '/context-menu/context-menu-click.component',
        component: 'ContextMenuClickComponent',
        name: 'Context Menu Click',
      },
      {
        path: 'context-menu-showcase.component',
        link: '/context-menu/context-menu-showcase.component',
        component: 'ContextMenuShowcaseComponent',
        name: 'Context Menu Showcase',
      },
      {
        path: 'context-menu-test.component',
        link: '/context-menu/context-menu-test.component',
        component: 'ContextMenuTestComponent',
        name: 'Context Menu Test',
      },
      {
        path: 'context-menu-modes.component',
        link: '/context-menu/context-menu-modes.component',
        component: 'ContextMenuModesComponent',
        name: 'Context Menu Modes',
      },
      {
        path: 'context-menu-noop.component',
        link: '/context-menu/context-menu-noop.component',
        component: 'ContextMenuNoopComponent',
        name: 'Context Menu Noop',
      },
      {
        path: 'context-menu-right-click.component',
        link: '/context-menu/context-menu-right-click.component',
        component: 'ContextMenuRightClickComponent',
        name: 'Context Menu Right Click',
      },
    ],
  },
  {
    path: 'layout',
    children: [
      {
        path: 'layout-column-left.component',
        link: '/layout/layout-column-left.component',
        component: 'LayoutColumnLeftComponent',
        name: 'Layout Column Left',
      },
      {
        path: 'layout-fixed-header.component',
        link: '/layout/layout-fixed-header.component',
        component: 'LayoutFixedHeaderComponent',
        name: 'Layout Fixed Header',
      },
      {
        path: 'layout-footer-test.component',
        link: '/layout/layout-footer-test.component',
        component: 'LayoutFooterTestComponent',
        name: 'Layout Footer Test',
      },
      {
        path: 'layout-header-test.component',
        link: '/layout/layout-header-test.component',
        component: 'LayoutHeaderTestComponent',
        name: 'Layout Header Test',
      },
      {
        path: 'layout-showcase.component',
        link: '/layout/layout-showcase.component',
        component: 'LayoutShowcaseComponent',
        name: 'Layout Showcase',
      },
      {
        path: 'layout-sidebar-subheader.component',
        link: '/layout/layout-sidebar-subheader.component',
        component: 'LayoutSidebarSubheaderComponent',
        name: 'Layout Sidebar Subheader',
      },
      {
        path: 'layout-subheader.component',
        link: '/layout/layout-subheader.component',
        component: 'LayoutSubheaderComponent',
        name: 'Layout Subheader',
      },
      {
        path: 'layout-test.component',
        link: '/layout/layout-test.component',
        component: 'LayoutTestComponent',
        name: 'Layout Test',
      },
      {
        path: 'layout-w-footer.component',
        link: '/layout/layout-w-footer.component',
        component: 'LayoutWFooterComponent',
        name: 'Layout WFooter',
      },
      {
        path: 'theme-breakpoint-test.component',
        link: '/layout/theme-breakpoint-test.component',
        component: 'ThemeBreakpointTestComponent',
        name: 'Theme Breakpoint Test',
      },
      {
        path: 'theme-change-test.component',
        link: '/layout/theme-change-test.component',
        component: 'ThemeChangeTestComponent',
        name: 'Theme Change Test',
      },
    ],
  },
  {
    path: 'scroll',
    children: [
      {
        path: 'scroll-window.component',
        link: '/scroll/scroll-window.component',
        component: 'ScrollWindowComponent',
        name: 'Scroll Window',
      },
    ],
  },
  {
    path: 'search',
    children: [
      {
        path: 'search-customized-test.component',
        link: '/search/search-customized-test.component',
        component: 'SearchCustomizedTestComponent',
        name: 'Search Customized Test',
      },
      {
        path: 'search-event.component',
        link: '/search/search-event.component',
        component: 'SearchEventComponent',
        name: 'Search Event',
      },
      {
        path: 'search-showcase.component',
        link: '/search/search-showcase.component',
        component: 'SearchShowcaseComponent',
        name: 'Search Showcase',
      },
      {
        path: 'search-test.component',
        link: '/search/search-test.component',
        component: 'SearchTestComponent',
        name: 'Search Test',
      },
      {
        path: 'search-with-input-event.component',
        link: '/search/search-with-input-event.component',
        component: 'SearchWithInputEventComponent',
        name: 'Search With Input Event',
      },
    ],
  },
  {
    path: 'sidebar',
    children: [
      {
        path: 'sidebar-compacted.component',
        link: '/sidebar/sidebar-compacted.component',
        component: 'SidebarCompactedComponent',
        name: 'Sidebar Compacted',
      },
      {
        path: 'sidebar-fixed.component',
        link: '/sidebar/sidebar-fixed.component',
        component: 'SidebarFixedComponent',
        name: 'Sidebar Fixed',
      },
      {
        path: 'sidebar-one-test.component',
        link: '/sidebar/sidebar-one-test.component',
        component: 'SidebarOneTestComponent',
        name: 'Sidebar One Test',
      },
      {
        path: 'sidebar-right.component',
        link: '/sidebar/sidebar-right.component',
        component: 'SidebarRightComponent',
        name: 'Sidebar Right',
      },
      {
        path: 'sidebar-showcase.component',
        link: '/sidebar/sidebar-showcase.component',
        component: 'SidebarShowcaseComponent',
        name: 'Sidebar Showcase',
      },
      {
        path: 'sidebar-test.component',
        link: '/sidebar/sidebar-test.component',
        component: 'SidebarTestComponent',
        name: 'Sidebar Test',
      },
      {
        path: 'sidebar-three-test.component',
        link: '/sidebar/sidebar-three-test.component',
        component: 'SidebarThreeTestComponent',
        name: 'Sidebar Three Test',
      },
      {
        path: 'sidebar-toggle.component',
        link: '/sidebar/sidebar-toggle.component',
        component: 'SidebarToggleComponent',
        name: 'Sidebar Toggle',
      },
      {
        path: 'sidebar-two-test.component',
        link: '/sidebar/sidebar-two-test.component',
        component: 'SidebarTwoTestComponent',
        name: 'Sidebar Two Test',
      },
    ],
  },
  {
    path: 'menu',
    children: [
      {
        path: 'menu-test.component',
        link: '/menu/menu-test.component',
        component: 'MenuTestComponent',
        name: 'Menu Test',
        children: [
          {
            path: '1',
            link: '/menu/menu-test.component/1',
            component: 'MenuItem1Component',
            name: 'Menu Item1',
          },
          {
            path: '2',
            link: '/menu/menu-test.component/2',
            component: 'MenuItem2Component',
            name: 'Menu Item2',
          },
          {
            path: '12',
            link: '/menu/menu-test.component/12',
            component: 'MenuItem1Component',
            name: 'Menu Item1',
          },
          {
            path: '3',
            link: '/menu/menu-test.component/3',
            component: 'MenuItem3Component',
            name: 'Menu Item3',
            children: [
              {
                path: '1',
                link: '/menu/menu-test.component/3/1',
                component: 'MenuItem31Component',
                name: 'Menu Item31',
              },
              {
                path: '2',
                link: '/menu/menu-test.component/3/2',
                component: 'MenuItem32Component',
                name: 'Menu Item32',
              },
              {
                path: '3',
                link: '/menu/menu-test.component/3/3',
                component: 'MenuItem33Component',
                name: 'Menu Item33',
                children: [
                  {
                    path: '1',
                    link: '/menu/menu-test.component/3/3/1',
                    component: 'MenuItem331Component',
                    name: 'Menu Item331',
                  },
                  {
                    path: '2',
                    link: '/menu/menu-test.component/3/3/2',
                    component: 'MenuItem332Component',
                    name: 'Menu Item332',
                  },
                ],
              },
            ],
          },
          {
            path: '4',
            link: '/menu/menu-test.component/4',
            component: 'MenuItem4Component',
            name: 'Menu Item4',
          },
        ],
      },
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: 'user-test.component',
        link: '/user/user-test.component',
        component: 'UserTestComponent',
        name: 'User Test',
      },
    ],
  },
  {
    path: 'azure',
    children: [
      {
        path: 'callback',
        link: '/azure/callback',
        component: 'AzureCallbackComponent',
        name: 'Azure Callback',
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        link: '/auth/login',
        component: 'NbLoginComponent',
        name: 'Nb Login',
      },
      {
        path: 'register',
        link: '/auth/register',
        component: 'NbRegisterComponent',
        name: 'Nb Register',
      },
      {
        path: 'logout',
        link: '/auth/logout',
        component: 'NbLogoutComponent',
        name: 'Nb Logout',
      },
      {
        path: 'request-password',
        link: '/auth/request-password',
        component: 'NbRequestPasswordComponent',
        name: 'Nb Request Password',
      },
      {
        path: 'reset-password',
        link: '/auth/reset-password',
        component: 'NbResetPasswordComponent',
        name: 'Nb Reset Password',
      },
      {
        path: 'acl/acl-test.component',
        link: '/auth/acl/acl-test.component',
        component: 'AclTestComponent',
        name: 'Acl Test',
      },
      {
        path: 'auth-guard.service',
        link: '/auth/auth-guard.service',
        component: 'AuthPlaygroundComponent',
        name: 'Auth Playground',
      },
      {
        path: 'api-calls.component',
        link: '/auth/api-calls.component',
        component: 'PlaygroundApiCallsComponent',
        name: 'Playground Api Calls',
      },
    ],
  },
  {
    path: 'smart-home',
    children: [
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            link: '/smart-home/auth/login',
            component: 'LoginComponent',
            name: 'Login',
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
        link: '/bootstrap/bootstrap-test.component',
        component: 'BootstrapTestComponent',
        name: 'Bootstrap Test',
      },
    ],
  },
];
