/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbSelectModule } from './select.module';
import { NbThemeModule } from '../../theme.module';
import { NbOverlayModule } from '../cdk';
import { NbOverlayContainerAdapter } from '../cdk/adapter/overlay-container-adapter';
import { NB_DOCUMENT } from '../../theme.options';
import { NbSelectComponent } from '@nebular/theme/components/select/select.component';


const TEST_GROUPS = [
  {
    title: 'Group 1',
    options: [
      { title: 'Option 1', value: 'Option 1' },
      { title: 'Option 2', value: 'Option 2' },
      { title: 'Option 3', value: 'Option 3' },
    ],
  },
  {
    title: 'Group 2',
    options: [
      { title: 'Option 21', value: 'Option 21' },
      { title: 'Option 22', value: 'Option 22' },
      { title: 'Option 23', value: 'Option 23' },
    ],
  },
  {
    title: 'Group 3',
    options: [
      { title: 'Option 31', value: 'Option 31' },
      { title: 'Option 32', value: 'Option 32' },
      { title: 'Option 33', value: 'Option 33' },
    ],
  },
];

@Component({
  selector: 'nb-select-test',
  template: `
    <nb-select [multiple]="multiple" [selected]="selected" (selectedChange)="selectedChange.emit($event)">
      <nb-option>None</nb-option>
      <nb-option-group *ngFor="let group of groups" [title]="group.title">
        <nb-option *ngFor="let option of group.options" [value]="option.value">{{ option.title }}</nb-option>
      </nb-option-group>
    </nb-select>
  `,
})
export class NbSelectTestComponent {
  @Input() selected: any = null;
  @Input() multiple: boolean;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();
  @ViewChild(NbSelectComponent) select: NbSelectComponent<any>;
  groups = TEST_GROUPS;
}

describe('Component: NbSelectComponent', () => {
  let fixture: ComponentFixture<NbSelectTestComponent>;
  let overlayContainerService: NbOverlayContainerAdapter;
  let overlayContainer: HTMLElement;
  let document: Document;
  let select: NbSelectComponent<string>;

  const setSelectedAndOpen = selected => {
    fixture.componentInstance.selected = selected;
    fixture.detectChanges();
    select.show();
  };

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
    select = fixture.componentInstance.select;

    overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);

    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainerService.clearContainer();
  });

  it('should render passed item as selected', () => {
    // setSelectedAndOpen('Option 23');
    // const selected = overlayContainer.querySelector('nb-option.selected');
    //
    // expect(selected).toBeTruthy();
    // expect(selected.textContent).toContain('Option 23');
  });

  it('should render passed items as selected', () => {
    // select.multiple = true;
    // setSelectedAndOpen(['Option 1', 'Option 21', 'Option 31']);
    // const selected = overlayContainer.querySelectorAll('nb-option.selected');
    //
    // expect(selected.length).toBe(3);
    // expect(selected[0].textContent).toContain('Option 1');
    // expect(selected[1].textContent).toContain('Option 21');
    // expect(selected[2].textContent).toContain('Option 31');
  });
  //
  // it('should fire selectedChange when selection changes', () => {
  //   fixture.componentInstance.selected = 'Option 1';
  //   fixture.detectChanges();
  //   select.show();
  //
  //   fixture.componentInstance.selectedChange.subscribe(selection => {
  //     expect(selection).toBe('Option 21');
  //     done();
  //   });
  //
  //   const option = overlayContainer.querySelectorAll('nb-option')[4];
  //   option.dispatchEvent(new Event('click'));
  // });

  // it('should render placeholder if no custom label', () => {
  // });
  //
  // it('should render render custom label', () => {
  // });
  //
  // it('should render checkboxes if multiple', () => {
  // });
});
