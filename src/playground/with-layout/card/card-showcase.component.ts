/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-card-showcase',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './card-showcase.component.html',
    standalone: false
})
export class CardShowcaseComponent {
}
