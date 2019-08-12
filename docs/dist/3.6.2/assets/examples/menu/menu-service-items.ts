export const MENU_ITEMS = [
  {
    title: 'Home',
    link: '/example/menu/menu-service.component',
    icon: 'nb-home',
    home: true,
  },
  {
    title: 'User account',
    link: '/example/menu/menu-service.component/2',
    icon: 'nb-person',
  },
  {
    title: 'Shop',
    icon: 'nb-e-commerce',
    expanded: true,
    children: [
      {
        title: 'Services',
        link: '/example/menu/menu-service.component/3/1',
        icon: 'nb-gear',
      },
      {
        title: 'Hardware',
        link: '/example/menu/menu-service.component/3/2',
        icon: 'nb-lightbulb',
      },
      {
        title: 'Software',
        icon: 'nb-grid-a-outline',
        expanded: true,
        children: [
          {
            title: 'Open Source',
            link: '/example/menu/menu-service.component/3/3/1',
            icon: 'nb-grid-b',
          },
          {
            title: 'Commercial',
            link: '/example/menu/menu-service.component/3/3/2',
            icon: 'nb-grid-b-outline',
            queryParams: {param: 2},
            fragment: 'fragment',
          },
        ],
      },
    ],
  },
];
