import { Component } from '@angular/core';

@Component({
  selector: 'nb-route-tabset-showcase',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-route-tabset [tabs]="tabs" fullWidth></nb-route-tabset>
      </nb-card-body>
    </nb-card>
  `,
})
export class RouteTabsetShowcaseComponent {
  tabs: any[] = [
    {
      title: 'Users',
      icon: 'nb-person',
      route: './tab1',
    },
    {
      title: 'Orders',
      icon: 'nb-notifications',
      responsive: true,
      route: [ './tab2' ],
    },
    {
      title: 'Transaction',
      icon: 'nb-notifications',
      responsive: true,
      disabled: true,
    },
  ];
}
