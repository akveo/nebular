/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nb-user-sizes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-sizes.component.html',
    standalone: false
})
export class UserSizesComponent {
}
