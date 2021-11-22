import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ComponentLink, PLAYGROUND_COMPONENTS } from './playground-components';

@Injectable({
  providedIn: 'root',
})
export class ComponentsListService {
  private readonly searchString$ = new BehaviorSubject<string>('');
  private readonly selectedIndex$ = new BehaviorSubject<number>(0);

  readonly componentsList$: Observable<ComponentLink[]> = this.searchString$.pipe(
    map((searchString: string) => this.filter(searchString)),
  );

  private readonly flatFilteredComponentsList$ = this.componentsList$.pipe(
    map((components: ComponentLink[]) => this.flatComponentsList(components)),
  );

  readonly selectedLink$: Observable<string> = combineLatest([
    this.flatFilteredComponentsList$,
    this.selectedIndex$,
  ]).pipe(
    map(([filteredComponents, activeElementIndex]: [ComponentLink[], number]) => {
      return filteredComponents[activeElementIndex].link;
    }),
  );

  updateSearch(searchString: string): void {
    this.selectedIndex$.next(0);
    this.searchString$.next(searchString);
  }

  selectNextComponent(): void {
    this.moveSelection(1);
  }

  selectPreviousComponent(): void {
    this.moveSelection(-1);
  }

  private moveSelection(offset: 1 | -1): void {
    combineLatest([this.selectedIndex$, this.flatFilteredComponentsList$])
      .pipe(
        map(([selectedIndex, components]: [number, ComponentLink[]]) => [selectedIndex, components.length]),
        take(1),
      )
      .subscribe(([selectedIndex, length]: number[]) => {
        const indexToSelect = selectedIndex + offset;
        if (indexToSelect >= 0 && indexToSelect < length) {
          return indexToSelect;
        }
        // If we went out of bounds when moving forward (offset === 1), we should select the first element.
        // Otherwise, we're moving backward, and after we pass the first element,
        // we move the selection to the last one (length - 1).
        if (offset === 1) {
          return 0;
        } else {
          return length - 1;
        }
      });
  }

  private flatComponentsList(componentLink: ComponentLink[]): ComponentLink[] {
    return componentLink.reduce((acc: ComponentLink[], item) => {
      if (item.link) {
        acc.push({
          component: item.component,
          link: item.link,
          name: item.name,
          path: item.path,
        });
      }
      if (item.children) {
        acc = [...acc, ...this.flatComponentsList(item.children)];
      }
      return acc;
    }, []);
  }

  private filter(searchString: string): ComponentLink[] {
    if (searchString === '') {
      return PLAYGROUND_COMPONENTS;
    }

    const getNodes = (components: ComponentLink[], componentLink: ComponentLink) => {
      if (componentLink.name?.toLowerCase().includes(searchString)) {
        components.push(componentLink);
        return components;
      }
      if (componentLink.children) {
        const children = componentLink.children.reduce(getNodes, []);
        if (children.length) {
          components.push({ ...componentLink, children });
        }
      }
      return components;
    };

    return PLAYGROUND_COMPONENTS.reduce(getNodes, []);
  }
}
