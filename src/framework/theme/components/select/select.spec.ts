/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbSelectModule } from './select.module';
import { NbThemeModule } from '../../theme.module';
import { NbOverlayModule } from '../cdk';
import { NbOverlayContainerAdapter } from '../cdk/adapter/overlay-container-adapter';
import { NB_DOCUMENT } from '../../theme.options';


@Component({
  selector: 'nb-select-test',
  template: `
    <nb-select [selected]="selected" (selectedChange)="selectedChange.emit($event)">
      <nb-option>None</nb-option>
      <nb-option-group title="Group 1">
        <nb-option value="Option 1">Option 1</nb-option>
        <nb-option value="Option 2">Option 2</nb-option>
        <nb-option value="Option 3">Option 3</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 2">
        <nb-option value="Option 21">Option 21</nb-option>
        <nb-option value="Option 22">Option 22</nb-option>
        <nb-option value="Option 23">Option 23</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 3">
        <nb-option value="Option 31">Option 31</nb-option>
        <nb-option value="Option 32">Option 32</nb-option>
        <nb-option value="Option 33">Option 33</nb-option>
      </nb-option-group>
    </nb-select>
  `,
})
export class NbSelectTestComponent {
  @Input() selected: any;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();
}

fdescribe('Component: NbSelectComponent', () => {
  let fixture: ComponentFixture<NbSelectTestComponent>;
  let overlayContainerService: NbOverlayContainerAdapter;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NbThemeModule.forRoot({ name: 'default' }),
        NbOverlayModule.forRoot(),
        NbSelectModule,
      ],
      declarations: [NbSelectTestComponent],
    });

    fixture = TestBed.createComponent(NbSelectTestComponent);
    overlayContainerService = TestBed.get(NbOverlayContainerAdapter);
    document = TestBed.get(NB_DOCUMENT);
  });

  beforeEach(() => {
    const overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);
  });

  afterEach(() => {
    overlayContainerService.clearContainer();
  });

  it('should render passed item as selected', () => {
    fixture.componentInstance.selected = 'Option 23';
  });

  it('should render passed items as selected', () => {
  });

  it('should fire selectedChange when selection changes', () => {
  });

  it('should render placeholder if no custom label', () => {
  });

  it('should render render custom label', () => {
  });

  it('should render checkboxes if multiple', () => {
  });
});
