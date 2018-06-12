/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-methods-block',
  template: `
    <h3>Methods</h3>
    <table>
      <thead>
      <tr>
        <td width="25%">Name</td>
        <td>Description</td>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let method of methods">
        <ng-container *ngIf="method.shortDescription || method.description">
          <td>{{ method.name }}() <br><i *ngIf="method.isStatic">static method</i></td>
          <td>
            <div class="method-signature">
              <div *ngIf="method.params.length > 0">
                <i>parameters:</i>
                <span *ngFor="let param of method.params; let last = last">
                      {{ param.name }}: <code>{{ param.type }}</code><span *ngIf="!last">,</span>
                    </span>
              </div>
              <i>returns:</i>
              <code>{{ method.type.join(",\\n") }}</code>
            </div>
            <div *ngIf="method.shortDescription || method.description" class="method-description" ngdDescription>
              {{ method.shortDescription }} <br> {{ method.description }}
            </div>
          </td>
        </ng-container>
      </tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdMethodsBlockComponent {

  methods: any;

  @Input('source')
  set setSource(source: any) {
    this.methods = source.methods;
  };
}
