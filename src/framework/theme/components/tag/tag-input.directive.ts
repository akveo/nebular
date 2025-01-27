/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  Output,
  Renderer2,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { NbStatusService } from '../../services/status.service';
import { NbFocusMonitor } from '../cdk/a11y/a11y.module';
import { ENTER } from '../cdk/keycodes/keycodes';
import { NbFormFieldControl } from '../form-field/form-field-control';
import { NbInputDirective } from '../input/input.directive';

export interface NbTagInputAddEvent {
  input: ElementRef<HTMLInputElement>;
  value: string;
}

/**
 *
 * `[nbTagInput]` directive connects input with a `nb-tag-list` component.
 *
 * @stacked-example(Tag Input, tag/tag-input.component)
 *
 * @additional-example(Tag Input with Autocomplete, tag/tag-input-with-autocomplete.component)
 *
 * @styles
 *
 * tag-list-tiny-tag-offset:
 * tag-list-small-tag-offset:
 * tag-list-medium-tag-offset:
 * tag-list-large-tag-offset:
 * tag-list-giant-tag-offset:
 * tag-list-with-input-tiny-padding:
 * tag-list-with-input-small-padding:
 * tag-list-with-input-medium-padding:
 * tag-list-with-input-large-padding:
 * tag-list-with-input-giant-padding:
 */
@Directive({
  selector: 'input[nbTagInput]',
  exportAs: 'nbTagInput',
  providers: [{ provide: NbFormFieldControl, useExisting: NbTagInputDirective }],
  standalone: false,
})
export class NbTagInputDirective extends NbInputDirective implements AfterViewInit {
  protected readonly keyDown$: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();

  get _value(): string {
    return this._hostElement.nativeElement.value;
  }

  /**
   * Controls which keys should trigger tag add event.
   */
  @Input() separatorKeys: number[] = [ENTER];

  /**
   * Emits when a tag need to be added.
   */
  @Output() tagAdd: EventEmitter<NbTagInputAddEvent> = new EventEmitter<NbTagInputAddEvent>();

  @HostBinding('class.nb-tag-input') readonly nbTagInputClass = true;

  @HostListener('keydown', ['$event'])
  _onKeydown(event: KeyboardEvent): void {
    this.keyDown$.next(event);
  }

  constructor(
    public _hostElement: ElementRef<HTMLInputElement>,
    protected focusMonitor: NbFocusMonitor,
    protected renderer: Renderer2,
    protected zone: NgZone,
    protected statusService: NbStatusService,
  ) {
    super(_hostElement, focusMonitor, renderer, zone, statusService);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.keyDown$
      .pipe(
        filter(({ keyCode }: KeyboardEvent) => this.isSeparatorKey(keyCode)),
        map(() => this._value),
        takeUntil(this.destroy$),
      )
      .subscribe((value: string) => this.tagAdd.emit({ value, input: this._hostElement }));
  }

  protected isSeparatorKey(keyCode: number): boolean {
    return this.separatorKeys.includes(keyCode);
  }
}
