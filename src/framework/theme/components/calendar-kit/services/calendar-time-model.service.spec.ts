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

  it('should return minutes array', () => {
    const seconds: string[] = timeModel.getMinutesAndSeconds();

    expect(seconds).toEqual(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
      '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31',
      '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
      '51', '52', '53', '54', '55', '56', '57', '58', '59']);
  });

  it('should return formatted time', () => {
    const time: string = timeModel.getFormattedTime(
      new Date(1993, 3, 24, 8, 10), 'HH:mm:SS a');

    expect(time).toEqual('08:10:00 AM');
  });
});
