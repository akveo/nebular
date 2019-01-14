/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';

export type NbTreeGridDataSourceInput<T> =
  DataSource<T> |
  Observable<ReadonlyArray<T> | T[]> |
  ReadonlyArray<T> | T[];
