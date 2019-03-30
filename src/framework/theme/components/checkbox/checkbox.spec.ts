import { take } from 'rxjs/operators';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NbIconModule } from '@nebular/theme';

import { NbCheckboxComponent } from './checkbox.component';

describe('Component: NbCheckbox', () => {

  let checkbox: NbCheckboxComponent;
  let label: DebugElement;
  let fixture: ComponentFixture<NbCheckboxComponent>;
  let checkboxInput: DebugElement;
  let testContainerEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbIconModule],
      declarations: [NbCheckboxComponent],
    });

    fixture = TestBed.createComponent(NbCheckboxComponent);
    checkbox = fixture.componentInstance;
    testContainerEl = fixture.elementRef.nativeElement;

    checkboxInput = fixture.debugElement.query(By.css('input'));
    label = fixture.debugElement.query(By.css('label'));
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
    expect(testContainerEl.classList.contains('status-success')).toBeTruthy();
  });

  it('Setting status to warning apply corresponding class to host element', () => {
    checkbox.status = 'warning';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('status-warning')).toBeTruthy();
  });

  it('Setting status to danger apply corresponding class to host element', () => {
    checkbox.status = 'danger';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('status-danger')).toBeTruthy();
  });

  it('Setting status to primary apply corresponding class to host element', () => {
    checkbox.status = 'primary';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('status-primary')).toBeTruthy();
  });

  it('Setting status to info apply corresponding class to host element', () => {
    checkbox.status = 'info';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('status-info')).toBeTruthy();
  });

  it('should emit change event when changed', fakeAsync(() => {
    checkbox.change
      .pipe(take(1))
      .subscribe((value: boolean) => expect(value).toEqual(true));

    checkbox.value = true;
    fixture.detectChanges();
    tick();
  }));

  it('should change value to opposite when clicked', () => {
    label.nativeElement.click();
    fixture.detectChanges();

    expect(checkbox.value).toEqual(true);

    label.nativeElement.click();
    fixture.detectChanges();

    expect(checkbox.value).toEqual(false);
  });

  it('should reset indeterminate state when clicked on unchecked checkbox', () => {
    checkbox.indeterminate = true;
    fixture.detectChanges();

    expect(checkbox.indeterminate).toEqual(true);

    label.nativeElement.click();
    fixture.detectChanges();
    expect(checkbox.indeterminate).toEqual(false);
  });

  it('should reset indeterminate state when clicked on unchecked checkbox', () => {
    checkbox.value = false;
    checkbox.indeterminate = true;
    fixture.detectChanges();

    expect(checkbox.indeterminate).toEqual(true);

    label.nativeElement.click();
    fixture.detectChanges();
    expect(checkbox.indeterminate).toEqual(false);
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
      imports: [ReactiveFormsModule, NbIconModule],
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
