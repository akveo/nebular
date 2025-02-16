/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { trees } from './trees-list';

@Component({
    templateUrl: './tag-appearance.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TagAppearanceComponent {
  trees = trees;
}
