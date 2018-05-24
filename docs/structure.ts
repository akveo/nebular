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
        name: 'Components overview',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'concept-ui-kit.md',
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
        type: 'tabs',
        name: 'Layout',
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
        source: [
          'NbMenuComponent',
          'NbMenuItem',
          'NbMenuService',
        ],
      },
      {
        type: 'tabs',
        name: 'Card',
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
        source: [
          'NbFlipCardComponent',
          'NbCardFrontComponent',
          'NbCardBackComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Reveal Card',
        source: [
          'NbRevealCardComponent',
          'NbCardFrontComponent',
          'NbCardBackComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Search',
        source: [
          'NbSearchComponent',
          'NbSearchService',
        ],
      },
      {
        type: 'tabs',
        name: 'Tabs',
        source: [
          'NbTabsetComponent',
          'NbTabComponent',
          'NbRouteTabsetComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Actions',
        source: [
          'NbActionsComponent',
          'NbActionComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'User (Avatar)',
        source: [
          'NbUserComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Checkbox',
        source: [
          'NbCheckboxComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Badge',
        source: [
          'NbBadgeComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Popover',
        source: [
          'NbPopoverDirective',
          'NbPopoverComponent',
        ],
      },
      {
        type: 'tabs',
        name: 'Context Menu',
        source: [
          'NbContextMenuDirective',
          'NbContextMenuComponent',
        ],
      },
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
        name: 'SpinnerService',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbSpinnerService',
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
