/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { from, zip } from 'rxjs';
import createSpy = jasmine.createSpy;

import { NbSelectModule } from './select.module';
import { NbThemeModule } from '../../theme.module';
import { NbOverlayContainerAdapter } from '../cdk/adapter/overlay-container-adapter';
import { NB_DOCUMENT } from '../../theme.options';
import { NbSelectComponent } from './select.component';
import { NbLayoutModule } from '../layout/layout.module';
import { NbOptionComponent } from './option.component';


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
  @ViewChildren(NbOptionComponent) options: QueryList<NbOptionComponent<any>>;
  groups = TEST_GROUPS;
}

@Component({
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-select [selected]="selected">
          <nb-option *ngFor="let option of options" [value]="option">{{ option }}</nb-option>
        </nb-select>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbSelectWithInitiallySelectedOptionComponent {
  @Input() selected = 1;
  @Input() options = [ 1, 2, 3 ];

  @ViewChild(NbSelectComponent) select: NbSelectComponent<number>;
}

@Component({
  template: `
    <nb-layout>
      <nb-layout-column>

        <nb-select *ngIf="showSelect" [formControl]="formControl">
          <nb-option *ngFor="let option of options" [value]="option">{{ option }}</nb-option>
        </nb-select>

      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbReactiveFormSelectComponent {
  options: number[] = [ 1 ];
  showSelect: boolean = true;
  formControl: FormControl = new FormControl();

  @ViewChild(NbSelectComponent) selectComponent: NbSelectComponent<number>;
  @ViewChild(NbOptionComponent) optionComponent: NbOptionComponent<number>;
}

@Component({
  template: `
    <nb-layout>
      <nb-layout-column>

        <nb-select [(ngModel)]="selectedValue">
          <nb-option *ngFor="let option of options" [value]="option">{{ option }}</nb-option>
        </nb-select>

      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbNgModelSelectComponent {
  options: number[] = [ 1 ];
  selectedValue: number = null;

  @ViewChild(NbOptionComponent) optionComponent: NbOptionComponent<number>;
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
        FormsModule,
        ReactiveFormsModule,
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbSelectModule,
      ],
      declarations: [
        NbSelectTestComponent,
        NbSelectWithInitiallySelectedOptionComponent,
        NbReactiveFormSelectComponent,
        NbNgModelSelectComponent,
      ],
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

  it('should deselect all items when clicking on reset item in multiple select', () => {
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
    })
  });

  it('should select initially specified value without errors', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbSelectWithInitiallySelectedOptionComponent);
    selectFixture.detectChanges();
    flush();
    selectFixture.detectChanges();

    const selectedOption = selectFixture.componentInstance.select.options.find(o => o.selected);
    expect(selectedOption.value).toEqual(selectFixture.componentInstance.selected);
    const selectButton = selectFixture.nativeElement.querySelector('nb-select button') as HTMLElement;
    expect(selectButton.textContent).toEqual(selectedOption.value.toString());
  }));

  it('should ignore selection change if destroyed', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbReactiveFormSelectComponent);
    const testSelectComponent = selectFixture.componentInstance;
    selectFixture.detectChanges();

    const setSelectionSpy = spyOn((testSelectComponent.selectComponent as any), 'setSelection').and.callThrough();
    testSelectComponent.showSelect = false;
    selectFixture.detectChanges();

    expect(() => testSelectComponent.formControl.setValue(1)).not.toThrow();
    expect(setSelectionSpy).not.toHaveBeenCalled();
  }));

  it('should select option set through formControl binding', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbReactiveFormSelectComponent);
    const testComponent = selectFixture.componentInstance;
    selectFixture.detectChanges();

    const optionSelectSpy = spyOn(testComponent.optionComponent, 'select').and.callThrough();

    expect(testComponent.optionComponent.selected).toEqual(false);

    testComponent.formControl.setValue(1);
    selectFixture.detectChanges();

    expect(testComponent.optionComponent.selected).toEqual(true);
    expect(optionSelectSpy).toHaveBeenCalledTimes(1);
  }));

  it('should select option set through select "selected" binding', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbSelectTestComponent);
    const testComponent = selectFixture.componentInstance;
    selectFixture.detectChanges();

    const optionToSelect = testComponent.options.last;
    const optionSelectSpy = spyOn(optionToSelect, 'select').and.callThrough();

    expect(optionToSelect.selected).toEqual(false);

    testComponent.selected = optionToSelect.value;
    selectFixture.detectChanges();

    expect(optionToSelect.selected).toEqual(true);
    expect(optionSelectSpy).toHaveBeenCalledTimes(1);
  }));

  it('should select option set through ngModel binding', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbNgModelSelectComponent);
    const testComponent = selectFixture.componentInstance;
    selectFixture.detectChanges();

    const optionToSelect = testComponent.optionComponent;
    const optionSelectSpy = spyOn(optionToSelect, 'select').and.callThrough();

    expect(optionToSelect.selected).toEqual(false);

    testComponent.selectedValue = optionToSelect.value;
    selectFixture.detectChanges();
    // need to call flush because NgModelDirective updates value on
    // resolvedPromise.then
    flush();
    selectFixture.detectChanges();

    expect(optionToSelect.selected).toEqual(true);
    expect(optionSelectSpy).toHaveBeenCalledTimes(1);
  }));

  it('should unselect previously selected option', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbSelectTestComponent);
    const testSelectComponent = selectFixture.componentInstance;
    testSelectComponent.selected = TEST_GROUPS[0].options[0].value;
    selectFixture.detectChanges();
    flush();
    selectFixture.detectChanges();

    const selectedOption: NbOptionComponent<any> = testSelectComponent.options.find(o => o.selected);
    const selectionChangeSpy = createSpy('selectionChangeSpy');
    selectedOption.selectionChange.subscribe(selectionChangeSpy);

    testSelectComponent.selected = TEST_GROUPS[0].options[1].value;
    selectFixture.detectChanges();

    expect(selectionChangeSpy).toHaveBeenCalledTimes(1);
    expect(selectedOption.selected).toEqual(false);
  }));

  it('should not deselect option if option stays selected', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbSelectTestComponent);
    const testSelectComponent = selectFixture.componentInstance;
    testSelectComponent.selected = TEST_GROUPS[0].options[0].value;
    selectFixture.detectChanges();
    flush();
    selectFixture.detectChanges();

    const selectedOption: NbOptionComponent<any> = testSelectComponent.options.find(o => o.selected);
    const selectionChangeSpy = spyOn(selectedOption, 'deselect');

    testSelectComponent.selected = selectedOption.value;
    selectFixture.detectChanges();

    expect(selectionChangeSpy).not.toHaveBeenCalled();
  }));
  
  it(`should not call dispose on uninitialized resources`, () => {
    const selectFixture = new NbSelectComponent(null, null, null, null, null, null);
    expect(() => selectFixture.ngOnDestroy()).not.toThrow();
  });
});

