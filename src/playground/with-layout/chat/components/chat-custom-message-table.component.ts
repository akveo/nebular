import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-custom-message-table',
  template: `
    <table>
      <tr>
        <th>{{tableHeader?.column1}}</th>
        <th>{{tableHeader?.column2}}</th>
        <th>{{tableHeader?.column3}}</th>
      </tr>
      <tr>
        <td>Robert</td>
        <td>Baratheon</td>
        <td>46</td>
      </tr>
      <tr>
        <td>Jaime</td>
        <td>Lannister</td>
        <td>31</td>
      </tr>
    </table>
  `,
  styleUrls: ['./chat-custom-message-table.component.scss'],
})
export class ChatCustomMessageTableComponent {
  @Input() tableHeader: any;
}
