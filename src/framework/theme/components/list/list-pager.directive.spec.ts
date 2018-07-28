
import { Component, ViewChild, ElementRef } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { NbListModule } from './list.module';
import { NbListComponent } from './list.component';

function waitForSpyCall(spy: jasmine.Spy, checkInterval: number = 40, timeout: number = 500): Promise<any> {
  const intialCallsCount = spy.calls.count();

  return new Promise((resolve, reject) => {
    let intervalId;
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      reject();
    }, timeout);

    intervalId = setInterval(() => {
      if (spy.calls.count() > intialCallsCount) {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        resolve();
      }
    }, checkInterval);
  });
}

const CONTAINER_HEIGHT = 100;
const ELEMENT_HEIGHT = 100;
let initialListItemsCount = 0;

@Component({
  template: `
    <nb-list
      [nbListPager]="pageSize"
      [startPage]="startPage"
      (pageChange)="pageChanged($event)"
      class="list">
      <nb-list-item *ngFor="let _ of items" class="list-item"></nb-list-item>
    </nb-list>
  `,
  styles: [`
    .list {
      background: lightslategray;
      height: ${CONTAINER_HEIGHT}px;
      padding: 0 5px;
      overflow: auto;
    }
    .list-item {
      background: lightblue;
      height: ${ELEMENT_HEIGHT}px;
    }
  `],
})
class PagerTestComponent {
  @ViewChild(NbListComponent, { read: ElementRef }) listElementRef: ElementRef;

  get listElement(): Element {
    return this.listElementRef.nativeElement;
  }

  items = new Array(initialListItemsCount);
  pageSize = 1;
  startPage = 1;

  pageChanged() {}
}

let fixture: ComponentFixture<PagerTestComponent>;
let testComponent: PagerTestComponent;
let pageChangedSpy: jasmine.Spy;

describe('Directive: NbListPagerDirective', () => {

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

  describe('intial page', () => {

    describe('emty list', () => {
      it('should not emit initial page change when list is empty', async () => {
        try {
          await waitForSpyCall(pageChangedSpy);
          fail('Page change should not be emmited.');
        } catch {}

        expect(pageChangedSpy).not.toHaveBeenCalled();
      });

      it(`should emit initial page change when items added to empty list`, async () => {
        testComponent.items = new Array(10);
        fixture.detectChanges();

        try {
          await waitForSpyCall(pageChangedSpy);
        } catch {
          fail('Page change should be emmited.');
        }

        expect(pageChangedSpy).toHaveBeenCalledTimes(1);
        expect(pageChangedSpy).toHaveBeenCalledWith(1);
      });
    });

    describe('list with items', () => {
      beforeAll(() => initialListItemsCount = 10);

      it('should emit initial page change when list was filled initially', async () => {
        try {
          await waitForSpyCall(pageChangedSpy);
        } catch {
          fail('Page change should be emmited.');
        }

        expect(pageChangedSpy).toHaveBeenCalledTimes(1);
        expect(pageChangedSpy).toHaveBeenCalledWith(1);
      });

      afterAll(() => initialListItemsCount = 0);
    });
  });

  describe('page size 1', () => {

    it('should not emit page change when scrolling within one page', async () => {
      const { listElement } = testComponent;

      testComponent.items = new Array(10);
      fixture.detectChanges();
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch {}

      expect(pageChangedSpy).toHaveBeenCalledTimes(1);
      expect(pageChangedSpy).toHaveBeenCalledWith(1);
      // 'pageChanged' will be called once after list initialization, since list has items.
      // Reset to start counting from zero calls.
      pageChangedSpy.calls.reset();

      // Intersection observer in list pager configured to execute a callback to check page change
      // when element just started or stopped be visible at least on 50%.
      // So 0.49 is just before page change check will be called.
      const positionBeforePageTwo = ELEMENT_HEIGHT * 0.49;
      listElement.scrollTop = positionBeforePageTwo;
      fixture.detectChanges();
      let wasCalled;
      try {
        await waitForSpyCall(pageChangedSpy);
        wasCalled = true;
      } catch {
        // Expecting to throw because 'pageChanged' shouldn't be called since page wasn't changed.
        wasCalled = false;
      }

      expect(wasCalled).toBe(false);
      expect(pageChangedSpy).not.toHaveBeenCalled();
    });

    it('should emit page change when scrolling to another pages', async () => {
      const { listElement } = testComponent;

      testComponent.items = new Array(10);
      fixture.detectChanges();
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch {}
      expect(pageChangedSpy).toHaveBeenCalledTimes(1);
      expect(pageChangedSpy).toHaveBeenCalledWith(1);
      // 'pageChanged' will be called once, after list initialization.
      // Reset to start counting from zero calls.
      pageChangedSpy.calls.reset();

      const pageTwo = ELEMENT_HEIGHT;
      listElement.scrollTop = pageTwo;
      fixture.detectChanges();
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch {
        fail('Page should be changed.');
      }

      expect(pageChangedSpy).toHaveBeenCalledTimes(1);
      expect(pageChangedSpy).toHaveBeenCalledWith(2);

      const pageThree = ELEMENT_HEIGHT * 2;
      listElement.scrollTop = pageThree;
      fixture.detectChanges();
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch {
        fail('Page should be changed.');
      }

      expect(pageChangedSpy).toHaveBeenCalledTimes(2);
      expect(pageChangedSpy).toHaveBeenCalledWith(3);

      listElement.scrollTop = 0;
      fixture.detectChanges();
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch {
        fail('Page should be changed.');
      }

      expect(pageChangedSpy).toHaveBeenCalledTimes(3);
      expect(pageChangedSpy).toHaveBeenCalledWith(1);
    });

    it('should correctly calculate current page based on start page', async () => {
      const startPage = 10;
      const { listElement } = testComponent;

      testComponent.items = new Array(10);
      testComponent.startPage = startPage;
      fixture.detectChanges();
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch {
        fail('Page should be changed.');
      }

      expect(pageChangedSpy).toHaveBeenCalledTimes(1);
      expect(pageChangedSpy).toHaveBeenCalledWith(startPage);

      let nextPagePosition = ELEMENT_HEIGHT;
      listElement.scrollTop = nextPagePosition;
      let scrolledPages = 1;
      fixture.detectChanges();
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch {
        fail('Page should be changed.');
      }

      expect(pageChangedSpy).toHaveBeenCalledTimes(2);
      expect(pageChangedSpy).toHaveBeenCalledWith(startPage + scrolledPages);

      const skipPages = 5;
      nextPagePosition += ELEMENT_HEIGHT * skipPages;
      listElement.scrollTop = nextPagePosition;
      scrolledPages += skipPages;
      fixture.detectChanges();
      try {
        await waitForSpyCall(pageChangedSpy);
      } catch {
        fail('Page should be changed.');
      }

      expect(pageChangedSpy).toHaveBeenCalledTimes(3);
      expect(pageChangedSpy).toHaveBeenCalledWith(startPage + scrolledPages);
    });
  });
});
