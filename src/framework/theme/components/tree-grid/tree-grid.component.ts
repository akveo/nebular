/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CdkTable } from '@angular/cdk/table';

import { NbTreeGridDataSourceInput } from './tree-grid-data-source';

@Component({
  selector: 'nb-tree-grid, table[nb-tree-grid]',
  template: `
    <ng-container headerRowOutlet></ng-container>
    <ng-container rowOutlet></ng-container>
    <ng-container footerRowOutlet></ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTreeGridComponent<T> extends CdkTable<T> {
  @Input() dataSource: NbTreeGridDataSourceInput<T>;
}
