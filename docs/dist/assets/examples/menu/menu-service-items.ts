export const MENU_ITEMS = [
  {
    title: 'Home',
    link: '/example/menu/menu-service.component',
    icon: 'home-outline',
    home: true,
  },
  {
    title: 'User account',
    link: '/example/menu/menu-service.component/2',
    icon: 'person-outline',
  },
  {
    title: 'Shop',
    icon: 'shopping-cart-outline',
    expanded: true,
    children: [
      {
        title: 'Services',
        link: '/example/menu/menu-service.component/3/1',
        icon: 'settings-outline',
      },
      {
        title: 'Hardware',
        link: '/example/menu/menu-service.component/3/2',
        icon: 'bulb-outline',
      },
      {
        title: 'Software',
        icon: 'grid-outline',
        expanded: true,
        children: [
          {
            title: 'Open Source',
            link: '/example/menu/menu-service.component/3/3/1',
            icon: 'grid-outline',
          },
          {
            title: 'Commercial',
            link: '/example/menu/menu-service.component/3/3/2',
            icon: 'grid-outline',
            queryParams: {param: 2},
            fragment: 'fragment',
          },
        ],
      },
    ],
  },
];
