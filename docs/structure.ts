export const structure = [
  {
    type: 'section',
    name: 'Getting Started',
    children: [
      {
        type: 'page',
        name: 'What is Nebular?',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'index.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Where to start?',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'start.md',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Guides',
    children: [
      {
        type: 'page',
        name: 'Install based on starter kit',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'install-starter-kit.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Add into existing project',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'install-into-existing.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Theme System',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'concept-theme-system.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Enable Theme System',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'enabling-theme-system.md',
          },
        ],
      },
      {
        type: 'page',
        name: '3rd-party components',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'concept-3rd-party.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Backend integration',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'backend-integration.md',
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
            source: 'server-deployment.md',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Components',
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
        type: 'tabs',
        name: 'Layout',
        icon: 'layout.svg',
        source: [
          'NbLayoutComponent',
          'NbLayoutHeaderComponent',
          'NbLayoutColumnComponent',
          'NbLayoutFooterComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Sidebar',
        icon: 'sidebar.svg',
        source: [
          'NbSidebarComponent',
          'NbSidebarHeaderComponent',
          'NbSidebarFooterComponent',
          'NbSidebarService',
        ],
      },
      {
        type: 'tabs',
        name: 'Menu',
        icon: 'menu.svg',
        source: [
          'NbMenuComponent',
          'NbMenuItem',
          'NbMenuService',
        ],
      },
      {
        type: 'tabs',
        name: 'Card',
        icon: 'card.svg',
        source: [
          'NbCardComponent',
          'NbCardHeaderComponent',
          'NbCardBodyComponent',
          'NbCardFooterComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Flip Card',
        icon: 'flip.svg',
        source: [
          'NbFlipCardComponent',
          'NbCardFrontComponent',
          'NbCardBackComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Reveal Card',
        icon: 'reveal.svg',
        source: [
          'NbRevealCardComponent',
          'NbCardFrontComponent',
          'NbCardBackComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Alert',
        icon: 'alert.svg',
        source: [
          'NbAlertComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Search',
        icon: 'search.svg',
        source: [
          'NbSearchComponent',
          'NbSearchService',
        ],
      },
      {
        type: 'tabs',
        name: 'Tabs',
        icon: 'tab.svg',
        source: [
          'NbTabsetComponent',
          'NbTabComponent',
          'NbRouteTabsetComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Stepper',
        icon: 'stepper.svg',
        source: [
          'NbStepperComponent',
          'NbStepComponent',
        ]
      },
      {
        type: 'tabs',
        name: 'Chat UI',
        icon: 'chat-ui.svg',
        source: [
          'NbChatComponent',
          'NbChatMessageComponent',
          'NbChatFormComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Actions',
        icon: 'actions.svg',
        source: [
          'NbActionsComponent',
          'NbActionComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'User (Avatar)',
        icon: 'user.svg',
        source: [
          'NbUserComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Checkbox',
        icon: 'checkbox.svg',
        source: [
          'NbCheckboxComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Spinner',
        icon: 'spinner.svg',
        source: [
          'NbSpinnerDirective',
        ],
      },
      {
        type: 'tabs',
        name: 'Progress Bar',
        icon: 'progress-bar.svg',
        source: [
          'NbProgressBarComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Badge',
        icon: 'badge.svg',
        source: [
          'NbBadgeComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Popover',
        icon: 'popover.svg',
        source: [
          'NbPopoverDirective',
        ],
      },
      {
        type: 'tabs',
        name: 'Context Menu',
        icon: 'context-menu.svg',
        source: [
          'NbContextMenuDirective',
        ],
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
      // {
      //   type: 'tabs',
      //   name: 'Chips',
      //   icon: 'chips.svg',
      //   source: [],
      // },
      // {
      //   type: 'tabs',
      //   name: 'Button',
      //   icon: 'button.svg',
      //   source: [],
      // },
      // {
      //   type: 'tabs',
      //   name: 'Modal',
      //   icon: 'modal.svg',
      //   source: [],
      // },
    ],
  },
  {
    type: 'section',
    name: 'Services',
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
    ],
  },
  {
    type: 'section',
    name: 'Themes',
    children: [
      {
        type: 'page',
        name: 'Default',
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
        name: 'Cosmic',
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
        name: 'Corporate',
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
    name: 'Auth',
    children: [
      {
        type: 'page',
        name: 'Introduction',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'auth-intro.md',
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
            source: 'auth-install.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Configuring a Strategy',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'auth-strategy.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Configuring UI',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'auth-ui.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Getting User Token',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'auth-token.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Protecting application routes',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'auth-guard.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Configuring Google OAuth2',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'auth-oauth2.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'NbAuthService',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbAuthService',
          },
        ],
      },
      {
        type: 'page',
        name: 'NbPasswordAuthStrategy',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbPasswordAuthStrategy',
          },
        ],
      },
      {
        type: 'page',
        name: 'NbOAuth2AuthStrategy',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbOAuth2AuthStrategy',
          },
        ],
      },
      {
        type: 'page',
        name: 'NbDummyAuthStrategy',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbDummyAuthStrategy',
          },
        ],
      },
      {
        type: 'page',
        name: 'NbTokenService',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbTokenService',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbAuthSimpleToken',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbAuthJWTToken',
          },
        ],
      },
      {
        type: 'page',
        name: 'NbTokenLocalStorage',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbTokenLocalStorage',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Security',
    children: [
      {
        type: 'page',
        name: 'Introduction',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'security-intro.md',
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
            source: 'security-install.md',
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
            source: 'security-acl-configuration.md',
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
  {
    type: 'section',
    name: 'Usability',
    children: [
      {
        type: 'page',
        name: 'Right-to-left (RTL)',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'rtl.md',
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
];
