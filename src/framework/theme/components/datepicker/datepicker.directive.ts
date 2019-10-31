/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Directive,
  ElementRef,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  Type,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { fromEvent, Observable, merge } from 'rxjs';
import { map, takeWhile, filter, take, tap } from 'rxjs/operators';

import { NB_DOCUMENT } from '../../theme.options';
import { NbDateService } from '../calendar-kit/services/date.service';


/**
 * The `NbDatepickerAdapter` instances provide way how to parse, format and validate
 * different date types.
 * */
export abstract class NbDatepickerAdapter<D> {
  /**
   * Picker component class.
   * */
  abstract picker: Type<any>;

  /**
   * Parse date string according to the format.
   * */
  abstract parse(value: string, format: string): D;

  /**
   * Format date according to the format.
   * */
  abstract format(value: D, format: string): string;

  /**
   * Validates date string according to the passed format.
   * */
  abstract isValid(value: string, format: string): boolean;
}

/**
 * Validators config that will be used by form control to perform proper validation.
 * */
export interface NbPickerValidatorConfig<D> {
  /**
   * Minimum date available in picker.
   * */
  min: D;

  /**
   * Maximum date available in picker.
   * */
  max: D;

  /**
   * Predicate that determines is value available for picking.
   * */
  filter: (D) => boolean;
}

/**
 * Datepicker is an control that can pick any values anyway.
 * It has to be bound to the datepicker directive through nbDatepicker input.
 * */
export abstract class NbDatepicker<T> {
  /**
   * HTML input element date format.
   * */
  abstract format: string;

  abstract get value(): T | undefined;

  abstract set value(value: T);

  abstract get valueChange(): Observable<T>;

  abstract get init(): Observable<void>;

  /**
   * Attaches datepicker to the native input element.
   * */
  abstract attach(hostRef: ElementRef);

  /**
   * Returns validator configuration based on the input properties.
   * */
  abstract getValidatorConfig(): NbPickerValidatorConfig<T>;

  abstract show();

  abstract hide();

  abstract shouldHide(): boolean;

  abstract get isShown(): boolean;

  abstract get blur(): Observable<void>;
}

export const NB_DATE_ADAPTER = new InjectionToken<NbDatepickerAdapter<any>>('Datepicker Adapter');

export const NB_DATE_SERVICE_OPTIONS = new InjectionToken('Date service options');

