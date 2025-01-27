import createSpy = jasmine.createSpy;
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NbLayoutModule,
  NbSearchComponent,
  NbSearchFieldComponent,
  NbSearchModule,
  NbSearchService,
  NbThemeModule,
  NbLayoutComponent,
} from '@nebular/theme';

describe('NbSearchFieldComponent', () => {
  let fixture: ComponentFixture<NbSearchFieldComponent>;
  let searchFieldComponent: NbSearchFieldComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), NbThemeModule.forRoot(), NbSearchModule],
    });

    fixture = TestBed.createComponent(NbSearchFieldComponent);
    searchFieldComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit input event when typing in input', fakeAsync(() => {
    const inputSpy = createSpy('inputSpy');
    searchFieldComponent.searchInput.subscribe(inputSpy);

    const input: HTMLInputElement = fixture.componentInstance.inputElement.nativeElement;
    input.dispatchEvent(new Event('input'));
    tick();

    expect(inputSpy).toHaveBeenCalledTimes(1);
  }));

  it('should emit input event with input value', fakeAsync(() => {
    const inputValue = 'input text';
    const inputSpy = createSpy('inputSpy');
    searchFieldComponent.searchInput.subscribe(inputSpy);

    const input: HTMLInputElement = fixture.componentInstance.inputElement.nativeElement;
    input.value = inputValue;
    input.dispatchEvent(new Event('input'));
    tick();

    expect(inputSpy).toHaveBeenCalledWith(inputValue);
  }));
});

describe('NbSearchComponent', () => {
  let fixture: ComponentFixture<NbSearchComponent>;
  let searchComponent: NbSearchComponent;

  function getSearchFieldComponent(): NbSearchFieldComponent {
    return fixture.debugElement.query(By.directive(NbSearchFieldComponent)).componentInstance;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), NbThemeModule.forRoot(), NbLayoutModule, NbSearchModule],
    });

    TestBed.createComponent(NbLayoutComponent);

    fixture = TestBed.createComponent(NbSearchComponent);
    searchComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should listen to search field input event', fakeAsync(() => {
    searchComponent.openSearch();
    fixture.detectChanges();
    tick();

    const inputSpy = spyOn(searchComponent, 'emitInput');
    const searchFieldComponent: NbSearchFieldComponent = getSearchFieldComponent();

    searchFieldComponent.searchInput.emit();
    tick();
    expect(inputSpy).toHaveBeenCalledTimes(1);
  }));

  it(`should propagate search event to search service`, fakeAsync(() => {
    searchComponent.openSearch();
    fixture.detectChanges();
    tick();
    const searchFieldComponent: NbSearchFieldComponent = getSearchFieldComponent();

    const searchService = TestBed.inject(NbSearchService);
    const searchInput = spyOn(searchService, 'searchInput').and.callThrough();
    const searchTerm = 'search term';

    searchFieldComponent.searchInput.emit(searchTerm);
    tick();

    expect(searchInput).toHaveBeenCalledTimes(1);
    expect(searchInput).toHaveBeenCalledWith(searchTerm, undefined);
  }));
});
