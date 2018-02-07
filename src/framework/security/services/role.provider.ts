/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Observable } from 'rxjs/Observable';

export abstract class NbRoleProvider {
  abstract getRole(): Observable<string>;
}
