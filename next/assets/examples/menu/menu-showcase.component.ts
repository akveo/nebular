import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-menu-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-showcase.component.html',
})
export class MenuShowcaseComponent {

  items = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: [],
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
      link: [],
    },
    {
      title: 'Privacy Policy',
      icon: 'checkmark-outline',
      link: [],
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: [],
    },
  ];
}
