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

  it('should return full hours', () => {
    const twelveHours: string[] = timeModel.getFullHours(true, 30);
    const hours: string[] = timeModel.getFullHours(false, 60);

    expect(twelveHours).toEqual(['12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM',
      '03:00 AM', '03:30 AM', '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM',
      '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
      '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM',
      '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM']);
    expect(hours).toEqual(['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00',
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
      '21:00', '22:00', '23:00']);
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
