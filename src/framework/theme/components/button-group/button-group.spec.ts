/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
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
    <nb-button-group [size]="size"
                     [status]="status"
                     [shape]="shape"
                     [appearance]="appearance"
                     [disabled]="groupDisabled">
      <button nbButtonToggle>A</button>
      <button nbButtonToggle>B</button>
      <button nbButtonToggle>C</button>
      <button nbButtonToggle>D</button>
      <button nbButtonToggle>E</button>
      <button nbButtonToggle *ngIf="showLastButton">F</button>
    </nb-button-group>
  `,
})
export class NbButtonGroupTestComponent {
  size: NbComponentSize = 'large';
  shape: NbComponentShape = 'round';
  status: NbComponentStatus = 'danger';
  appearance: NbButtonToggleAppearance = 'outline';
  groupDisabled: boolean = false;

  showLastButton = false;

  @ViewChild(NbButtonGroupComponent) buttonGroup: NbButtonGroupComponent;
  @ViewChildren(NbButtonToggleDirective) toggleButtons: QueryList<NbButtonToggleDirective>;
}

describe('Component: NbButtonGroup', () => {
  let fixture: ComponentFixture<NbButtonGroupTestComponent>;
  let testComponent: NbButtonGroupTestComponent;
  let buttonGroup: NbButtonGroupComponent;
  let toggleButtons: QueryList<NbButtonToggleDirective>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [ NbThemeModule.forRoot(), NbButtonGroupModule, NbButtonModule ],
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
    toggleButtons.forEach(button => expect(button.status).toEqual(buttonGroup.status));
  });

  it('should change buttons size after initialization', () => {
    toggleButtons.forEach(button => expect(button.size).toEqual(buttonGroup.size));
  });

  it('should change buttons appearance after initialization', () => {
    toggleButtons.forEach(button => expect(button.appearance).toEqual(buttonGroup.appearance));
  });

  it('should change buttons shape after initialization', () => {
    toggleButtons.forEach(button => expect(button.shape).toEqual(buttonGroup.shape));
  });

  it('should change buttons disabled state after initialization', () => {
    testComponent.groupDisabled = true;
    fixture.detectChanges();
    toggleButtons.forEach(button => expect(button.disabled).toEqual(true));
  });

  it('should change the status of newly added buttons', fakeAsync(() => {
    testComponent.showLastButton = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    expect(toggleButtons.last.status).toEqual(buttonGroup.status);
  }));

  it('should change the size of newly added buttons', fakeAsync(() => {
    testComponent.showLastButton = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    expect(toggleButtons.last.size).toEqual(buttonGroup.size);
  }));

  it('should change the appearance of newly added buttons', fakeAsync(() => {
    testComponent.showLastButton = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    expect(toggleButtons.last.appearance).toEqual(buttonGroup.appearance);
  }));

  it('should change the shape of newly added buttons', fakeAsync(() => {
    testComponent.showLastButton = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    expect(toggleButtons.last.shape).toEqual(buttonGroup.shape);
  }));

  it('should change disabled state of newly added buttons', fakeAsync(() => {
    testComponent.groupDisabled = true;
    testComponent.showLastButton = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    expect(toggleButtons.last.disabled).toEqual(true);
  }));
});
