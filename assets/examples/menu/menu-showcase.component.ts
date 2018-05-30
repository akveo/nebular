import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-menu-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-showcase.component.html',
})
export class NbMenuShowcaseComponent {

  items = [
    {
      title: 'Profile',
      link: [],
    },
    {
      title: 'Change Password',
      link: [],
    },
    {
      title: 'Privacy Policy',
      link: [],
    },
    {
      title: 'Logout',
      link: [],
    },
  ];
}
