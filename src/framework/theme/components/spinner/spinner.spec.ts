import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbSpinnerComponent } from './spinner.component';

describe('Component: NbSpinner', () => {

  let spinner: NbSpinnerComponent;
  let fixture: ComponentFixture<NbSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbSpinnerComponent],
    });

    fixture = TestBed.createComponent(NbSpinnerComponent);
    spinner = fixture.componentInstance;
  });

  it('Spinner setting status danger should set class danger', () => {
    spinner.status = 'danger';
    fixture.detectChanges();
    expect(
      fixture
        .debugElement.nativeElement.classList.contains('danger-spinner'))
      .toBeTruthy()
  });
});
