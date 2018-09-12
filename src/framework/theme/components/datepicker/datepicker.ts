/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class NbDatepicker<T> {
  abstract setValue(value: T): void;

  abstract getValue(): T;

  abstract onChange(): Observable<T>;

  abstract show(): void;

  abstract hide(): void;

  abstract attach(hostRef: ElementRef): void;
}

