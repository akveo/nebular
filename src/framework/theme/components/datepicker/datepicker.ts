/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';


export abstract class NbDatepicker<T> {
  abstract set value(value: T);

  abstract get value(): T;

  abstract get valueChange(): Observable<T>;

  abstract attach(hostRef: ElementRef);
}
