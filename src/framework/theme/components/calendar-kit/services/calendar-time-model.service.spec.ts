  /**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';
import { NbDateService } from './date.service';
import { NbNativeDateService } from './native-date.service';
import { NbCalendarTimeModelService } from '@nebular/theme';

describe('time-model-service', () => {
  let timeModel: NbCalendarTimeModelService<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NbDateService, useClass: NbNativeDateService }, NbCalendarTimeModelService],
    });
  });

  beforeEach(async(inject(
    [NbCalendarTimeModelService],
    (_monthModel) => {
      timeModel = _monthModel;
    },
  )));

  it('should format number', () => {
    const token = timeModel.paddToTwoSymbols(5);
    expect(token).toEqual('05');
  });
});
