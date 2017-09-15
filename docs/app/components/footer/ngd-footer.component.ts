import { Component } from '@angular/core';

@Component({
  selector: 'ngd-footer',
  styleUrls: ['ngd-footer.component.scss'],
  template: `
    <div class="footer-inner">
      <p>
        © 2015-2017 Akveo LLC<br>
        Documentation licensed under CC BY 4.0.
      </p>
    </div>
  `,

})
export class NgdFooterComponent {
}
