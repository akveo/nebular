import { async, inject, TestBed } from '@angular/core/testing';
import { NbCalendarModelFactoryServiceDeprecated } from './calendar-model-factory.service-deprecated';
import { NbCalendarModelFactoryService } from './calendar-model-factory.service';
import { NbDateTimeUtil } from './date-time-util';
import { NbNativeDateTimeUtilService } from './native-date-time-util.service';

const providers = [
  NbCalendarModelFactoryService,
  NbCalendarModelFactoryServiceDeprecated,
];

let calendarModelFactory: NbCalendarModelFactoryService<Date>;
let calendarModelFactoryOld: NbCalendarModelFactoryServiceDeprecated<Date>;

describe('calendar-model-factory-service', () => {

  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [
        ...providers,
        { provide: NbDateTimeUtil, useClass: NbNativeDateTimeUtilService },
      ],
    });
  });

  // Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    providers,
    (_calendarModelFactory, _calendarModelFactoryOld) => {
      calendarModelFactory = _calendarModelFactory;
      calendarModelFactoryOld = _calendarModelFactoryOld;
    },
  )));

  const expectEqualResultForBothServices = context => {
    expect(JSON.stringify(calendarModelFactoryOld.createMonthModel(context)))
      .toBe(JSON.stringify(calendarModelFactory.createMonthModel(context)));
  };

  it('should create model with break in the start only', () => {
    expectEqualResultForBothServices(new Date(2018, 5, 15));
  });

  it('should create model with break in the end only', () => {
    expectEqualResultForBothServices(new Date(2018, 6, 15));
  });

  it('should create model with break in the middle', () => {
    expectEqualResultForBothServices(new Date(2018, 7, 15));
  });

  it('should create model with new year in the middle', () => {
    expectEqualResultForBothServices(new Date(2018, 11, 15));
  });
});
