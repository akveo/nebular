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
            blockData: 'NbLayoutComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbLayoutHeaderComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbLayoutColumnComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbLayoutFooterComponent',
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
            blockData: 'NbSidebarComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbSidebarHeaderComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbSidebarFooterComponent',
            name: 'true',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbSidebarService',
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
            blockData: 'NbMenuComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbMenuItem',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbMenuService',
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
            blockData: 'NbCardComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbCardHeaderComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbCardBodyComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbCardFooterComponent',
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
            blockData: 'NbSearchComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbSearchService',
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
            blockData: 'NbTabsetComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbTabComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbRouteTabsetComponent',
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
            blockData: 'NbActionsComponent',
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
            blockData: 'NbUserComponent',
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
            blockData: 'NbCheckboxComponent',
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
            blockData: 'NbThemeService',
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
            blockData: 'NbSpinnerService',
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
            blockData: 'NbMediaBreakpointsService',
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
            blockData: 'NbJSThemesRegistry',
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
            blockData: 'default',
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
            blockData: 'cosmic',
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
            blockData: 'NbAuthService',
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
            blockData: 'NbEmailPassAuthProvider',
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
            blockData: 'NbTokenService',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbAuthSimpleToken',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbAuthJWTToken',
          },
        ],
      },
    ],
  },
];
