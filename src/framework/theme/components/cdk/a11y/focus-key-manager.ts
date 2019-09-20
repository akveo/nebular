import { QueryList } from '@angular/core';
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';

export type NbFocusableOption = FocusableOption;
export class NbFocusKeyManager<T> extends FocusKeyManager<T> {}

export class NbFocusKeyManagerFactoryService<T extends NbFocusableOption> {
  create(items: QueryList<T> | T[]): NbFocusKeyManager<T> {
    return new NbFocusKeyManager<T>(items);
  }
}
