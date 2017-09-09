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
        name: 'From Scratch',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'install-from-scratch.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Based on Starter Kit',
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
        name: 'Themes',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'concept-themes.md',
          },
        ],
      },
      {
        type: 'page',
        name: 'Layouts',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'concept-layouts.md',
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
        ],
      },
      {
        type: 'page',
        name: 'Tabs',
        children: [
          {
            type: 'block',
            block: 'component',
            blockData: 'NbRouteTabsetComponent',
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbTabsetComponent',
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
        name: 'UserComponent',
        children: [
          {
            type: 'block',
            block: 'component',
            blockData: 'NbUserComponent',
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
        name: 'NbThemes',
        isSubpages: true,
        children: [
          {
            type: 'block',
            block: 'theme',
            name: 'default',
            blockData: 'default',
          },
          {
            type: 'block',
            block: 'theme',
            name: 'light',
            blockData: 'light',
          },
          {
            type: 'block',
            block: 'theme',
            name: 'cosmic',
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
        name: 'Concepts/Install',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'auth-concepts-install.md',
          },
        ],
      },
    ],
  },
];
