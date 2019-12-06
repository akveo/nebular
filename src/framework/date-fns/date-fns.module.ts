/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';

import { NB_DATE_SERVICE_OPTIONS, NbDateService } from '@nebular/theme';
import { NbDateFnsOptions, NbDateFnsDateService } from './services/date-fns-date.service';

const dateFnsServiceProvider = { provide: NbDateService, useClass: NbDateFnsDateService };

@NgModule({
  providers: [ dateFnsServiceProvider ],
})
export class NbDateFnsDateModule {
  static forRoot(options: Partial<NbDateFnsOptions>): ModuleWithProviders<NbDateFnsDateModule> {
    return {
      ngModule: NbDateFnsDateModule,
      providers: [
        dateFnsServiceProvider,
        { provide: NB_DATE_SERVICE_OPTIONS, useValue: options },
      ],
    };
  }

  static forChild(options: Partial<NbDateFnsOptions>): ModuleWithProviders<NbDateFnsDateModule> {
    return {
      ngModule: NbDateFnsDateModule,
      providers: [
        dateFnsServiceProvider,
        { provide: NB_DATE_SERVICE_OPTIONS, useValue: options },
      ],
    };
  }
}
