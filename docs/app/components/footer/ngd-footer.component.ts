import { Component } from '@angular/core';

@Component({
  selector: 'ngd-footer',
  styleUrls: ['ngd-footer.component.scss'],
  template: `
      <div class="socio">
        <a href="https://github.com/akveo/ng2-admin" target="_blank" class="socicon socicon-github"></a>
        <a href="https://twitter.com/akveo_inc" target="_blank" class="socicon socicon-twitter"></a>
        <a href="https://www.facebook.com/akveo" target="_blank" class="socicon socicon-facebook"></a>
      </div>
      <p>
        © 2015-2017 Akveo LLC<br>
        Documentation licensed under CC BY 4.0.
      </p>
      <p>
        Powered by <b>Angular</b>
      </p>
  `,

})
export class NgdFooterComponent {
}
