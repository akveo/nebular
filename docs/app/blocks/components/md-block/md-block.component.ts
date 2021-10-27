/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NgdMdSection } from '../../../@theme/services/text.service';

@Component({
  selector: 'ngd-md-block',
  template: `
    <nb-card *ngFor="let section of sections;" [ngdFragment]="section.fragment">
      <nb-card-body>
        <div [innerHtml]="getTemplate(section.html)"></div>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdMdBLockComponent {
  @Input() sections: NgdMdSection[] = []

  constructor(private readonly domSanitizer: DomSanitizer) {}

  getTemplate(content: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }
}
