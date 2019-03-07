/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbSelectModule } from './select.module';
import { NbThemeModule } from '../../theme.module';
import { NbOverlayContainerAdapter } from '../cdk/adapter/overlay-container-adapter';
import { NB_DOCUMENT } from '../../theme.options';
import { NbSelectComponent } from './select.component';
import { NbLayoutModule } from '../layout/layout.module';
import { RouterTestingModule } from '@angular/router/testing';
import { from, zip } from 'rxjs';


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
  {
    title: 'Group 4',
    options: [
      { title: 'Option 41', value: '' },
      { title: 'Option 42', value: '0' },
      { title: 'Option 43', value: 0 },
      { title: 'Option 44'}
    ],
  },
];

@Component({
  selector: 'nb-select-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-select
          placeholder="This is test select component"
          [multiple]="multiple"
          [selected]="selected"
          (selectedChange)="selectedChange.emit($event)">
          <nb-select-label *ngIf="!multiple && customLabel">
            {{ selected.reverse() }}
          </nb-select-label>
          <nb-option>None</nb-option>
          <nb-option-group *ngFor="let group of groups" [title]="group.title">
            <nb-option *ngFor="let option of group.options" [value]="option.value">{{ option.title }}</nb-option>
          </nb-option-group>
        </nb-select>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbSelectTestComponent {
  @Input() selected: any = null;
  @Input() multiple: boolean;
  @Input() customLabel: boolean;
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
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbLayoutModule,
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
    setSelectedAndOpen('Option 23');
    const selected = overlayContainer.querySelector('nb-option.selected');

    expect(selected).toBeTruthy();
    expect(selected.textContent).toContain('Option 23');
  });

  it('should render passed items as selected', () => {
    select.multiple = true;
    setSelectedAndOpen(['Option 1', 'Option 21', 'Option 31']);
    const selected = overlayContainer.querySelectorAll('nb-option.selected');

    expect(selected.length).toBe(3);
    expect(selected[0].textContent).toContain('Option 1');
    expect(selected[1].textContent).toContain('Option 21');
    expect(selected[2].textContent).toContain('Option 31');
  });

  it('should fire selectedChange item when selection changes', done => {
    setSelectedAndOpen('Option 1');

    fixture.componentInstance.selectedChange.subscribe(selection => {
      expect(selection).toBe('Option 21');
      done();
    });

    const option = overlayContainer.querySelectorAll('nb-option')[4];
    option.dispatchEvent(new Event('click'));
  });

  it('should fire selectedChange items when selecting multiple one by one', done => {
    select.multiple = true;
    setSelectedAndOpen([]);

    zip(
      from([['Option 2'], ['Option 2', 'Option 21'], ['Option 2', 'Option 21', 'Option 23']]),
      fixture.componentInstance.selectedChange,
    ).subscribe(([expected, real]) => expect(real).toEqual(expected), null, done);

    const option1 = overlayContainer.querySelectorAll('nb-option')[2];
    const option2 = overlayContainer.querySelectorAll('nb-option')[4];
    const option3 = overlayContainer.querySelectorAll('nb-option')[6];
    option1.dispatchEvent(new Event('click'));
    option2.dispatchEvent(new Event('click'));
    option3.dispatchEvent(new Event('click'));
  });

  it('should deselect item when clicking on reselect item', () => {
    setSelectedAndOpen('Option 1');

    const option = overlayContainer.querySelector('nb-option');
    option.dispatchEvent(new Event('click'));

    expect(overlayContainer.querySelectorAll('nb-option.selected').length).toBe(0);
  });

  it('should deselect all items when clicking on reselect item in multiple select', () => {
    select.multiple = true;
    setSelectedAndOpen(['Option 1', 'Option 2']);

    const option = overlayContainer.querySelector('nb-option');
    option.dispatchEvent(new Event('click'));

    expect(overlayContainer.querySelectorAll('nb-option.selected').length).toBe(0);
  });

  it('should deselect only clicked item in multiple select', () => {
    select.multiple = true;
    setSelectedAndOpen(['Option 1', 'Option 2']);

    const option = overlayContainer.querySelectorAll('nb-option')[1];
    option.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    const selected = overlayContainer.querySelectorAll('nb-option.selected');
    expect(selected.length).toBe(1);
    expect(selected[0].textContent).toContain('Option 2');
  });

  it('should render placeholder when nothing selected', () => {
    select.multiple = true;
    setSelectedAndOpen([]);

    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('This is test select component');
  });

  it('should render default label when something selected', () => {
    setSelectedAndOpen('Option 1');

    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Option 1');
  });

  it('should render custom label when something selected and custom label provided', () => {
    select.customLabel = true;
    setSelectedAndOpen('Option 1');
    select.selectedChange.subscribe(selection => {
      fixture.componentInstance.selected = selection;
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent).toContain('1 noitpO');
    });
  });

  it('should clean selection when selected option does not have a value', () => {
    setSelectedAndOpen('Option 1');

    const option = overlayContainer.querySelectorAll('nb-option')[13];
    option.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    select.show();

    expect(overlayContainer.querySelectorAll('nb-option.selected').length).toBe(0);
  });

  it('should render default label when selecting option with value of empty string', () => {
    setSelectedAndOpen('');
    const selected = overlayContainer.querySelector('nb-option.selected');

    expect(selected).toBeTruthy();
    expect(selected.textContent).toEqual('Option 41');
  });

  it('should render default label when option with value of empty string is clicked', () => {
    setSelectedAndOpen('Option 1');

    const option = overlayContainer.querySelectorAll('nb-option')[10];
    option.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    select.show();

    const selected = overlayContainer.querySelectorAll('nb-option.selected');
    expect(selected.length).toBe(1);
    expect(selected[0].textContent).toEqual('Option 41');
  });

  it('should render default label when selecting option with value "0"', () => {
    setSelectedAndOpen('0');
    const selected = overlayContainer.querySelector('nb-option.selected');

    expect(selected).toBeTruthy();
    expect(selected.textContent).toEqual('Option 42');
  });

  it('should render default label when option with value of "0" is clicked', () => {
    setSelectedAndOpen('Option 1');

    const option = overlayContainer.querySelectorAll('nb-option')[11];
    option.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    select.show();

    const selected = overlayContainer.querySelectorAll('nb-option.selected');
    expect(selected.length).toBe(1);
    expect(selected[0].textContent).toEqual('Option 42');
  });

  it('should render default label when selecting option with value of 0', () => {
    setSelectedAndOpen(0);
    const selected = overlayContainer.querySelector('nb-option.selected');

    expect(selected).toBeTruthy();
    expect(selected.textContent).toEqual('Option 43');
  });

  it('should render default label when option with value of 0 is clicked', () => {
    setSelectedAndOpen('Option 1');

    const option = overlayContainer.querySelectorAll('nb-option')[12];
    option.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    select.show();

    const selected = overlayContainer.querySelectorAll('nb-option.selected');
    expect(selected.length).toBe(1);
    expect(selected[0].textContent).toEqual('Option 43');
  });
});
