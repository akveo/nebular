import { NbProgressBarComponent } from './progress-bar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {} from 'jasmine';

describe('Component: NbProgressBar', () => {

  let checkbox: NbProgressBarComponent;
  let fixture: ComponentFixture<NbProgressBarComponent>;
  let checkboxInput: DebugElement;
  let testContainerEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbProgressBarComponent],
    });

    fixture = TestBed.createComponent(NbProgressBarComponent);
    checkbox = fixture.componentInstance;
    testContainerEl = fixture.elementRef.nativeElement;

    checkboxInput = fixture.debugElement.query(By.css('input'));
    fixture.debugElement.query(By.css('label'));
    fixture.debugElement.query(By.css('customised-control-indicator'));
    fixture.debugElement.query(By.css('customised-control-description'));
  });

});
