import { Component, EventEmitter, Output, QueryList, ViewChild, ViewChildren, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subject, merge } from 'rxjs';

import {
  NB_DOCUMENT,
  NbOptionComponent,
  NbAutocompleteModule,
  NbThemeModule,
  NbLayoutModule,
  NbOverlayContainerAdapter,
  NbAutocompleteComponent,
  NbAutocompleteDirective,
  NbTriggerStrategyBuilderService,
  NbOverlayService,
  NbOverlayConfig,
  NbOverlayRef,
} from '@nebular/theme';

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

@Injectable()
class OverlayServiceWithManualKeyDownTrigger extends NbOverlayService {
  private manualKeyDown = new Subject<KeyboardEvent>();

  triggerKeydown(event: KeyboardEvent) {
    this.manualKeyDown.next(event);
  }

  create(config?: NbOverlayConfig): NbOverlayRef {
    const overlayRef = super.create(config);
    const originalObservable = overlayRef.keydownEvents();
    overlayRef.keydownEvents = () => merge(originalObservable, this.manualKeyDown);

    return overlayRef;
  }
}

@Component({
    selector: 'nb-autocomplete-test',
    template: `
    <nb-layout>
      <nb-layout-column>

        <input #autoInput
               nbInput
               type="text"
               (input)="onChange($event)"
               placeholder="This is test autocomplete component"
               [nbAutocomplete]="auto" />

        <nb-autocomplete #auto (selectedChange)="selectedChange.emit($event)" [handleDisplayFn]="handleFunction">

          <nb-option-group *ngFor="let group of filteredGroups" [title]="group.title">
            <nb-option *ngFor="let option of group.options" [value]="option.value">
              {{ option.title }}
            </nb-option>
          </nb-option-group>

        </nb-autocomplete>

      </nb-layout-column>
    </nb-layout>
  `,
    standalone: false
})
export class NbAutocompleteTestComponent {

  @Output() selectedChange: EventEmitter<any> = new EventEmitter();
  @ViewChild(NbAutocompleteDirective) autocompleteDirective: NbAutocompleteDirective<string>;
  @ViewChild(NbAutocompleteComponent) autocompletePanel: NbAutocompleteComponent<string>
  @ViewChildren(NbOptionComponent) options: QueryList<NbOptionComponent<any>>;

  @ViewChild('autoInput') input: HTMLInputElement;

  groups = TEST_GROUPS;
  filteredGroups;

  constructor() {
    this.filteredGroups = this.groups;
  }

  handleFunction(item) {
    return item.value;
  }

  onChange($event) {
    this.filteredGroups = this.filter(this.input.value);
  }

  onSelectionChange($event) {
    this.filteredGroups = this.filter($event);
  }

  private filterOptions(options: any[], value: string) {
    return options.filter(item => item.toLowerCase().includes(value));
  }

  private filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.groups
      .map(group => {
        return {
          title: group.title,
          options: this.filterOptions(group.options, filterValue),
        }
      })
      .filter(group => group.options.length);
    }
}

