/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

import {
  NbButtonModule,
  NbButtonGroupComponent,
  NbButtonGroupModule,
  NbButtonToggleDirective,
  NbComponentSize,
  NbComponentShape,
  NbComponentStatus,
  NbButtonToggleAppearance,
  NbThemeModule,
} from '@nebular/theme';

@Component({
    selector: 'nb-button-group-test',
    template: `
    <nb-button-group
      [size]="size"
      [status]="status"
      [shape]="shape"
      [appearance]="appearance"
      [disabled]="groupDisabled"
      [multiple]="multiple"
      (valueChange)="onValueChange($event)"
    >
      <button nbButtonToggle value="A">A</button>
      <button nbButtonToggle value="B">B</button>
      <button nbButtonToggle value="C">C</button>
      <button nbButtonToggle value="D">D</button>
      <button nbButtonToggle value="E">E</button>
      <button nbButtonToggle value="F" *ngIf="showLastButton">F</button>
    </nb-button-group>
  `,
    standalone: false
})
export class NbButtonGroupTestComponent {
  size: NbComponentSize = 'large';
  shape: NbComponentShape = 'round';
  status: NbComponentStatus = 'danger';
  appearance: NbButtonToggleAppearance = 'outline';
  groupDisabled: boolean = false;
  multiple: boolean = false;

  showLastButton = false;

  @ViewChild(NbButtonGroupComponent) buttonGroup: NbButtonGroupComponent;
  @ViewChildren(NbButtonToggleDirective) toggleButtons: QueryList<NbButtonToggleDirective>;

  onValueChange(value) {}
}

describe('Component: NbButtonGroup', () => {
  let fixture: ComponentFixture<NbButtonGroupTestComponent>;
  let testComponent: NbButtonGroupTestComponent;
  let buttonGroup: NbButtonGroupComponent;
  let toggleButtons: QueryList<NbButtonToggleDirective>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), NbButtonGroupModule, NbButtonModule],
      declarations: [NbButtonGroupTestComponent],
    });

    fixture = TestBed.createComponent(NbButtonGroupTestComponent);
    testComponent = fixture.componentInstance;

    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    buttonGroup = testComponent.buttonGroup;
    toggleButtons = testComponent.toggleButtons;
  }));

  it('should change buttons status after initialization', () => {
    toggleButtons.forEach((button) => expect(button.status).toEqual(buttonGroup.status));
  });

  it('should change buttons size after initialization', () => {
    toggleButtons.forEach((button) => expect(button.size).toEqual(buttonGroup.size));
  });

  it('should change buttons appearance after initialization', () => {
    toggleButtons.forEach((button) => expect(button.appearance).toEqual(buttonGroup.appearance));
  });

  it('should change buttons shape after initialization', () => {
    toggleButtons.forEach((button) => expect(button.shape).toEqual(buttonGroup.shape));
  });

  it('should change buttons disabled state after initialization', () => {
    testComponent.groupDisabled = true;
    fixture.detectChanges();
    toggleButtons.forEach((button) => expect(button.disabled).toEqual(true));
  });

  it('should change the status of newly added buttons', fakeAsync(() => {
    testComponent.showLastButton = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    tick();
    expect(toggleButtons.last.status).toEqual(buttonGroup.status);
  }));

  it('should change the size of newly added buttons', fakeAsync(() => {
    testComponent.showLastButton = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    tick();
    expect(toggleButtons.last.size).toEqual(buttonGroup.size);
  }));

  it('should change the appearance of newly added buttons', fakeAsync(() => {
    testComponent.showLastButton = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    tick();
    expect(toggleButtons.last.appearance).toEqual(buttonGroup.appearance);
  }));

  it('should change the shape of newly added buttons', fakeAsync(() => {
    testComponent.showLastButton = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    tick();
    expect(toggleButtons.last.shape).toEqual(buttonGroup.shape);
  }));

  it('should change disabled state of newly added buttons', fakeAsync(() => {
    testComponent.groupDisabled = true;
    testComponent.showLastButton = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    tick();
    expect(toggleButtons.last.disabled).toEqual(true);
  }));

  it('should correctly emit active buttons', fakeAsync(() => {
    const clickButton = (el: HTMLElement, index = 0) => {
      el.querySelectorAll<HTMLButtonElement>('[nbButtonToggle]')[index].click();
    };
    const nativeElement = fixture.nativeElement;
    spyOn(testComponent, 'onValueChange').and.callThrough();
    testComponent.showLastButton = true;
    testComponent.multiple = true;
    fixture.detectChanges();

    clickButton(nativeElement, 0);
    tick();
    expect(testComponent.onValueChange).toHaveBeenCalledWith(['A']);

    clickButton(nativeElement, 5);
    tick();
    expect(testComponent.onValueChange).toHaveBeenCalledWith(['A', 'F']);
  }));
});
