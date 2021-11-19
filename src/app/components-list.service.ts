import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentLink, PLAYGROUND_COMPONENTS } from './playground-components';

@Injectable({
  providedIn: 'root',
})
export class ComponentsListService {
  private inputSearch$ = new BehaviorSubject<string>('');
  private activeElementIndex$ = new BehaviorSubject<number>(0);
  private flatFilteredComponentLinkList$ = new BehaviorSubject<ComponentLink[]>([]);

  selected$ = combineLatest([this.flatFilteredComponentLinkList$, this.activeElementIndex$]).pipe(
    map(([flatArray, index]) => {
      return flatArray[index]?.link;
    }),
  );
  componentsList$: Observable<ComponentLink[]> = this.inputSearch$.pipe(
    map((inputValue) => {
      const filteredComponentLinkList = this.filter(inputValue);
      const flatFilteredComponentLinkList = this.flatComponentsList(filteredComponentLinkList);
      this.flatFilteredComponentLinkList$.next(flatFilteredComponentLinkList);
      return filteredComponentLinkList;
    }),
  );

  updateSearch(value: string): void {
    this.activeElementIndex$.next(0);
    this.inputSearch$.next(value);
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
