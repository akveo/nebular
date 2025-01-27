import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'nb-custom-message-table',
  template: `
    <table>
      <thead>
        <tr>
          <th *ngFor="let column of columns">{{ column }}</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let row of rows">
          <td>{{ row.firstName }}</td>
          <td>{{ row.lastName }}</td>
          <td>{{ row.age }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./chat-custom-message-table.component.scss'],
  standalone: false,
})
export class ChatCustomMessageTableComponent {
  @Input() columns = [];

  @Input() rows = [];

  @Input()
  @HostBinding('class.reply')
  isReply: boolean;
}
