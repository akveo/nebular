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
            block: 'component',
            source: 'NbLayoutComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbLayoutHeaderComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbLayoutColumnComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbLayoutFooterComponent',
          },

        ],
      },
      {
        type: 'page',
        name: 'Sidebar',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbSidebarComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbSidebarHeaderComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbSidebarFooterComponent',
            name: 'true',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbSidebarService',
          },
        ],
      },
      {
        type: 'page',
        name: 'Menu',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbMenuComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbMenuItem',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbMenuService',
          },
        ],
      },
      {
        type: 'page',
        name: 'Card',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbCardComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbCardHeaderComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbCardBodyComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbCardFooterComponent',
          },
        ],
      },
      {
        type: 'page',
        name: 'Flip Card',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbFlipCardComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbCardFrontComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbCardBackComponent',
          },
        ],
      },
      {
        type: 'page',
        name: 'Reveal Card',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbRevealCardComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbCardFrontComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbCardBackComponent',
          },
        ],
      },
      {
        type: 'page',
        name: 'Search',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbSearchComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbSearchService',
          },
        ],
      },
      {
        type: 'page',
        name: 'Tabs',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbTabsetComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbTabComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbRouteTabsetComponent',
          },
        ],
      },
      {
        type: 'page',
        name: 'Actions',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbActionsComponent',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbActionComponent',
          },
        ],
      },
      {
        type: 'page',
        name: 'User (Avatar)',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbUserComponent',
          },
        ],
      },
      {
        type: 'page',
        name: 'Checkbox',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbCheckboxComponent',
          },
        ],
      },
      {
        type: 'page',
        name: 'Badge',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbBadgeComponent',
          },
        ],
      },
      {
        type: 'page',
        name: 'Popover',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbPopoverDirective',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbPopoverComponent',
          },
        ],
      },
      {
        type: 'page',
        name: 'Context Menu',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbContextMenuDirective',
          },
          {
            type: 'block',
            block: 'component',
            source: 'NbContextMenuComponent',
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
        name: 'Configuring a provider',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'auth-provider.md',
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
        name: 'NbEmailPassAuthProvider',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'NbEmailPassAuthProvider',
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
];
