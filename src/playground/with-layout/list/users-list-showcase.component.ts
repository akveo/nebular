import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card size="small">
      <nb-list>
        <nb-list-item *ngFor="let user of users">
          <nb-user [name]="user.name" [title]="user.title"> </nb-user>
        </nb-list-item>
      </nb-list>
    </nb-card>
  `,
  styleUrls: ['./simple-list-showcase.component.scss'],
  standalone: false,
})
export class UsersListShowcaseComponent {
  users: { name: string; title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];
}
