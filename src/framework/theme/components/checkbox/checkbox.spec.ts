import { NbCheckboxComponent } from './checkbox.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Component: NbCheckbox', () => {

  let checkbox: NbCheckboxComponent;
  let fixture: ComponentFixture<NbCheckboxComponent>;
  let checkboxInput: DebugElement;
  let testContainerEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbCheckboxComponent],
    });

    fixture = TestBed.createComponent(NbCheckboxComponent);
    checkbox = fixture.componentInstance;
    testContainerEl = fixture.elementRef.nativeElement;

    checkboxInput = fixture.debugElement.query(By.css('input'));
    fixture.debugElement.query(By.css('label'));
    fixture.debugElement.query(By.css('customised-control-indicator'));
    fixture.debugElement.query(By.css('customised-control-description'));
  });

  it('Setting disabled to true disables checkbox input', () => {
    checkbox.disabled = true;
    fixture.detectChanges();
    expect(checkboxInput.nativeElement.disabled).toBeTruthy();
  });

  it('Setting disabled to false enables checkbox input', () => {
    checkbox.disabled = false;
    fixture.detectChanges();
    expect(checkboxInput.nativeElement.disabled).toBeFalsy();
  });

  it('Setting value to true makes checkbox input checked', () => {
    checkbox.value = true;
    fixture.detectChanges();
    expect(checkboxInput.nativeElement.checked).toBeTruthy();
  });

  it('Setting value to false makes checkbox input unchecked', () => {
    checkbox.value = false;
    fixture.detectChanges();
    expect(checkboxInput.nativeElement.checked).toBeFalsy();
  });

  it('Setting status to success apply corresponding class to host element', () => {
    checkbox.status = 'success';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('success')).toBeTruthy();
  });

  it('Setting status to warning apply corresponding class to host element', () => {
    checkbox.status = 'warning';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('warning')).toBeTruthy();
  });

  it('Setting status to danger apply corresponding class to host element', () => {
    checkbox.status = 'danger';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('danger')).toBeTruthy();
  });
});
