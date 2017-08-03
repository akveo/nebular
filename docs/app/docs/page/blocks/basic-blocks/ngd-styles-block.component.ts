/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, OnInit } from '@angular/core';
import { DocsService } from '../../../docs.service';

@Component({
  selector: 'ngd-styles-block',
  template: `
    <div class="block-container" *ngFor="let style of classStyles">
      <p class="block-title"><a [routerLink]="" fragment="{{className}}Styles" ngdFragment> <i class="ion-link"></i></a>Component themable styles</p>
      <table class="table">
        <thead>
          <tr>
            <td>Name</td>
            <td *ngFor="let themedValue of style.styles[0].themedValues">{{themedValue.theme}}</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of style.styles">
            <td>{{ item.name}}</td>
            <td *ngFor="let themedValue of item.themedValues" ngdSassValue>{{ themedValue.value }}</td>
            <td>
              <p *ngIf="item.shortDescription" ngdDescription>{{ item.shortDescription}}</p>
              <p *ngIf="item.description" ngdDescription>{{ item.description }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
`,
})
export class NgdStylesBlockComponent implements OnInit {

  classStyles: any;
  className: string;

  @Input('blockData')
  set setProps(blockData: any) {
    this.classStyles = blockData.styles;
    this.className = blockData.name;
  };

  constructor(private docsService: DocsService) {}

  ngOnInit() {
    this.classStyles = this.docsService.mapThemedValues(this.classStyles);
  }
}