/**
 * The `NbDatepickerDirective` is form control that gives you ability to select dates and ranges. The datepicker
 * is shown when input receives a `focus` event.
 *
 * ```html
 * <input [nbDatepicker]="datepicker">
 * <nb-datepicker #datepicker></nb-datepicker>
 * ```
 *
 * @stacked-example(Showcase, datepicker/datepicker-showcase.component)
 *
 * ### Installation
 *
 * Import `NbDatepickerModule.forRoot()` to your root module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbDatepickerModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 * And `NbDatepickerModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbDatepickerModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If you want to use range selection, you have to use `NbRangepickerComponent` instead:
 *
 * ```html
 * <input [nbDatepicker]="rangepicker">
 * <nb-rangepicker #rangepicker></nb-rangepicker>
 * ```
 *
 * Both range and date pickers support all parameters as calendar, so, check `NbCalendarComponent` for additional
 * info.
 *
 * @stacked-example(Range showcase, datepicker/rangepicker-showcase.component)
 *
 * Datepicker is the form control so it can be bound with angular forms through ngModel and form controls.
 *
 * @stacked-example(Forms, datepicker/datepicker-forms.component)
 *
 * `NbDatepickerDirective` may be validated using `min` and `max` dates passed to the datepicker.
 * And `filter` predicate that receives date object and has to return a boolean value.
 *
 * @stacked-example(Validation, datepicker/datepicker-validation.component)
 *
 * The `NbDatepickerComponent` supports date formatting:
 *
 * ```html
 * <input [nbDatepicker]="datepicker">
 * <nb-datepicker #datepicker format="MM\dd\yyyy"></nb-datepicker>
 * ```
 *
 * ## Formatting Issue
 *
 * By default, datepicker uses angulars `LOCALE_ID` token for localization and `DatePipe` for dates formatting.
 * And native `Date.parse(...)` for dates parsing. But native `Date.parse` function doesn't support formats.
 * To provide custom formatting you have to use one of the following packages:
 *
 * - `@nebular/moment` - provides moment date adapter that uses moment for date objects. This means datepicker than
 * will operate only moment date objects. If you want to use it you have to install it: `npm i @nebular/moment`, and
 * import `NbMomentDateModule` from this package.
 *
 * - `@nebular/date-fns` - adapter for popular date-fns library. This way is preferred if you need only date formatting.
 * Because date-fns is treeshakable, tiny and operates native date objects. If you want to use it you have to
 * install it: `npm i @nebular/date-fns`, and import `NbDateFnsDateModule` from this package.
 *
 * ### NbDateFnsDateModule
 *
 * Format is required when using `NbDateFnsDateModule`. You can set it via `format` input on datepicker component:
 * ```html
 * <nb-datepicker format="dd.MM.yyyy"></nb-datepicker>
 * ```
 * Also format can be set globally with `NbDateFnsDateModule.forRoot({ format: 'dd.MM.yyyy' })` and
 * `NbDateFnsDateModule.forChild({ format: 'dd.MM.yyyy' })` methods.
 *
 * Please note to use some of the formatting tokens you also need to pass `{ awareOfUnicodeTokens: true }` to date-fns
 * parse and format functions. You can configure options passed this functions by setting `formatOptions` and
 * `parseOptions` of options object passed to `NbDateFnsDateModule.forRoot` and `NbDateFnsDateModule.forChild` methods.
 * ```ts
 * NbDateFnsDateModule.forRoot({
 *   parseOptions: { awareOfUnicodeTokens: true },
 *   formatOptions: { awareOfUnicodeTokens: true },
 * })
 * ```
 * Further info on `date-fns` formatting tokens could be found at
 * [date-fns docs](https://date-fns.org/v2.0.0-alpha.27/docs/Unicode-Tokens).
 *
 * You can also use `parseOptions` and `formatOptions` to provide locale.
 * ```ts
 * import { eo } from 'date-fns/locale';
 *
 * @NgModule({
 *   imports: [
 *     NbDateFnsDateModule.forRoot({
 *       parseOptions: { locale: eo },
 *       formatOptions: { locale: eo },
 *     }),
 *   ],
 * })
 * ```
 *
 * @styles
 *
 * datepicker-text-color:
 * datepicker-background-color:
 * datepicker-border-color:
 * datepicker-border-style:
 * datepicker-border-width:
 * datepicker-border-radius:
 * datepicker-shadow:
 * datepicker-arrow-size:
 * */
@Directive({
  selector: 'input[nbDatepicker]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbDatepickerDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NbDatepickerDirective),
      multi: true,
    },
  ],
})
export class NbDatepickerDirective<D> implements OnDestroy, ControlValueAccessor, Validator {
  /**
   * Provides datepicker component.
   * */
  @Input('nbDatepicker')
  set setPicker(picker: NbDatepicker<D>) {
    this.picker = picker;
    this.setupPicker();
  }

  /**
   * Datepicker adapter.
   * */
  protected datepickerAdapter: NbDatepickerAdapter<D>;

  /**
   * Datepicker instance.
   * */
  protected picker: NbDatepicker<D>;
  protected alive: boolean = true;
  protected isDatepickerReady: boolean = false;
  protected queue: D | undefined;
  protected onChange: (D) => void = () => {};
  protected onTouched: () => void = () => {};

  /**
   * Form control validators will be called in validators context, so, we need to bind them.
   * */
  protected validator: ValidatorFn = Validators.compose([
    this.parseValidator,
    this.minValidator,
    this.maxValidator,
    this.filterValidator,
  ].map(fn => fn.bind(this)));

  constructor(@Inject(NB_DOCUMENT) protected document,
              @Inject(NB_DATE_ADAPTER) protected datepickerAdapters: NbDatepickerAdapter<D>[],
              protected hostRef: ElementRef,
              protected dateService: NbDateService<D>,
              protected changeDetector: ChangeDetectorRef) {
    this.subscribeOnInputChange();
  }

  /**
   * Returns html input element.
   * */
  get input(): HTMLInputElement {
    return this.hostRef.nativeElement;
  }

