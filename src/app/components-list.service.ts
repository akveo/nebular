import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { ComponentLink, PLAYGROUND_COMPONENTS } from './playground-components';

@Injectable({
  providedIn: 'root',
})
export class ComponentsListService {
  private readonly searchString$ = new BehaviorSubject<string>('');
  private readonly selectedLinkIndex$ = new BehaviorSubject<number>(0);

  readonly components$: Observable<ComponentLink[]> = this.searchString$.pipe(
    map((searchString: string) => this.filter(searchString)),
    shareReplay(1),
  );

  private readonly componentLinks$ = this.components$.pipe(
    map((components: ComponentLink[]) => this.extractLinks(components)),
    shareReplay(1),
  );

  readonly selectedLink$: Observable<string> = combineLatest([this.componentLinks$, this.selectedLinkIndex$]).pipe(
    map(([filteredComponents, activeElementIndex]) => filteredComponents[activeElementIndex]),
    shareReplay(1),
  );

  updateSearch(searchString: string): void {
    this.selectedLinkIndex$.next(0);
    this.searchString$.next(searchString);
  }

  selectNextComponent(): void {
    this.moveSelection(1);
  }

  selectPreviousComponent(): void {
    this.moveSelection(-1);
  }

  private moveSelection(offset: 1 | -1): void {
    combineLatest([this.selectedLinkIndex$, this.componentLinks$])
      .pipe(
        map(([selectedIndex, components]: [number, string[]]) => [selectedIndex, components.length]),
        take(1),
      )
      .subscribe(([selectedIndex, length]: number[]) => {
        let indexToSelect = selectedIndex + offset;
        const isOutOfBounds = indexToSelect < 0 || indexToSelect >= length;
        // If we went out of bounds when moving forward (offset === 1), we should select the first element.
        // Otherwise, we're moving backward, and after we pass the first element,
        // we move the selection to the last one (length - 1).
        if (isOutOfBounds && offset === 1) {
          indexToSelect = 0;
        }
        if (isOutOfBounds && offset === -1) {
          indexToSelect = length - 1;
        }
        this.selectedLinkIndex$.next(indexToSelect);
      });
  }

  private extractLinks(componentLink: ComponentLink[]): string[] {
    return componentLink.reduce((acc: string[], item) => {
      if (item.link) {
        acc.push(item.link);
      }
      if (item.children) {
        acc = [...acc, ...this.extractLinks(item.children)];
      }
      return acc;
    }, []);
  }

  private filter(searchString: string): ComponentLink[] {
    if (searchString === '') {
      return PLAYGROUND_COMPONENTS;
    }

    const filterBySearchString = (components: ComponentLink[], componentLink: ComponentLink) => {
      if (componentLink.name?.toLowerCase().includes(searchString)) {
        components.push(componentLink);
        return components;
      }
      if (componentLink.children) {
        const children = componentLink.children.reduce(filterBySearchString, []);
        if (children.length) {
          components.push({ ...componentLink, children });
        }
      }
      return components;
    };

    return PLAYGROUND_COMPONENTS.reduce(filterBySearchString, []);
  }
}
