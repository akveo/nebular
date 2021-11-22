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

  readonly selected$ = combineLatest([this.flatFilteredComponentLinkList$, this.activeElementIndex$]).pipe(
    map(([flatArray, index]) => {
      return flatArray[index]?.link;
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
    const getNodes = (result: ComponentLink[], object: ComponentLink) => {
      if (object.name?.toLowerCase().includes(searchString)) {
        result.push(object);
        return result;
      }
      if (object.children) {
        const children = object.children.reduce(getNodes, []);
        if (children.length) {
          result.push({ ...object, children });
        }
      }
      return result;
    };

    return PLAYGROUND_COMPONENTS.reduce(getNodes, []);
  }
}
