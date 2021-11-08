import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbRestoreScrollTopHelper } from '@nebular/theme';

let restoreHelper: NbRestoreScrollTopHelper;
let router: Router;
let fixture: ComponentFixture<TestBootstrapComponent>;

@Component({ template: '<router-outlet></router-outlet>' })
class TestBootstrapComponent {}

@Component({ template: '' })
class TestComponent {}

describe('NbRestoreScrollTopHelper', () => {
  beforeEach(() => {
    TestBed.resetTestingModule();

    fixture = TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            children: [
              {
                path: '',
                component: TestComponent,
              },
              {
                path: 'about',
                component: TestComponent,
              },
            ],
          },
          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full',
          },
        ]),
      ],
      providers: [NbRestoreScrollTopHelper],
      declarations: [TestComponent, TestBootstrapComponent],
    }).createComponent(TestBootstrapComponent);

    fixture.detectChanges();
  });

  beforeEach(
    waitForAsync(
      inject([NbRestoreScrollTopHelper, Router], (_restoreHelper, _router) => {
        restoreHelper = _restoreHelper;
        router = _router;
      }),
    ),
  );

  afterEach(fakeAsync(() => {
    fixture.destroy();
    tick();
    fixture.nativeElement.remove();
  }));

  it('should trigger when url is changed', (done) => {
    const spy = jasmine.createSpy('scrolltop subscriber');
    restoreHelper.shouldRestore().subscribe(spy);

    router.navigate(['/']);
    setTimeout((_) => router.navigate(['about']));
    setTimeout((_) => router.navigate(['/']));

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(3);
      done();
    }, 1);
  });

  it('should not trigger when url query param is changed', (done) => {
    const spy = jasmine.createSpy('scrolltop subscriber');
    restoreHelper.shouldRestore().subscribe(spy);

    router.navigate(['/']);
    setTimeout((_) => router.navigate(['/'], { queryParams: { test: 1 } }));

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 1);
  });

  it('should not trigger when url fragment is changed', (done) => {
    const spy = jasmine.createSpy('scrolltop subscriber');
    restoreHelper.shouldRestore().subscribe(spy);

    router.navigate(['/']);
    setTimeout((_) => router.navigate(['/'], { fragment: 'some' }));

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 1);
  });

  it('should not trigger when url query param & fragment are changed', (done) => {
    const spy = jasmine.createSpy('scrolltop subscriber');
    restoreHelper.shouldRestore().subscribe(spy);

    router.navigate(['/']);
    setTimeout((_) => router.navigate(['/'], { fragment: 'some', queryParams: { test: 1 } }));

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 1);
  });
});