  /**
   * Returns host input value.
   * */
  get inputValue(): string {
    return this.input.value;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Writes value in picker and html input element.
   * */
  writeValue(value: D) {
    if (this.isDatepickerReady) {
      this.writePicker(value);
      this.writeInput(value);
    } else {
      this.queue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.input.disabled = isDisabled;
  }

  /**
   * Form control validation based on picker validator config.
   * */
  validate(): ValidationErrors | null {
    return this.validator(null);
  }

  /**
   * Hides picker, focuses the input
   */
  protected hidePicker() {
    this.input.focus();
    this.picker.hide();
  }

  /**
   * Validates that we can parse value correctly.
   * */
  protected parseValidator(): ValidationErrors | null {
    /**
     * Date services treat empty string as invalid date.
     * That's why we're getting invalid formControl in case of empty input which is not required.
     * */
    if (this.inputValue === '') {
      return null;
    }

    const isValid = this.datepickerAdapter.isValid(this.inputValue, this.picker.format);
    return isValid ? null : { nbDatepickerParse: { value: this.inputValue } };
  }

  /**
   * Validates passed value is greater than min.
   * */
  protected minValidator(): ValidationErrors | null {
    const config = this.picker.getValidatorConfig();
    const date = this.datepickerAdapter.parse(this.inputValue, this.picker.format);
    return (!config.min || !date || this.dateService.compareDates(config.min, date) <= 0) ?
      null : { nbDatepickerMin: { min: config.min, actual: date } };
  }

  /**
   * Validates passed value is smaller than max.
   * */
  protected maxValidator(): ValidationErrors | null {
    const config = this.picker.getValidatorConfig();
    const date = this.datepickerAdapter.parse(this.inputValue, this.picker.format);
    return (!config.max || !date || this.dateService.compareDates(config.max, date) >= 0) ?
      null : { nbDatepickerMax: { max: config.max, actual: date } };
  }

  /**
   * Validates passed value satisfy the filter.
   * */
  protected filterValidator(): ValidationErrors | null {
    const config = this.picker.getValidatorConfig();
    const date = this.datepickerAdapter.parse(this.inputValue, this.picker.format);
    return (!config.filter || !date || config.filter(date)) ?
      null : { nbDatepickerFilter: true };
  }

  /**
   * Chooses datepicker adapter based on passed picker component.
   * */
  protected chooseDatepickerAdapter() {
    this.datepickerAdapter = this.datepickerAdapters.find(({ picker }) => this.picker instanceof picker);

    if (this.noDatepickerAdapterProvided()) {
      throw new Error('No datepickerAdapter provided for picker');
    }
  }

  /**
   * Attaches picker to the host input element and subscribes on value changes.
   * */
  protected setupPicker() {
    this.chooseDatepickerAdapter();
    this.picker.attach(this.hostRef);

    if (this.inputValue) {
      this.picker.value = this.datepickerAdapter.parse(this.inputValue, this.picker.format);
    }

    // In case datepicker component placed after the input with datepicker directive,
    // we can't read `this.picker.format` on first change detection run,
    // since it's not bound yet, so we have to wait for datepicker component initialization.
    if (!this.isDatepickerReady) {
      this.picker.init
        .pipe(
          takeWhile(() => this.alive),
          take(1),
          tap(() => this.isDatepickerReady = true),
          filter(() => !!this.queue),
        )
        .subscribe(() => {
          this.writeValue(this.queue);
          this.onChange(this.queue);
          this.changeDetector.detectChanges();
          this.queue = undefined;
        });
    }

    this.picker.valueChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((value: D) => {
        this.writePicker(value);
        this.writeInput(value);
        this.onChange(value);

        if (this.picker.shouldHide()) {
          this.hidePicker();
        }
      });

    merge(
      this.picker.blur,
      fromEvent(this.input, 'blur').pipe(
        filter(() => !this.picker.isShown && this.document.activeElement !== this.input),
      ),
    ).pipe(takeWhile(() => this.alive))
     .subscribe(() => this.onTouched());
  }

  protected writePicker(value: D) {
    this.picker.value = value;
  }

  protected writeInput(value: D) {
    const stringRepresentation = this.datepickerAdapter.format(value, this.picker.format);
    this.hostRef.nativeElement.value = stringRepresentation;
  }

  /**
   * Validates if no datepicker adapter provided.
   * */
  protected noDatepickerAdapterProvided(): boolean {
    return !this.datepickerAdapter || !(this.datepickerAdapter instanceof NbDatepickerAdapter);
  }

  protected subscribeOnInputChange() {
    fromEvent(this.input, 'input')
      .pipe(
        map(() => this.inputValue),
        takeWhile(() => this.alive),
      )
      .subscribe((value: string) => this.handleInputChange(value));
  }

  /**
   * Parses input value and write if it isn't null.
   * */
  protected handleInputChange(value: string) {
    const date = this.parseInputValue(value);

    this.onChange(date);
    this.writePicker(date);
  }

  protected parseInputValue(value): D | null {
    if (this.datepickerAdapter.isValid(value, this.picker.format)) {
      return this.datepickerAdapter.parse(value, this.picker.format);
    }

    return null;
  }
}
