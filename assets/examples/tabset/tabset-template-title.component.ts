import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './tabset-template-title.component.html',
  styles: [
    `
      :host nb-tab {
        padding: 1.25rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsetTemplateTitleComponent {}
