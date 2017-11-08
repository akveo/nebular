/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';
declare const Prism;

@Component({
  selector: 'ngd-examples-block',
  template: `
    <p class="block-title"><a [routerLink]="" fragment="{{className}}Examples" ngdFragment></a> {{ title }}</p>
    <div class="block-container" *ngFor="let example of classExamples">
      <p class="block-subtitle">{{example.shortDescription}}</p>
      <p ngdDescription>{{example.description}}</p>
      <ngd-code-highlighter [code]="example.code.trim()"></ngd-code-highlighter>
      <pre><code [innerHTML]="getContent(example.code)"></code></pre>
    </div>
`,
})
export class NgdExamplesBlockComponent {

  classExamples: any;
  className: string;

  @Input() title: any = 'Usage';
  @Input('blockData')
  set setProps(blockData: any) {
    this.classExamples = blockData.examples;
    this.className = blockData.name;
  }

  getContent(str) {
    return Prism.highlight(str.trim(), Prism.languages.jsx);
  }
}
