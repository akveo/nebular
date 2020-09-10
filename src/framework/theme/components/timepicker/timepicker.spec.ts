/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbTimePickerComponent } from '@nebular/theme/components/timepicker/timepicker.component';
import { NbThemeModule } from '@nebular/theme/theme.module';
import { NB_TIME_PICKER_CONFIG } from '@nebular/theme';
import { NbTimepickerModule } from '@nebular/theme/components/timepicker/timepicker.module';


describe('NbTimePickerComponent', () => {
  let timePicker: NbTimePickerComponent<Date>;
  let fixture: ComponentFixture<NbTimePickerComponent<Date>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NbTimepickerModule, NbThemeModule.forRoot() ],
      providers: [NbTimePickerComponent, {provide: NB_TIME_PICKER_CONFIG, useValue: {}}],
    });

    fixture = TestBed.createComponent<NbTimePickerComponent<Date>>(NbTimePickerComponent);
    timePicker = fixture.componentInstance;
  });

  it('should set correct time format', () => {
    timePicker.twelveHoursFormat = false;
    expect(timePicker.buildTimeFormat()).toEqual('HH:mm');
  });

  it('should set twelve hours format', () => {
    timePicker.twelveHoursFormat = true;
    timePicker.withSeconds = true;
    expect(timePicker.buildTimeFormat()).toEqual('hh:mm:ss a');
  });
});
