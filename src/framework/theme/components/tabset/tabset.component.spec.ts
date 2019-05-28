import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbTabComponent, NbTabsetComponent, NbTabsetModule } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';
import createSpy = jasmine.createSpy;

@Component({
  template: `
    <nb-tabset routeParam="tab">
      <nb-tab *ngIf="showTabs" tabTitle="1" route="1">1</nb-tab>
      <nb-tab *ngIf="showTabs" tabTitle="2" route="2">2</nb-tab>
      <nb-tab *ngIf="showTabs" tabTitle="3" route="3" disabled>3</nb-tab>
    </nb-tabset>
  `,
})
export class TabsetTestComponent {
  showTabs = true;

  @ViewChild(NbTabsetComponent, { static: false }) tabsetComponent: NbTabsetComponent;
  @ViewChildren(NbTabComponent) tabComponents: QueryList<NbTabComponent>;

  getDisabledTab(): NbTabComponent {
    return this.tabComponents.toArray()[2];
  }
}

export class ActivatedRouteStub {
  private subject = new BehaviorSubject<Params>(null);
  readonly params = this.subject.asObservable();

  constructor(params: Params = {}) {
    this.subject.next(params);
  }

  setParams(params?: Params) {
    this.subject.next(params);
  };
}

describe('NbTabsetComponent', () => {
  let fixture: ComponentFixture<TabsetTestComponent>;
  let testComponent: TabsetTestComponent;
  let tabsetComponent: NbTabsetComponent;
  let activatedRouteStub: ActivatedRouteStub;

  beforeEach(fakeAsync(() => {
    activatedRouteStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ TabsetTestComponent ],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([]),
        NbTabsetModule,
      ],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
    });

    fixture = TestBed.createComponent(TabsetTestComponent);
    testComponent = fixture.componentInstance;

    fixture.detectChanges();
    tick();

    tabsetComponent = testComponent.tabsetComponent;
  }));

  it('should mark tab as active if selected in route param', fakeAsync(() => {
    const selectTabSpy = spyOn(tabsetComponent, 'selectTab');
    const tabToSelect: NbTabComponent = testComponent.tabComponents.first;

    activatedRouteStub.setParams({ tab: tabToSelect.route });
    fixture.detectChanges();
    tick();

    expect(selectTabSpy).toHaveBeenCalledTimes(1);
    expect(selectTabSpy).toHaveBeenCalledWith(tabToSelect);
    expect(tabToSelect.active).toEqual(true);
  }));

  it('should not mark disabled tab as active if selected in route param', fakeAsync(() => {
    const changeTabSpy = createSpy('changeTabSpy');
    const disabledTab: NbTabComponent = testComponent.getDisabledTab();

    activatedRouteStub.setParams({ tab: disabledTab.route });
    fixture.detectChanges();
    tick();

    expect(changeTabSpy).not.toHaveBeenCalled();
    expect(disabledTab.active).toEqual(false);
  }));

  it(`should not call 'selectTab' if no tabs found`, fakeAsync(() => {
    const selectTabSpy = spyOn(tabsetComponent, 'selectTab');

    testComponent.showTabs = false;
    fixture.detectChanges();

    activatedRouteStub.setParams({ tab: 1 });
    fixture.detectChanges();
    tick();

    expect(selectTabSpy).not.toHaveBeenCalled();
  }));
});
