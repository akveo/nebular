import { NbCheckboxComponent } from './checkbox.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

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

/** Test component with reactive forms */
@Component({
  template: `<nb-checkbox [formControl]="formControl"></nb-checkbox>`,
})
class CheckboxWithFormControlComponent {
  formControl = new FormControl();
}

describe('Component: NbCheckbox with form control', () => {

  let fixture: ComponentFixture<CheckboxWithFormControlComponent>;
  let checkboxComponent: DebugElement;
  let checkboxInstance: NbCheckboxComponent;
  let testComponent: CheckboxWithFormControlComponent;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NbCheckboxComponent, CheckboxWithFormControlComponent],
    });

      fixture = TestBed.createComponent(CheckboxWithFormControlComponent);
      fixture.detectChanges();

      checkboxComponent = fixture.debugElement.query(
        By.directive(NbCheckboxComponent),
      );
      checkboxInstance = checkboxComponent.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
      inputElement = <HTMLInputElement>(
        checkboxComponent.nativeElement.querySelector('input')
      );
  });

  it('Toggling form control disabled state properly toggles checkbox input', () => {
      expect(checkboxInstance.disabled).toBeFalsy();

      testComponent.formControl.disable();
      fixture.detectChanges();

      expect(checkboxInstance.disabled).toBeTruthy();
      expect(inputElement.disabled).toBeTruthy();

      testComponent.formControl.enable();
      fixture.detectChanges();

      expect(checkboxInstance.disabled).toBeFalsy();
      expect(inputElement.disabled).toBeFalsy();
  });
});
