/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { NbButtonModule, NbButtonGroupComponent, NbButtonGroupModule, NbButtonToggleDirective } from '@nebular/theme';

@Component({
  selector: 'nb-button-group-test',
  template: `
    <nb-button-group
      size="small"
      status="danger"
      shape="rectangle"
      outline>
      <button nbButtonToggle>A</button>
      <button nbButtonToggle>B</button>
      <button nbButtonToggle>C</button>
      <button nbButtonToggle>D</button>
      <button nbButtonToggle>E</button>
      <button nbButtonToggle *ngIf="showLast">F</button>
    </nb-button-group>
  `,
})
export class NbButtonGroupTestComponent {
  @ViewChild(NbButtonGroupComponent) buttonGroup: NbButtonGroupComponent;
  @ViewChildren(NbButtonToggleDirective) buttonToggle: QueryList<NbButtonToggleDirective>;

  showLast = false;

}
describe('Component: NbButtonGroup', () => {
  let fixture: ComponentFixture<NbButtonGroupTestComponent>;
  let buttonGroupTest: NbButtonGroupTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NbButtonGroupTestComponent],
      imports: [NbButtonGroupModule, NbButtonModule],
    });

    fixture = TestBed.createComponent(NbButtonGroupTestComponent);
    buttonGroupTest = fixture.componentInstance;

    fixture.detectChanges();
    buttonGroupTest.showLast = true;
    fixture.detectChanges();
  });

  it('should set class danger', () => {
    buttonGroupTest.buttonToggle.forEach(item => expect(item.status).toEqual('danger'));
  });

  it('should set size small', () => {
    buttonGroupTest.buttonToggle.forEach(item => expect(item.size).toEqual('small'));
  });

  it('should set outline class', () => {
    buttonGroupTest.buttonToggle.forEach(item => expect(item.outline).toBeTruthy());
  });

  it('should set shape class', () => {
    buttonGroupTest.buttonToggle.forEach(item => expect(item.shape).toEqual('rectangle'));
  });
});