describe('Component: NbAutocompleteComponent', () => {
  let fixture: ComponentFixture<NbAutocompleteTestComponent>;
  let overlayContainerService: NbOverlayContainerAdapter;
  let overlayContainer: HTMLElement;
  let document: Document;
  let input: HTMLInputElement;
  let autocompleteDirective: NbAutocompleteDirective<string>;

  let triggerBuilderStub;
  let showTriggerStub: Subject<Event>;
  let hideTriggerStub: Subject<Event>;

  const openPanel = () => {
    autocompleteDirective.show();
    fixture.detectChanges();
  };

  beforeEach(() => {

    showTriggerStub = new Subject<Event>();
    hideTriggerStub = new Subject<Event>();
    triggerBuilderStub = {
      trigger() { return this },
      host() { return this },
      container() { return this },
      build() {
        return { show$: showTriggerStub, hide$: hideTriggerStub, destroy() {} };
      },
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbAutocompleteModule,
      ],
      declarations: [
        NbAutocompleteTestComponent,
      ],
      providers: [
        { provide: NbTriggerStrategyBuilderService, useValue: triggerBuilderStub },
        { provide: NbOverlayService, useClass: OverlayServiceWithManualKeyDownTrigger },
      ],
    });

    fixture = TestBed.createComponent(NbAutocompleteTestComponent);
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('input')).nativeElement;
    autocompleteDirective = fixture.componentInstance.autocompleteDirective;
    document = TestBed.inject(NB_DOCUMENT);

    overlayContainerService = TestBed.inject(NbOverlayContainerAdapter);
    overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);

    fixture.detectChanges();
  });

  afterEach(() => {
    autocompleteDirective.hide();
    overlayContainerService.clearContainer();
  });


  it('should emit selectedChange option when option clicked', (done) => {
    openPanel();

    fixture.componentInstance.selectedChange.subscribe(selection => {
      expect(selection).toBe('Option 1');
      done();
    });

    const option = overlayContainer.querySelectorAll('nb-option')[0];
    option.dispatchEvent(new Event('click'));
  });

  it('should open overlay with options when show is triggered', () => {
    expect(autocompleteDirective.isClosed).toBe(true);
    expect(overlayContainer.querySelector('nb-option-list')).toBeFalsy();

    showTriggerStub.next({ target: input } as unknown as Event);

    expect(autocompleteDirective.isOpen).toBe(true);
    expect(overlayContainer.querySelector('nb-option-list')).toBeTruthy();
  });

  it('should close overlay with options when hide is triggered', () => {
    openPanel();

    expect(autocompleteDirective.isOpen).toBe(true);
    expect(overlayContainer.querySelector('nb-option-list')).toBeTruthy();

    hideTriggerStub.next({ target: input } as unknown as Event);

    expect(autocompleteDirective.isClosed).toBe(true);
    expect(overlayContainer.querySelector('nb-option-list')).toBeFalsy();
  });

  it('should close overlay when option clicked', () => {
    openPanel();
    const option = overlayContainer.querySelectorAll('nb-option')[0];
    option.dispatchEvent(new Event('click'));
    expect(autocompleteDirective.isClosed).toBe(true);
    expect(overlayContainer.querySelector('nb-option-list')).toBeFalsy();
  });

  it('should open overlay programmatically', () => {
    openPanel();
    autocompleteDirective.show();
    expect(autocompleteDirective.isOpen).toBe(true);
    expect(overlayContainer.querySelector('nb-option-list')).toBeTruthy();
  });

  it('should close overlay programmatically', () => {
    openPanel();
    autocompleteDirective.hide();
    expect(autocompleteDirective.isClosed).toBe(true);
    expect(overlayContainer.querySelector('nb-option-list')).toBeFalsy();
  });

  it('should not close overlay when click input', () => {
    openPanel();
    input.dispatchEvent(new Event('click'));
    expect(autocompleteDirective.isOpen).toBe(true);
    expect(overlayContainer.querySelector('nb-option-list')).toBeTruthy();
  });

  it('should fill input when click option', () => {
    openPanel();
    const option = overlayContainer.querySelectorAll('nb-option')[0];
    option.dispatchEvent(new Event('click'));
    expect(option.textContent).toContain(input.textContent);
  });

  it('should fill input when click option', () => {
    openPanel();
    const option = overlayContainer.querySelectorAll('nb-option')[0];
    option.dispatchEvent(new Event('click'));

    expect(option.textContent).toContain(input.textContent);
  });

  it('should make option active when DOWN_ARROW pressed', () => {
    openPanel();

    const overlayService = TestBed.inject(NbOverlayService) as OverlayServiceWithManualKeyDownTrigger;
    overlayService.triggerKeydown(new KeyboardEvent('keydown', <any> { keyCode: 40 }))
    fixture.detectChanges();

    const option = overlayContainer.querySelectorAll('nb-option')[0];
    expect(option.classList).toContain('active')
  });

  it('should fill input when ENTER pressed', () => {
    openPanel();
    const option = overlayContainer.querySelectorAll('nb-option')[0];

    const overlayService = TestBed.inject(NbOverlayService) as OverlayServiceWithManualKeyDownTrigger;
    overlayService.triggerKeydown(new KeyboardEvent('keydown', <any> { keyCode: 40 }));
    overlayService.triggerKeydown(new KeyboardEvent('keydown', <any> { keyCode: 13 }));

    expect(autocompleteDirective.isClosed).toBe(true);
    expect(option.textContent).toContain(input.textContent);
  });


  it('should close when ESC pressed', () => {
    openPanel();

    const overlayService = TestBed.inject(NbOverlayService) as OverlayServiceWithManualKeyDownTrigger;
    overlayService.triggerKeydown(new KeyboardEvent('keydown', <any> { keyCode: 27 }));
    fixture.detectChanges();

    expect(autocompleteDirective.isClosed).toBe(true);
  });

  it('should update disabled state', () => {
    autocompleteDirective.setDisabledState(true);
    fixture.detectChanges();
    expect(input.disabled).toBe(true);

    autocompleteDirective.setDisabledState(false);
    fixture.detectChanges();
    expect(input.disabled).toBe(false);
  });

});
