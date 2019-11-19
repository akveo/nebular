/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { from, zip, Subject } from 'rxjs';
import createSpy = jasmine.createSpy;

import {
  NbSelectModule,
  NbThemeModule,
  NbOverlayContainerAdapter,
  NB_DOCUMENT,
  NbSelectComponent,
  NbLayoutModule,
  NbOptionComponent,
  NbOptionGroupComponent,
  NbTriggerStrategyBuilderService,
} from '@nebular/theme';
import { NbFocusKeyManagerFactoryService } from '@nebular/theme/components/cdk/a11y/focus-key-manager';

const eventMock = { preventDefault() {} } as Event;

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
      { title: 'Option 44'},
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
  @ViewChildren(NbOptionComponent) options: QueryList<NbOptionComponent<any>>;
  groups = TEST_GROUPS;
}

@Component({
  template: `
    <nb-layout>
      <nb-layout-column>

        <nb-select>
          <nb-option value="a">a</nb-option>
          <nb-option value="b">b</nb-option>
          <nb-option value="c">c</nb-option>
        </nb-select>

      </nb-layout-column>
    </nb-layout>
  `,
})
export class BasicSelectTestComponent {}

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

  @ViewChild(NbSelectComponent, { static: false }) selectComponent: NbSelectComponent<number>;
  @ViewChildren(NbOptionComponent) optionComponents: QueryList<NbOptionComponent<number>>;
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

  @ViewChild(NbOptionComponent, { static: false }) optionComponent: NbOptionComponent<number>;
}

