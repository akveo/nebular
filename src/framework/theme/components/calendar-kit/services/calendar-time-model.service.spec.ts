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

  it('should return hours in day', () => {
    const twelveHours: string[] = timeModel.getHoursInDay(true);
    const hours: string[] = timeModel.getHoursInDay(false);

    expect(twelveHours).toEqual(['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
    expect(hours).toEqual(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
      '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']);
  });

  it('should return AM or PM token depend on time', () => {
    const date = new Date(2018, 7, 1, 14);
    const token = timeModel.getAmPm(date);
    expect(token).toEqual('PM');
  });

  it('should return true if time is am', () => {
    const date = new Date(2018, 7, 1, 9);
    const token = timeModel.getAmPm(date);
    expect(token).toBeTruthy();
  });

  it('should format number', () => {
    const token = timeModel.padd(5);
    expect(token).toEqual('05');
  });
});
