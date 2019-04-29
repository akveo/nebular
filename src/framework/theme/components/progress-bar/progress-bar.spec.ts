import { NbProgressBarComponent } from './progress-bar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('Component: NbProgressBar', () => {

  let progressBar: NbProgressBarComponent;
  let fixture: ComponentFixture<NbProgressBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbProgressBarComponent],
    });

    fixture = TestBed.createComponent(NbProgressBarComponent);
    progressBar = fixture.componentInstance;
  });

  it('Setting value 50 should set width to 50%', () => {
    progressBar.value = 50;
    fixture.detectChanges();
    expect(
      fixture
        .debugElement
        .query(By.css('.progress-value')).nativeElement.style.width)
      .toBe('50%');
  });

  it('Setting status danger should set class danger', () => {
    progressBar.status = 'danger';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('status-danger')
  });

  it('Setting size should set class', () => {
    progressBar.size = 'small';
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).classList).toContain('size-small');
  });

  it('Setting displayValue should create span with value label', () => {
    progressBar.value = 40;
    progressBar.displayValue = true;
    fixture.detectChanges();
    expect(
      fixture
        .debugElement
        .query(By.css('.progress-value span')).nativeElement.innerHTML)
      .toContain('40%')
  });

});
