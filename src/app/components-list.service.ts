import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentLink, PLAYGROUND_COMPONENTS } from './playground-components';

@Injectable({
  providedIn: 'root',
})
export class ComponentsListSearchService {
  activeElementIndex$ = new BehaviorSubject<number>(0);
  inputSearch$ = new BehaviorSubject<string>('');
  flatFilteredComponentLinkList$ = new BehaviorSubject<ComponentLink[]>([]);
  selectedElement$ = new BehaviorSubject<string | any[]>('');
  componentsList$: Observable<ComponentLink[]> = this.inputSearch$.pipe(
    map((inputValue) => {
      const filteredComponentLinkList = this.filterComponentLinkList(inputValue);
      const flatFilteredComponentLinkList = this.flatFilteredComponentLinkList(filteredComponentLinkList);
      this.flatFilteredComponentLinkList$.next(flatFilteredComponentLinkList);
      return filteredComponentLinkList;
    }),
  );

  private flatFilteredComponentLinkList(componentLink: ComponentLink[]): ComponentLink[] {
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
        acc = [...acc, ...this.flatFilteredComponentLinkList(item.children)];
      }
      return acc;
    }, []);
  }

  private filterComponentLinkList(searchString: string): ComponentLink[] {
    const getNodes = (result: ComponentLink[], object: ComponentLink) => {
      if (object.name?.toLocaleLowerCase().includes(searchString)) {
        result.push(object);
        return result;
      }
      if (object.children) {
        const children = object.children.reduce(getNodes, []);
        if (children.length) result.push({ ...object, children });
      }
      return result;
    };

    return PLAYGROUND_COMPONENTS.reduce(getNodes, []);
  }
}
