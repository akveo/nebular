/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface MdChildren {
  fragment: string;
  html: string;
  source: string;
  title: string;
}

@Component({
  selector: 'ngd-md-block',
  template: `
    <nb-card *ngFor="let section of content;" [ngdFragment]="section.fragment">
      <nb-card-body>
        <div [innerHtml]="getTemplate(section.html)"></div>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdMdBLockComponent {
  @Input() content: MdChildren[] = []

  constructor(
    private cd: ChangeDetectorRef,
    private readonly domSanitizer: DomSanitizer) {
  }

  getTemplate(content: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }
}
