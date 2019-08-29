import { Component, ViewChild, ElementRef } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { NbListModule } from './list.module';
import { NbListComponent } from './list.component';

function waitForSpyCall(spy: jasmine.Spy, checkInterval: number = 40, timeout: number = 1000): Promise<any> {
  const initialCallsCount = spy.calls.count();

  return new Promise((resolve, reject) => {
    let intervalId;
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      reject();
    }, timeout);

    intervalId = setInterval(() => {
      if (spy.calls.count() > initialCallsCount) {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        resolve();
      }
    }, checkInterval);
  });
}

const ITEMS_PER_PAGE: number = 10;
const ITEM_HEIGHT: number = 100;
const LIST_HEIGHT: number = 500;
const PAGE_HEIGHT: number = ITEMS_PER_PAGE * ITEM_HEIGHT;
let initialItemsCount: number = 100;

@Component({
  template: `
    <nb-list
      nbListPageTracker
      [pageSize]="pageSize"
      [startPage]="startPage"
      (pageChange)="pageChanged($event)"
      class="list">
      <nb-list-item *ngFor="let _ of items" class="list-item"></nb-list-item>
    </nb-list>
  `,
  styles: [`
    .list {
      background: lightslategray;
      height: ${LIST_HEIGHT}px;
      padding: 0 5px;
      overflow: auto;
    }
    .list-item {
      background: lightblue;
      border: ${ITEM_HEIGHT * 0.01}px solid black;
      height: ${ITEM_HEIGHT * 0.98}px;
    }
  `],
})
class PagerTestComponent {
  @ViewChild(NbListComponent, { read: ElementRef, static: false }) listElementRef: ElementRef;

  get listElement(): Element {
    return this.listElementRef.nativeElement;
  }

  items = new Array(initialItemsCount);
  pageSize = ITEMS_PER_PAGE;
  startPage = 1;

  pageChanged() {}
}

let fixture: ComponentFixture<PagerTestComponent>;
let testComponent: PagerTestComponent;
let pageChangedSpy: jasmine.Spy;

describe('Directive: NbListPageTrackerDirective', () => {

  let initialTimeoutInterval;
  beforeAll(() => {
    initialTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
  });
  afterAll(() => jasmine.DEFAULT_TIMEOUT_INTERVAL = initialTimeoutInterval);

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
        imports: [ NbListModule ],
        declarations: [ PagerTestComponent ],
        providers: [ { provide: ComponentFixtureAutoDetect, useValue: true } ],
      })
      .createComponent(PagerTestComponent);

    testComponent = fixture.componentInstance;
    fixture.detectChanges();

    pageChangedSpy = spyOn(testComponent, 'pageChanged');
  });

  afterEach(fakeAsync(() => {
    fixture.destroy();
    tick();
    fixture.nativeElement.remove();
  }));

  describe('initial page', () => {

    it('should emit initial page change when list was prefilled', async () => {
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch {
        fail('Page change should be emmited');
      }

      expect(pageChangedSpy).toHaveBeenCalledTimes(1);
      expect(pageChangedSpy).toHaveBeenCalledWith(1);
    });

    describe('empty list', () => {

      let initialItemsCountBefore;
      beforeAll(() => {
        initialItemsCountBefore = initialItemsCount;
        initialItemsCount = 0;
      });
      afterAll(() => initialItemsCount = initialItemsCountBefore);

      it('should not emit initial page change when list is empty', async () => {
        try {
          await waitForSpyCall(pageChangedSpy);
          fail('Page change should not be emmited');
        } catch {}

        expect(pageChangedSpy).not.toHaveBeenCalled();
      });

      it(`should emit initial page change when items added to empty list`, async () => {
        testComponent.items = new Array(initialItemsCountBefore);
        fixture.detectChanges();
        try {
          await waitForSpyCall(pageChangedSpy);
        } catch {
          fail('Page change should be emmited');
        }

        expect(pageChangedSpy).toHaveBeenCalledTimes(1);
        expect(pageChangedSpy).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('start page', () => {

    let initialItemsCountBefore;
    beforeAll(() => {
      initialItemsCountBefore = initialItemsCount;
      initialItemsCount = 0;
    });
    afterAll(() => initialItemsCount = initialItemsCountBefore);

    it('should take into account start page when calculating current page', async () => {
      const startPage = 5;
      const { listElement } = testComponent;

      testComponent.items = new Array(initialItemsCountBefore);
      testComponent.startPage = startPage;
      fixture.detectChanges();
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch {
        fail('pageChanged should be called after adding new items to empty list');
      }
      expect(pageChangedSpy).toHaveBeenCalledTimes(1);
      expect(pageChangedSpy).toHaveBeenCalledWith(startPage);

      const numberOfPagesToScroll = [ 1, 5 ];
      let timesPageShouldBeChanged = 1;
      for (const nPagesToScroll of numberOfPagesToScroll) {
        listElement.scrollTop = PAGE_HEIGHT * nPagesToScroll;
        try {
          await waitForSpyCall(pageChangedSpy);
          timesPageShouldBeChanged++;
        } catch {
          fail(`pageChanged should be called after scrolling ${startPage + nPagesToScroll} pages down`);
        }

        expect(pageChangedSpy).toHaveBeenCalledTimes(timesPageShouldBeChanged);
        expect(pageChangedSpy).toHaveBeenCalledWith(startPage + nPagesToScroll);
      }
    });
  });

  describe(`page change`, () => {

    beforeEach(async () => {
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch {
        throw new Error('No initial page call');
      }
      // 'pageChanged' will be called once after list initialization, since list has items.
      // Reset to start counting from zero calls.
      pageChangedSpy.calls.reset();
    });

    it('should not emit page change when scrolling within current page', async () => {
      const { listElement } = testComponent;
      const positionBeforePageTwo = PAGE_HEIGHT - LIST_HEIGHT;
      listElement.scrollTop = positionBeforePageTwo;
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch { /* Expecting to throw because 'pageChanged' shouldn't be called since page wasn't changed. */ }

      expect(pageChangedSpy).not.toHaveBeenCalled();
    });

    it('should emit page change when scrolling to another pages', async () => {
      const { listElement } = testComponent;

      const startPage = 1;
      let timesPageShouldBeChanged = 0;
      const lastPage = initialItemsCount / ITEMS_PER_PAGE - 1;
      const numbersOfPagesToScroll = [ 1, 2, lastPage, 0 ];

      for (const pagesToScroll of numbersOfPagesToScroll) {
        listElement.scrollTop = PAGE_HEIGHT * pagesToScroll;
        try {
          await waitForSpyCall(pageChangedSpy);
          timesPageShouldBeChanged++;
        } catch {
          fail(`pageChanged should be called after scrolling to ${startPage + pagesToScroll} page`);
        }

        expect(pageChangedSpy).toHaveBeenCalledTimes(timesPageShouldBeChanged);
        expect(pageChangedSpy).toHaveBeenCalledWith(startPage + pagesToScroll);
      }
    });
  });
});
