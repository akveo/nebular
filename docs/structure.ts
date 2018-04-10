export const STRUCTURE = [
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
    name: 'Installation',
    children: [
      {
        type: 'page',
        name: 'Based on starter kit (ngx-admin)',
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
    ],
  },
  {
    type: 'section',
    name: 'Concepts',
    children: [
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
        name: 'UI Kit',
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
    ],
  },
  {
    type: 'section',
    name: 'ngx-admin tutorials',
    children: [
      {
        type: 'page',
        name: 'Updating ngx-admin to the latest version',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'ngx-admin-update.md',
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
        name: 'Enabling Theme System',
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
        name: 'Component Theme Variables',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'component-theme-variables.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Server Deployment',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'server-deployment.md',
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
    ],
  },
  {
    type: 'section',
    name: 'Components',
    children: [
      {
        type: 'page',
        name: 'Layout',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbLayoutComponent',
              'NbLayoutHeaderComponent',
              'NbLayoutColumnComponent',
              'NbLayoutFooterComponent',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Sidebar',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbSidebarComponent',
              'NbSidebarHeaderComponent',
              'NbSidebarFooterComponent',
              'NbSidebarService',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Menu',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbMenuComponent',
              'NbMenuItem',
              'NbMenuService',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Card',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbCardComponent',
              'NbCardHeaderComponent',
              'NbCardBodyComponent',
              'NbCardFooterComponent',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Flip Card',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbFlipCardComponent',
              'NbCardFrontComponent',
              'NbCardBackComponent',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Reveal Card',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbRevealCardComponent',
              'NbCardFrontComponent',
              'NbCardBackComponent',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Search',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbSearchComponent',
              'NbSearchService',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Tabs',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbTabsetComponent',
              'NbTabComponent',
              'NbRouteTabsetComponent',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Actions',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbActionsComponent',
              'NbActionComponent',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'User (Avatar)',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbUserComponent',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Checkbox',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbCheckboxComponent',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Badge',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbBadgeComponent',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Popover',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbPopoverDirective',
              'NbPopoverComponent',
            ],
          },
        ],
      },
      {
        type: 'page',
        name: 'Context Menu',
        children: [
          {
            type: 'block',
            block: 'tabbed',
            source: [
              'NbContextMenuDirective',
              'NbContextMenuComponent',
            ],
          },
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
        name: 'NbDefaultAuthStrategy',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbDefaultAuthStrategy',
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
