
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-props-block',
  template: `
    <div  class="inputs block-container" *ngIf="classInputs.length > 0">
      <p class="block-title"><a [routerLink]="" fragment="{{className}}Inputs" ngdFragment></a> Inputs</p>
      <div class="table-container">
        <table  class="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Type</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let prop of classInputs">
              <td>{{ prop.name }}</td>
              <td><code>{{ prop.type }}</code></td>
              <td>
                 <div *ngIf="!!prop.shortDescription" ngdDescription>{{ prop.shortDescription }}</div>
                 <div *ngIf="!!prop.description" ngdDescription>{{ prop.description }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="outputs block-container" *ngIf="classOutputs.length > 0">
      <p class="block-title"><a [routerLink]="" fragment="{{className}}Outputs" ngdFragment></a> Outputs</p>
      <div class="table-container">
        <table  class="table">
          <thead>
           <tr>
             <td>Name</td>
             <td>Type</td>
             <td>Description</td>
           </tr>
          </thead>
          <tbody>
           <tr *ngFor="let prop of classOutputs">
             <td>{{ prop.name }}</td>
             <td><code>{{ prop.type }}</code></td>
             <td>
                <div *ngIf="!!prop.shortDescription" ngdDescription>{{ prop.shortDescription }}</div>
                <div *ngIf="!!prop.description" ngdDescription>{{ prop.description }}</div>
             </td>
           </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class NgdPropsBlockComponent {
  classOutputs: any = [];
  classInputs: any = [];
  className: string;

  @Input('blockData')
  set setProps(blockData: any) {
    this.classInputs = blockData.props.filter(item => item.kind === 'input');
    this.classOutputs = blockData.props.filter(item => item.kind === 'output');
    this.className = blockData.name;
  }

}
