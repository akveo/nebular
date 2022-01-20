export const structure = [
  {
    type: 'section',
    name: 'Início',
    children: [
      {
        type: 'page',
        name: 'O que é o Beast?',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'getting-started/what-is-beast.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Como começar?',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'getting-started/where-to-start.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Sobre',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'getting-started/about.md',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Guias',
    children: [
      {
        type: 'page',
        name: 'Install Nebular',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/install.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Install based on starter kit',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/install-starter-kit.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Create Nebular Page',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/create-page.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Register Icon Pack',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/custom-icons.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Server deployment',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'guides/server-deployment.md',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Design System',
    children: [
      {
        type: 'page',
        name: 'Eva Design System Intro',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/intro.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Design System Theme',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/theme.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Typography',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/typography.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Enable Customizable Theme',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/enable-customizable-theme.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Use Theme Variables',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/use-theme-variables.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Create Custom Theme',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/custom-theme.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Enable CSS Properties mode',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/css-properties.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Enable Multiple Runtime Themes',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/multiple-runtime-themes.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Changing Theme',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'design-system/theme-change.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Default Theme',
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'Default',
            source: 'default',
          },
        ],
      },
      {
        type: 'page',
        name: 'Dark Theme',
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'Dark',
            source: 'dark',
          },
        ],
      },
      {
        type: 'page',
        name: 'Cosmic Theme',
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'Cosmic',
            source: 'cosmic',
          },
        ],
      },
      {
        type: 'page',
        name: 'Corporate Theme',
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'Corporate',
            source: 'corporate',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Usabilidade',
    children: [
      {
        type: 'page',
        name: 'Right-to-left (RTL)',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'usability/rtl.md',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbLayoutDirectionService',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Componentes',
    children: [
      {
        type: 'page',
        name: 'Components Overview',
        children: [
          {
            type: 'block',
            block: 'components-overview',
          },
        ],
      },
      {
        type: 'group',
        name: 'Global',
      },
      {
        type: 'tabs',
        name: 'Layout',
        icon: 'layout.svg',
        source: [
          'NbLayoutComponent',
          'NbLayoutHeaderComponent',
          'NbLayoutColumnComponent',
          'NbLayoutFooterComponent',
          'NbLtrDirective',
          'NbRtlDirective',
        ],
      },
      {
        type: 'tabs',
        name: 'Card',
        icon: 'card.svg',
        source: ['NbCardComponent', 'NbCardHeaderComponent', 'NbCardBodyComponent', 'NbCardFooterComponent'],
      },
      {
        type: 'tabs',
        name: 'Flip Card',
        icon: 'flip.svg',
        source: ['NbFlipCardComponent', 'NbCardFrontComponent', 'NbCardBackComponent'],
      },
      {
        type: 'tabs',
        name: 'Reveal Card',
        icon: 'reveal.svg',
        source: ['NbRevealCardComponent', 'NbCardFrontComponent', 'NbCardBackComponent'],
      },
      {
        type: 'tabs',
        name: 'Stepper',
        icon: 'stepper.svg',
        source: ['NbStepperComponent', 'NbStepComponent'],
      },
      {
        type: 'tabs',
        name: 'Accordion',
        icon: 'accordion.svg',
        source: [
          'NbAccordionComponent',
          'NbAccordionItemComponent',
          'NbAccordionItemHeaderComponent',
          'NbAccordionItemBodyComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'List',
        icon: 'list.svg',
        source: ['NbListComponent', 'NbListItemComponent'],
      },
      {
        type: 'tabs',
        name: 'Infinite List',
        icon: 'infinite-scroll.svg',
        source: ['NbInfiniteListDirective', 'NbListPageTrackerDirective'],
      },
      {
        type: 'group',
        name: 'Navigation',
      },
      {
        type: 'tabs',
        name: 'Sidebar',
        icon: 'sidebar.svg',
        source: ['NbSidebarComponent', 'NbSidebarHeaderComponent', 'NbSidebarFooterComponent', 'NbSidebarService'],
      },
      {
        type: 'tabs',
        name: 'Menu',
        icon: 'menu.svg',
        source: ['NbMenuComponent', 'NbMenuItem', 'NbMenuService'],
      },
      {
        type: 'tabs',
        name: 'Tabs',
        icon: 'tab.svg',
        source: ['NbTabsetComponent', 'NbTabComponent', 'NbRouteTabsetComponent'],
      },
      {
        type: 'tabs',
        name: 'Actions',
        icon: 'actions.svg',
        source: ['NbActionsComponent', 'NbActionComponent'],
      },
      {
        type: 'group',
        name: 'Forms',
      },
      {
        type: 'tabs',
        name: 'Input',
        icon: 'input.svg',
        source: ['NbInputDirective'],
      },
      {
        type: 'tabs',
        name: 'Button',
        icon: 'button.svg',
        source: ['NbButtonComponent'],
      },
      {
        type: 'tabs',
        name: 'Button Group',
        icon: 'button-group.svg',
        source: ['NbButtonGroupComponent', 'NbButtonToggleDirective'],
      },
      {
        type: 'tabs',
        name: 'Checkbox',
        icon: 'checkbox.svg',
        source: ['NbCheckboxComponent'],
      },
      {
        type: 'tabs',
        name: 'Toggle',
        icon: 'toggle.svg',
        source: ['NbToggleComponent'],
      },
      {
        type: 'tabs',
        name: 'Radio',
        icon: 'radio.svg',
        source: ['NbRadioComponent', 'NbRadioGroupComponent'],
      },
      {
        type: 'tabs',
        name: 'Select',
        icon: 'select.svg',
        source: ['NbSelectComponent', 'NbOptionListComponent', 'NbOptionGroupComponent'],
      },
      {
        type: 'tabs',
        name: 'Autocomplete',
        icon: 'autocomplete.svg',
        source: [
          'NbAutocompleteDirective',
          'NbAutocompleteComponent',
          'NbOptionListComponent',
          'NbOptionGroupComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Datepicker',
        icon: 'datepicker.svg',
        source: [
          'NbDatepickerDirective',
          'NbDatepickerComponent',
          'NbRangepickerComponent',
          'NbDateTimePickerComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Timepicker',
        icon: 'timepicker.svg',
        source: ['NbTimePickerDirective', 'NbTimePickerComponent'],
      },
      {
        type: 'tabs',
        name: 'Tag',
        icon: 'tag.svg',
        source: ['NbTagListComponent', 'NbTagInputDirective', 'NbTagComponent'],
      },
      {
        type: 'group',
        name: 'Modals & Overlays',
      },
      {
        type: 'tabs',
        name: 'Popover',
        icon: 'popover.svg',
        source: ['NbPopoverDirective', 'NbPopoverComponent'],
      },
      {
        type: 'tabs',
        name: 'Context Menu',
        icon: 'context-menu.svg',
        source: ['NbContextMenuDirective'],
      },
      {
        type: 'tabs',
        name: 'Dialog',
        icon: 'dialog.svg',
        source: ['NbDialogService', 'NbDialogRef', 'NbDialogConfig'],
      },
      {
        type: 'tabs',
        name: 'Toastr',
        icon: 'toastr.svg',
        source: ['NbToastrService', 'NbToastComponent', 'NbToastrConfig'],
      },
      {
        type: 'tabs',
        name: 'Tooltip',
        icon: 'tooltip.svg',
        source: ['NbTooltipDirective', 'NbTooltipComponent'],
      },
      {
        type: 'tabs',
        name: 'Window',
        icon: 'collapsable.svg',
        source: ['NbWindowService', 'NbWindowRef', 'NbWindowConfig'],
      },
      {
        type: 'group',
        name: 'Extra',
      },
      {
        type: 'tabs',
        name: 'Global Search',
        icon: 'search.svg',
        source: ['NbSearchComponent', 'NbSearchService'],
      },
      {
        type: 'tabs',
        name: 'User (Avatar)',
        icon: 'user.svg',
        source: ['NbUserComponent'],
      },
      {
        type: 'tabs',
        name: 'Alert',
        icon: 'alert.svg',
        source: ['NbAlertComponent'],
      },
      {
        type: 'tabs',
        name: 'Icon',
        icon: 'icon.svg',
        source: ['NbIconComponent', 'NbIconLibraries'],
      },
      {
        type: 'tabs',
        name: 'Spinner',
        icon: 'spinner.svg',
        source: ['NbSpinnerDirective', 'NbSpinnerComponent'],
      },
      {
        type: 'tabs',
        name: 'Progress Bar',
        icon: 'progress-bar.svg',
        source: ['NbProgressBarComponent'],
      },
      {
        type: 'tabs',
        name: 'Badge',
        icon: 'badge.svg',
        source: ['NbBadgeComponent'],
      },
      {
        type: 'tabs',
        name: 'Chat UI',
        icon: 'chat-ui.svg',
        source: ['NbChatComponent', 'NbChatMessageComponent', 'NbChatFormComponent', 'NbChatCustomMessageDirective'],
      },
      {
        type: 'tabs',
        name: 'Calendar',
        icon: 'calendar.svg',
        source: ['NbCalendarComponent'],
      },
      {
        type: 'tabs',
        name: 'Calendar Range',
        icon: 'calendar.svg',
        source: ['NbCalendarRangeComponent'],
      },
      {
        type: 'group',
        name: 'CDK',
      },
      {
        type: 'tabs',
        name: 'Calendar Kit',
        icon: 'calendar.svg',
        source: ['NbCalendarKitModule'],
      },
      {
        type: 'group',
        name: 'Data Table',
      },
      {
        type: 'tabs',
        name: 'Tree Grid',
        icon: 'tree-grid.svg',
        source: [
          'NbTreeGridComponent',
          'NbTreeGridPresentationNode',
          'NbTreeGridSortService',
          'NbTreeGridFilterService',
          'NbTreeGridColumnDefDirective',
          'NbTreeGridRowDefDirective',
          'NbTreeGridRowComponent',
          'NbSortDirective',
          'NbSortHeaderComponent',
          'NbFilterInputDirective',
          'NbTreeGridRowToggleDirective',
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Serviços',
    children: [
      {
        type: 'page',
        name: 'ThemeService',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbThemeService',
          },
        ],
      },
      {
        type: 'page',
        name: 'MediaBreakpoints',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbMediaBreakpointsService',
          },
        ],
      },
      {
        type: 'page',
        name: 'JSThemesRegistry',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbJSThemesRegistry',
          },
        ],
      },
      {
        type: 'page',
        name: 'LayoutScrollService',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbLayoutScrollService',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbScrollPosition',
          },
        ],
      },
      {
        type: 'page',
        name: 'LayoutRulerService',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbLayoutRulerService',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbLayoutDimensions',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Segurança',
    children: [
      {
        type: 'page',
        name: 'Introduction',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'security/intro.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Installation',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'security/install.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'ACL Configuration & Usage',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'security/acl-configuration.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Multiple User Roles',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'security/multiple-roles.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'NbAclService',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbAclService',
          },
        ],
      },
      {
        type: 'page',
        name: 'NbAccessChecker',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbAccessChecker',
          },
        ],
      },
    ],
  },
];