@Component({
  template: `
    <nb-layout>
      <nb-layout-column>

        <nb-select>
          <nb-option>No value option</nb-option>
          <nb-option [value]="null">undefined value</nb-option>
          <nb-option [value]="undefined">undefined value</nb-option>
          <nb-option [value]="false">false value</nb-option>
          <nb-option [value]="0">0 value</nb-option>
          <nb-option [value]="''">empty string value</nb-option>
          <nb-option [value]="nanValue">NaN value</nb-option>
          <nb-option value="1">truthy value</nb-option>
        </nb-select>

      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbSelectWithFalsyOptionValuesComponent {
  nanValue = NaN;

  @ViewChildren(NbOptionComponent) options: QueryList<NbOptionComponent<any>>;
  @ViewChildren(NbOptionComponent, { read: ElementRef }) optionElements: QueryList<ElementRef<HTMLElement>>;

  get noValueOption(): NbOptionComponent<any> {
    return this.options.toArray()[0];
  }
  get noValueOptionElement(): ElementRef<HTMLElement> {
    return this.optionElements.toArray()[0];
  }
  get nullOption(): NbOptionComponent<any> {
    return this.options.toArray()[1];
  }
  get nullOptionElement(): ElementRef<HTMLElement> {
    return this.optionElements.toArray()[1];
  }
  get undefinedOption(): NbOptionComponent<any> {
    return this.options.toArray()[2];
  }
  get undefinedOptionElement(): ElementRef<HTMLElement> {
    return this.optionElements.toArray()[2];
  }
  get falseOption(): NbOptionComponent<any> {
    return this.options.toArray()[3];
  }
  get falseOptionElement(): ElementRef<HTMLElement> {
    return this.optionElements.toArray()[3];
  }
  get zeroOption(): NbOptionComponent<any> {
    return this.options.toArray()[4];
  }
  get zeroOptionElement(): ElementRef<HTMLElement> {
    return this.optionElements.toArray()[4];
  }
  get emptyStringOption(): NbOptionComponent<any> {
    return this.options.toArray()[5];
  }
  get emptyStringOptionElement(): ElementRef<HTMLElement> {
    return this.optionElements.toArray()[5];
  }
  get nanOption(): NbOptionComponent<any> {
    return this.options.toArray()[6];
  }
  get nanOptionElement(): ElementRef<HTMLElement> {
    return this.optionElements.toArray()[6];
  }
  get truthyOption(): NbOptionComponent<any> {
    return this.options.toArray()[7];
  }
  get truthyOptionElement(): ElementRef<HTMLElement> {
    return this.optionElements.toArray()[7];
  }
}

@Component({
  template: `
    <nb-layout>
      <nb-layout-column>

        <nb-select multiple>
          <nb-option>No value option</nb-option>
          <nb-option [value]="null">undefined value</nb-option>
          <nb-option [value]="undefined">undefined value</nb-option>
          <nb-option [value]="false">false value</nb-option>
          <nb-option [value]="0">0 value</nb-option>
          <nb-option [value]="''">empty string value</nb-option>
          <nb-option [value]="nanValue">NaN value</nb-option>
          <nb-option value="1">truthy value</nb-option>
        </nb-select>

      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbMultipleSelectWithFalsyOptionValuesComponent extends NbSelectWithFalsyOptionValuesComponent {}

@Component({
  template: `
    <nb-layout>
      <nb-layout-column>

        <nb-select>
          <nb-option-group [disabled]="optionGroupDisabled">
            <nb-option [value]="1" [disabled]="optionDisabled">1</nb-option>
          </nb-option-group>
        </nb-select>

      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbOptionDisabledTestComponent {
  optionGroupDisabled = false;
  optionDisabled = false;

  @ViewChild(NbSelectComponent, { static: false }) selectComponent: NbSelectComponent<number>;
  @ViewChild(NbOptionGroupComponent, { static: false }) optionGroupComponent: NbOptionGroupComponent;
  @ViewChild(NbOptionComponent, { static: false }) optionComponent: NbOptionComponent<number>;
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
    select = fixture.debugElement.query(By.directive(NbSelectComponent)).componentInstance;

    overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);

    fixture.detectChanges();
  });

  afterEach(() => {
    select.hide();
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

  it('should emit selectionChange with empty array when reset option selected in multiple select', () => {
    select.multiple = true;
    setSelectedAndOpen(['Option 1', 'Option 2']);

    const selectionChangeSpy = createSpy('selectionChangeSpy');
    select.selectedChange.subscribe(selectionChangeSpy);

    const option = overlayContainer.querySelector('nb-option');
    option.dispatchEvent(new Event('click'));

    expect(selectionChangeSpy).toHaveBeenCalledWith([]);
  });

  it('should emit selectionChange with null when reset option selected in single select', () => {
    setSelectedAndOpen('Option 1');

    const selectionChangeSpy = createSpy('selectionChangeSpy');
    select.selectedChange.subscribe(selectionChangeSpy);

    const option = overlayContainer.querySelector('nb-option');
    option.dispatchEvent(new Event('click'));

    expect(selectionChangeSpy).toHaveBeenCalledWith(null);
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

  it('should select initially specified value without errors', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbSelectWithInitiallySelectedOptionComponent);
    selectFixture.detectChanges();
    flush();
    selectFixture.detectChanges();

    const selectedOption = selectFixture.debugElement.query(By.directive(NbSelectComponent))
      .componentInstance
      .options.find(o => o.selected);

    expect(selectedOption.value).toEqual(selectFixture.componentInstance.selected);
    const selectButton = selectFixture.nativeElement.querySelector('nb-select button') as HTMLElement;
    expect(selectButton.textContent).toEqual(selectedOption.value.toString());
  }));

  it('should ignore selection change if destroyed', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbReactiveFormSelectComponent);
    const testSelectComponent = selectFixture.componentInstance;
    selectFixture.detectChanges();
    flush();

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
    flush();

    const optionSelectSpy = spyOn(testComponent.optionComponents.first, 'select').and.callThrough();

    expect(testComponent.optionComponents.first.selected).toEqual(false);

    testComponent.formControl.setValue(1);
    selectFixture.detectChanges();

    expect(testComponent.optionComponents.first.selected).toEqual(true);
    expect(optionSelectSpy).toHaveBeenCalledTimes(1);
  }));

  it('should select option set through select "selected" binding', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbSelectTestComponent);
    const testComponent = selectFixture.componentInstance;
    selectFixture.detectChanges();
    flush();

    const optionToSelect = testComponent.options.find(o => o.value != null);
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
    const selectFixture = new NbSelectComponent(null, null, null, null, null, null, null);
    expect(() => selectFixture.ngOnDestroy()).not.toThrow();
  });

  it(`should has 'empty' class when has no placeholder and text`, () => {
    const selectFixture = TestBed.createComponent(NbSelectComponent);
    selectFixture.detectChanges();
    const button = selectFixture.debugElement.query(By.css('button'));

    expect(button.classes['empty']).toEqual(true);
  });

  it(`should set overlay width same as button inside select`, () => {
    const selectFixture = TestBed.createComponent(NbSelectComponent);
    const selectComponent = selectFixture.componentInstance;
    selectFixture.detectChanges();

    const selectElement: HTMLElement = selectFixture.nativeElement;
    const buttonElement: HTMLElement = selectElement.querySelector('button');

    selectElement.style.padding = '1px';

    expect(selectComponent.hostWidth).not.toEqual(selectElement.offsetWidth);
    expect(selectComponent.hostWidth).toEqual(buttonElement.offsetWidth);
  });

  it('should not open when disabled and button clicked', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbSelectComponent);
    selectFixture.componentInstance.disabled = true;
    selectFixture.detectChanges();
    const selectButton: HTMLElement = selectFixture.debugElement.query(By.css('button')).nativeElement;

    selectButton.click();
    flush();
    fixture.detectChanges();

    expect(selectFixture.componentInstance.isOpen).toBeFalsy();
  }));

  it('should not open when disabled and toggle icon clicked', fakeAsync(() => {
    const selectFixture = TestBed.createComponent(NbSelectComponent);
    selectFixture.componentInstance.disabled = true;
    selectFixture.detectChanges();
    const selectToggleIcon: HTMLElement = selectFixture.debugElement.query(By.css('nb-icon')).nativeElement;

    selectToggleIcon.click();
    flush();
    fixture.detectChanges();

    expect(selectFixture.componentInstance.isOpen).toBeFalsy();
  }));

  it('should mark touched when select button loose focus and select closed', fakeAsync(() => {
    const touchedSpy = jasmine.createSpy('touched spy');

    const selectFixture = TestBed.createComponent(NbSelectComponent);
    const selectComponent: NbSelectComponent<any> = selectFixture.componentInstance;
    selectFixture.detectChanges();
    flush();

    selectComponent.registerOnTouched(touchedSpy);
    selectFixture.debugElement.query(By.css('.select-button')).triggerEventHandler('blur', {});
    expect(touchedSpy).toHaveBeenCalledTimes(1);
  }));

  it('should not mark touched when select button loose focus and select open', fakeAsync(() => {
    const touchedSpy = jasmine.createSpy('touched spy');

    const selectFixture = TestBed.createComponent(NbSelectComponent);
    const selectComponent: NbSelectComponent<any> = selectFixture.componentInstance;
    selectFixture.detectChanges();
    flush();

    selectComponent.registerOnTouched(touchedSpy);
    selectComponent.show();
    selectFixture.debugElement.query(By.css('.select-button')).triggerEventHandler('blur', {});
    expect(touchedSpy).not.toHaveBeenCalled();
  }));
});

describe('NbSelectComponent - falsy values', () => {
  let fixture: ComponentFixture<NbSelectWithFalsyOptionValuesComponent>;
  let testComponent: NbSelectWithFalsyOptionValuesComponent;
  let select: NbSelectComponent<any>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbSelectModule,
      ],
      declarations: [
        NbSelectWithFalsyOptionValuesComponent,
        NbMultipleSelectWithFalsyOptionValuesComponent,
      ],
    });

    fixture = TestBed.createComponent(NbSelectWithFalsyOptionValuesComponent);
    testComponent = fixture.componentInstance;
    select = fixture.debugElement.query(By.directive(NbSelectComponent)).componentInstance;

    fixture.detectChanges();
    flush();
  }));

  it('should clean selection when selected option does not have a value', fakeAsync(() => {
    select.selected = testComponent.truthyOption.value;
    fixture.detectChanges();

    testComponent.noValueOption.onClick(eventMock);
    fixture.detectChanges();

    expect(select.selectionModel.length).toEqual(0);
  }));

  it('should clean selection when selected option has null value', fakeAsync(() => {
    select.selected = testComponent.truthyOption.value;
    fixture.detectChanges();

    testComponent.nullOption.onClick(eventMock);
    fixture.detectChanges();

    expect(select.selectionModel.length).toEqual(0);
  }));

  it('should clean selection when selected option has undefined value', fakeAsync(() => {
    select.selected = testComponent.truthyOption.value;
    fixture.detectChanges();

    testComponent.undefinedOption.onClick(eventMock);
    fixture.detectChanges();

    expect(select.selectionModel.length).toEqual(0);
  }));

  it('should not reset selection when selected option has false value', fakeAsync(() => {
    select.selected = testComponent.truthyOption.value;
    fixture.detectChanges();

    testComponent.falseOption.onClick(eventMock);
    fixture.detectChanges();

    expect(select.selectionModel.length).toEqual(1);
  }));

  it('should not reset selection when selected option has zero value', fakeAsync(() => {
    select.selected = testComponent.truthyOption.value;
    fixture.detectChanges();

    testComponent.zeroOption.onClick(eventMock);
    fixture.detectChanges();

    expect(select.selectionModel.length).toEqual(1);
  }));

  it('should not reset selection when selected option has empty string value', fakeAsync(() => {
    select.selected = testComponent.truthyOption.value;
    fixture.detectChanges();

    testComponent.emptyStringOption.onClick(eventMock);
    fixture.detectChanges();

    expect(select.selectionModel.length).toEqual(1);
  }));

  it('should not reset selection when selected option has NaN value', fakeAsync(() => {
    select.selected = testComponent.truthyOption.value;
    fixture.detectChanges();

    testComponent.nanOption.onClick(eventMock);
    fixture.detectChanges();

    expect(select.selectionModel.length).toEqual(1);
  }));

  it('should set class if fullWidth input set to true', () => {
    select.fullWidth = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.directive(NbSelectComponent));
    expect(button.classes['full-width']).toEqual(true);
  });

  describe('multiple', () => {
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NbMultipleSelectWithFalsyOptionValuesComponent);
      testComponent = fixture.componentInstance;
      select = fixture.debugElement.query(By.directive(NbSelectComponent)).componentInstance;

      fixture.detectChanges();
      flush();
      select.show();
      fixture.detectChanges();
    }));

    it('should not render checkbox on options with reset values', () => {
      expect(testComponent.noValueOptionElement.nativeElement.querySelector('nb-checkbox')).toEqual(null);
      expect(testComponent.nullOptionElement.nativeElement.querySelector('nb-checkbox')).toEqual(null);
      expect(testComponent.undefinedOptionElement.nativeElement.querySelector('nb-checkbox')).toEqual(null);
    });

    it('should render checkbox on options with falsy non-reset values', () => {
      expect(testComponent.falseOptionElement.nativeElement.querySelector('nb-checkbox')).not.toEqual(null);
      expect(testComponent.zeroOptionElement.nativeElement.querySelector('nb-checkbox')).not.toEqual(null);
      expect(testComponent.emptyStringOptionElement.nativeElement.querySelector('nb-checkbox')).not.toEqual(null);
      expect(testComponent.nanOptionElement.nativeElement.querySelector('nb-checkbox')).not.toEqual(null);
      expect(testComponent.truthyOptionElement.nativeElement.querySelector('nb-checkbox')).not.toEqual(null);
    });
  });

  it('should select initial falsy value', fakeAsync(() => {
    fixture = TestBed.createComponent(NbSelectWithFalsyOptionValuesComponent);
    testComponent = fixture.componentInstance;
    select = fixture.debugElement.query(By.directive(NbSelectComponent)).componentInstance;

    select.selected = '';
    fixture.detectChanges();
    flush();

    expect(select.selectionModel[0]).toEqual(testComponent.emptyStringOption);
    expect(testComponent.emptyStringOption.selected).toEqual(true);
  }));
});

describe('NbSelectComponent - Triggers', () => {
  let fixture: ComponentFixture<BasicSelectTestComponent>;
  let selectComponent: NbSelectComponent<any>;
  let triggerBuilderStub;
  let showTriggerStub: Subject<Event>;
  let hideTriggerStub: Subject<Event>;

  beforeEach(fakeAsync(() => {
    showTriggerStub = new Subject<Event>();
    hideTriggerStub = new Subject<Event>();
    triggerBuilderStub = {
      trigger() { return this },
      host() { return this },
      container() { return this },
      destroy() {},
      build() {
        return { show$: showTriggerStub, hide$: hideTriggerStub };
      },
    };

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), NbThemeModule.forRoot(), NbLayoutModule, NbSelectModule ],
      declarations: [ BasicSelectTestComponent ],
    });
    TestBed.overrideProvider(NbTriggerStrategyBuilderService, { useValue: triggerBuilderStub });

    fixture = TestBed.createComponent(BasicSelectTestComponent);
    fixture.detectChanges();
    flush();

    selectComponent = fixture.debugElement.query(By.directive(NbSelectComponent)).componentInstance;
  }));

  it('should mark touched if clicked outside of overlay and select', fakeAsync(() => {
    const touchedSpy = jasmine.createSpy('touched spy');
    selectComponent.registerOnTouched(touchedSpy);

    const elementOutsideSelect = fixture.debugElement.query(By.css('nb-layout')).nativeElement;
    selectComponent.show();
    fixture.detectChanges();

    hideTriggerStub.next({ target: elementOutsideSelect } as unknown as Event);

    expect(touchedSpy).toHaveBeenCalledTimes(1);
  }));

  it('should not mark touched if clicked on the select button', fakeAsync(() => {
    const touchedSpy = jasmine.createSpy('touched spy');
    selectComponent.registerOnTouched(touchedSpy);

    const selectButton = fixture.debugElement.query(By.css('.select-button')).nativeElement;
    selectComponent.show();
    fixture.detectChanges();

    hideTriggerStub.next({ target: selectButton } as unknown as Event);

    expect(touchedSpy).not.toHaveBeenCalled();
  }));
});

describe('NbSelectComponent - Key manager', () => {
  let fixture: ComponentFixture<BasicSelectTestComponent>;
  let selectComponent: NbSelectComponent<any>;
  let tabOutStub: Subject<void>;
  let keyManagerFactoryStub;
  let keyManagerStub;

  beforeEach(fakeAsync(() => {
    tabOutStub = new Subject<void>();
    keyManagerStub = {
      withTypeAhead() { return this; },
      setActiveItem() {},
      setFirstItemActive() {},
      onKeydown() {},
      tabOut: tabOutStub,
    };
    keyManagerFactoryStub = { create() { return keyManagerStub; } };

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]), NbThemeModule.forRoot(), NbLayoutModule, NbSelectModule ],
      declarations: [ BasicSelectTestComponent ],
    });
    TestBed.overrideProvider(NbFocusKeyManagerFactoryService, { useValue: keyManagerFactoryStub });

    fixture = TestBed.createComponent(BasicSelectTestComponent);
    fixture.detectChanges();
    flush();

    selectComponent = fixture.debugElement.query(By.directive(NbSelectComponent)).componentInstance;
  }));

  it('should mark touched when tabbing out from options list', fakeAsync(() => {
    selectComponent.show();
    fixture.detectChanges();

    const touchedSpy = jasmine.createSpy('touched spy');
    selectComponent.registerOnTouched(touchedSpy);
    tabOutStub.next();
    flush();
    expect(touchedSpy).toHaveBeenCalledTimes(1);
  }));
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
    option = testSelectComponent.optionComponents.first;
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

describe('NbOptionComponent disabled', () => {
  let fixture: ComponentFixture<NbOptionDisabledTestComponent>;
  let testComponent: NbOptionDisabledTestComponent;
  let selectComponent: NbSelectComponent<number>;
  let optionGroupComponent: NbOptionGroupComponent;
  let optionComponent: NbOptionComponent<number>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbSelectModule,
      ],
      declarations: [ NbOptionDisabledTestComponent ],
    });

    fixture = TestBed.createComponent(NbOptionDisabledTestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
    flush();

    selectComponent = testComponent.selectComponent;
    optionGroupComponent = testComponent.optionGroupComponent;
    optionComponent = testComponent.optionComponent;
  }));

  it('should has disabled attribute if disabled set to true', () => {
    selectComponent.show();
    testComponent.optionDisabled = true;
    fixture.detectChanges();

    const option = fixture.debugElement.query(By.directive(NbOptionComponent));
    expect(option.attributes.disabled).toEqual('');
  });

  it('should has disabled attribute if group disabled set to true', fakeAsync(() => {
    selectComponent.show();
    testComponent.optionGroupDisabled = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    const option = fixture.debugElement.query(By.directive(NbOptionComponent));
    expect(option.attributes.disabled).toEqual('');
  }));
});

describe('NbSelect - dynamic options', () => {
  let fixture: ComponentFixture<NbReactiveFormSelectComponent>;
  let testComponent: NbReactiveFormSelectComponent;

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
      declarations: [ NbReactiveFormSelectComponent ],
    });

    fixture = TestBed.createComponent(NbReactiveFormSelectComponent);
    testComponent = fixture.componentInstance;
  });

  describe('Set value from queue', () => {
    let selectComponent: NbSelectComponent<number>;

    beforeEach(() => {
      // Force select to cache the value as there is no options to select.
      testComponent.options = [];
      testComponent.formControl = new FormControl(1);
      fixture.detectChanges();

      selectComponent = fixture.debugElement
        .query(By.directive(NbSelectComponent)).componentInstance;
    });

    it('should set value from queue when options added dynamically (after change detection run)', fakeAsync(() => {
      expect(selectComponent.selectionModel.length).toEqual(0);

      testComponent.options = [1];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(selectComponent.selectionModel[0]).toEqual(testComponent.optionComponents.first);
    }));

    it('should set value from queue when options change', fakeAsync(() => {
      testComponent.options = [0];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(selectComponent.selectionModel.length).toEqual(0);

      testComponent.options.push(1);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(selectComponent.selectionModel[0]).toEqual(testComponent.optionComponents.last);
    }));
  });

  describe('Clear queue after value set', () => {
    /*
      We can ensure queue is clean by spying on `writeValue` calls on select. It will be called only if options
      change and queue has a value.
    */

    it('should clear queue after option selected by click', fakeAsync(() => {
      testComponent.options = [];
      testComponent.formControl = new FormControl(1);
      fixture.detectChanges();

      const selectComponent: NbSelectComponent<number> = fixture.debugElement
        .query(By.directive(NbSelectComponent)).componentInstance;
      testComponent.options = [0];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      testComponent.optionComponents.first.onClick({ preventDefault() {} } as Event);
      fixture.detectChanges();

      const writeValueSpy = spyOn(selectComponent, 'writeValue').and.callThrough();
      testComponent.options.push(1);
      fixture.detectChanges();
      flush();
      expect(writeValueSpy).not.toHaveBeenCalled();
    }));

    it(`should clear queue after option selected via 'selected' input`, fakeAsync(() => {
      testComponent.options = [];
      testComponent.formControl = new FormControl(1);
      fixture.detectChanges();

      const selectComponent: NbSelectComponent<number> = fixture.debugElement
        .query(By.directive(NbSelectComponent)).componentInstance;
      testComponent.options = [0];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      selectComponent.selected = 0;
      fixture.detectChanges();

      const writeValueSpy = spyOn(selectComponent, 'writeValue').and.callThrough();
      testComponent.options.push(1);
      fixture.detectChanges();
      flush();
      expect(writeValueSpy).not.toHaveBeenCalled();
    }));

    it('should clear queue after options change and selection model change', fakeAsync(() => {
      testComponent.options = [];
      testComponent.formControl = new FormControl(1);
      fixture.detectChanges();

      const selectComponent: NbSelectComponent<number> = fixture.debugElement
        .query(By.directive(NbSelectComponent)).componentInstance;
      const writeValueSpy = spyOn(selectComponent, 'writeValue').and.callThrough();

      testComponent.options = [1];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(writeValueSpy).toHaveBeenCalledTimes(1);

      testComponent.options.push(2);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(writeValueSpy).toHaveBeenCalledTimes(1);
    }));

    it('should not clear queue after options change and selection model is empty', fakeAsync(() => {
      testComponent.options = [];
      testComponent.formControl = new FormControl(2);
      fixture.detectChanges();

      const selectComponent: NbSelectComponent<number> = fixture.debugElement
        .query(By.directive(NbSelectComponent)).componentInstance;
      const writeValueSpy = spyOn(selectComponent, 'writeValue').and.callThrough();

      testComponent.options = [0];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(writeValueSpy).toHaveBeenCalledTimes(1);

      testComponent.options.push(1);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(writeValueSpy).toHaveBeenCalledTimes(2);
    }));
  });
});
