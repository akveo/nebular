export const STRUCTURE = [
  {
    type: 'section',
    name: 'Getting Started',
    children: [
      {
        type: 'page',
        name: 'Installation',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'index.md'
          }
        ]
      },
      {
        type: 'page',
        name: 'Customization',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'customization.md'
          }
        ]
      },
      {
        type: 'page',
        name: 'Theme',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'theme.md'
          }
        ]
      }
    ],
  },
  {
    type: 'section',
    name: 'UI Components',
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
            name: 'true'
          },
          {
            type: 'block',
            block: 'component',
            blockData: 'NbSidebarService',
          }
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
          }
        ],
      }
    ],
  },
  {
    type: 'section',
    name: 'Services',
    children: [
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
      }
    ]
  }
];
