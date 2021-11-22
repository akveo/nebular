import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ComponentLink, PLAYGROUND_COMPONENTS } from './playground-components';

@Injectable({
  providedIn: 'root',
})
export class ComponentsListService {
  private readonly searchString$ = new BehaviorSubject<string>('');
  private readonly activeElementIndex$ = new BehaviorSubject<number>(0);

  readonly componentsList$: Observable<ComponentLink[]> = this.searchString$.pipe(
    map((searchString: string) => this.filter(searchString)),
  );

  private readonly flatFilteredComponentsList$ = this.componentsList$.pipe(
    map((components: ComponentLink[]) => this.flatComponentsList(components)),
  );

  readonly selectedLink$: Observable<string> = combineLatest([
    this.flatFilteredComponentsList$,
    this.activeElementIndex$,
  ]).pipe(
    map(([filteredComponents, activeElementIndex]: [ComponentLink[], number]) => {
      return filteredComponents[activeElementIndex].link;
    }),
  );

  updateSearch(searchString: string): void {
    this.activeElementIndex$.next(0);
    this.searchString$.next(searchString);
  }

  selectNextComponent(): void {
    this.flatFilteredComponentsList$
      .pipe(
        map((components: ComponentLink[]) => components.length),
        take(1),
      )
      .subscribe((componentsListLength: number) => {
        const nextElementIndex = this.activeElementIndex$.value + 1;
        const filteredElementLength = componentsListLength - 1;

        this.activeElementIndex$.next(nextElementIndex > filteredElementLength ? 0 : nextElementIndex);
      });
  }

  selectPreviousComponent(): void {
    this.flatFilteredComponentsList$
      .pipe(
        map((components: ComponentLink[]) => components.length),
        take(1),
      )
      .subscribe((componentsListLength: number) => {
        const prevElementIndex = this.activeElementIndex$.value - 1;
        const filteredElementLength = componentsListLength - 1;

        this.activeElementIndex$.next(prevElementIndex < 0 ? filteredElementLength : prevElementIndex);
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
