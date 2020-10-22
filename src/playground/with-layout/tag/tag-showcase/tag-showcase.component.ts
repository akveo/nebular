import { Component } from '@angular/core';
import {of, Subject} from 'rxjs';
import {delay, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-tag-showcase',
  template: `
    <nb-tag text="Test" (close)="closed$.next($event)"></nb-tag>
    <nb-tag text="Test2" (close)="closed$.next($event)"></nb-tag>
    <nb-tag text="Test3" (close)="closed$.next($event)"></nb-tag>
    <div> {{ display$ | async }} </div>
  `,
  styleUrls: ['./tag-showcase.component.scss'],
})
export class TagShowcaseComponent {

  closed$ = new Subject<String>();

  display$ = this.closed$.pipe(
    switchMap(text => of('').pipe(
      delay(1500),
      startWith(text + ' closed'),
    )),
  );

}
