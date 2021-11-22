import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentLink, PLAYGROUND_COMPONENTS } from './playground-components';

@Injectable({
  providedIn: 'root',
})
export class ComponentsListService {
  private readonly searchString$ = new BehaviorSubject<string>('');
  private readonly activeElementIndex$ = new BehaviorSubject<number>(0);
  private readonly flatFilteredComponentLinkList$ = new BehaviorSubject<ComponentLink[]>([]);

  readonly selectedLink$ = combineLatest([this.flatFilteredComponentLinkList$, this.activeElementIndex$]).pipe(
    map(([filteredComponents, activeElementIndex]: [ComponentLink[], number]) => {
      return filteredComponents[activeElementIndex]?.link;
    }),
  );

  readonly componentsList$: Observable<ComponentLink[]> = this.searchString$.pipe(
    map((searchString) => {
      const filteredComponentLinkList = this.filter(searchString);
      const flatFilteredComponentLinkList = this.flatComponentsList(filteredComponentLinkList);
      this.flatFilteredComponentLinkList$.next(flatFilteredComponentLinkList);
      return filteredComponentLinkList;
    }),
  );

  updateSearch(searchString: string): void {
    this.activeElementIndex$.next(0);
    this.searchString$.next(searchString);
  }

  selectNextComponent(): void {
    const nextElementIndex = this.activeElementIndex$.value + 1;
    const filteredElementLength = this.flatFilteredComponentLinkList$.value.length - 1;

    this.activeElementIndex$.next(nextElementIndex > filteredElementLength ? 0 : nextElementIndex);
  }

  selectPreviousComponent(): void {
    const prevElementIndex = this.activeElementIndex$.value - 1;
    const filteredElementLength = this.flatFilteredComponentLinkList$.value.length - 1;

    this.activeElementIndex$.next(prevElementIndex < 0 ? filteredElementLength : prevElementIndex);
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
