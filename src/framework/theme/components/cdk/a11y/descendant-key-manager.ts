import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { QueryList } from '@angular/core';

export type NbHighlightableOption = Highlightable;
export class NbActiveDescendantKeyManager<T> extends ActiveDescendantKeyManager<T> {}

export class NbActiveDescendantKeyManagerFactoryService<T extends NbHighlightableOption> {
  create(items: QueryList<T> | T[]): NbActiveDescendantKeyManager<T> {
    return new NbActiveDescendantKeyManager<T>(items);
  }
}