describe('NbOptionComponent', () => {
  let fixture: ComponentFixture<NbReactiveFormSelectComponent>;
  let testSelectComponent: NbReactiveFormSelectComponent;
  let option: NbOptionComponent<number>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbSelectModule,
      ],
      declarations: [
        NbNgModelSelectComponent,
        NbSelectTestComponent,
        NbReactiveFormSelectComponent,
      ],
    });

    fixture = TestBed.createComponent(NbReactiveFormSelectComponent);
    testSelectComponent = fixture.componentInstance;
    fixture.detectChanges();
    option = testSelectComponent.optionComponent;
  });

  it('should ignore selection change if destroyed', fakeAsync(() => {
    const selectionChangeSpy = createSpy('selectionChangeSpy');
    option.selectionChange.subscribe(selectionChangeSpy);

    expect(option.selected).toEqual(false);
    testSelectComponent.showSelect = false;
    fixture.detectChanges();

    expect((option as any).alive).toEqual(false);

    option.select();

    expect(option.selected).toEqual(false);
    expect(selectionChangeSpy).not.toHaveBeenCalled();
  }));

  it('should not emit selection change when already selected', fakeAsync(() => {
    option.select();
    fixture.detectChanges();
    expect(option.selected).toEqual(true);

    const selectionChangeSpy = createSpy('selectionChangeSpy');
    option.selectionChange.subscribe(selectionChangeSpy);
    option.select();

    expect(option.selected).toEqual(true);
    expect(selectionChangeSpy).not.toHaveBeenCalled();
  }));

  it('should emit selection change when deselected', fakeAsync(() => {
    option.select();
    fixture.detectChanges();
    expect(option.selected).toEqual(true);

    const selectionChangeSpy = createSpy('selectionChangeSpy');
    option.selectionChange.subscribe(selectionChangeSpy);
    option.deselect();

    expect(option.selected).toEqual(false);
    expect(selectionChangeSpy).toHaveBeenCalledTimes(1);
  }));
});
