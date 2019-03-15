import { NbToggleComponent } from './toggle.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbLayoutDirectionService } from '../../services/direction.service';

describe('Component: NbToggle', () => {
  let toggle: NbToggleComponent;
  let fixture: ComponentFixture<NbToggleComponent>;
  let toggleInput: DebugElement;
  let testContainerEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [NbLayoutDirectionService],
      declarations: [NbToggleComponent],
    });

    fixture = TestBed.createComponent(NbToggleComponent);
    toggle = fixture.componentInstance;
    testContainerEl = fixture.elementRef.nativeElement;

    toggleInput = fixture.debugElement.query(By.css('input'));
  });

  it('Setting `disabled` to `true` disables toggle input', () => {
    toggle.disabled = true;
    fixture.detectChanges();
    expect(toggleInput.nativeElement.disabled).toBeTruthy();
  });

  it('Setting `disabled` to `true` apply corresponding class to host element', () => {
    toggle.disabled = true;
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('disabled')).toBeTruthy();
  });

  it('Setting `disabled` to `false` enables toggle input', () => {
    toggle.disabled = false;
    fixture.detectChanges();
    expect(toggleInput.nativeElement.disabled).toBeFalsy();
  });

  it('Setting `value` to `true` makes toggle input on', () => {
    toggle.value = true;
    fixture.detectChanges();
    expect(toggleInput.nativeElement.checked).toBeTruthy();
  });

  it('Setting `value` to `false` makes toggle input off', () => {
    toggle.value = false;
    fixture.detectChanges();
    expect(toggleInput.nativeElement.checked).toBeFalsy();
  });

  it('Setting `status` to `primary` apply corresponding class to host element', () => {
    toggle.status = 'primary';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('primary')).toBeTruthy();
  });

  it('Setting `status` to `success` apply corresponding class to host element', () => {
    toggle.status = 'success';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('success')).toBeTruthy();
  });

  it('Setting `status` to `warning` apply corresponding class to host element', () => {
    toggle.status = 'warning';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('warning')).toBeTruthy();
  });

  it('Setting `status` to `danger` apply corresponding class to host element', () => {
    toggle.status = 'danger';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('danger')).toBeTruthy();
  });

  it('Setting `status` to `info` apply corresponding class to host element', () => {
    toggle.status = 'info';
    fixture.detectChanges();
    expect(testContainerEl.classList.contains('info')).toBeTruthy();
  });
});

// Test component with reactive forms
@Component({
  template: `<nb-toggle [formControl]="formControl"></nb-toggle>`,
})
class ToggleWithFormControlComponent {
  formControl = new FormControl();
}

describe('Component: NbToggle with form control', () => {
  let fixture: ComponentFixture<ToggleWithFormControlComponent>;
  let toggleComponent: DebugElement;
  let toggleInstance: NbToggleComponent;
  let testComponent: ToggleWithFormControlComponent;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
      providers: [NbLayoutDirectionService],
      declarations: [NbToggleComponent, ToggleWithFormControlComponent],
    });

    fixture = TestBed.createComponent(ToggleWithFormControlComponent);
    fixture.detectChanges();

    toggleComponent = fixture.debugElement.query(
      By.directive(NbToggleComponent),
    );

    toggleInstance = toggleComponent.componentInstance;
    testComponent = fixture.debugElement.componentInstance;

    inputElement = <HTMLInputElement>(
      toggleComponent.nativeElement.querySelector('input')
    );
  });

  it('Toggling form control `disabled` state properly aplied', () => {
    expect(toggleInstance.disabled).toBeFalsy();

    testComponent.formControl.disable();
    fixture.detectChanges();

    expect(toggleInstance.disabled).toBeTruthy();
    expect(inputElement.disabled).toBeTruthy();

    testComponent.formControl.enable();
    fixture.detectChanges();

    expect(toggleInstance.disabled).toBeFalsy();
    expect(inputElement.disabled).toBeFalsy();
  });
});
