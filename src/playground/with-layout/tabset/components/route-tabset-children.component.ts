import { Component } from '@angular/core';

@Component({
  selector: 'nb-route-tabset-showcase-child1',
  template: `<p>List of <strong>users</strong>.</p>`,
  styles: [`
    :host p {
      padding: 1.25rem;
    }
  `],
})
export class RouteTabsetShowcaseChild1Component {
}

@Component({
  selector: 'nb-route-tabset-showcase-child2',
  template: `<p>List of <strong>orders</strong>.</p>`,
  styles: [`
    :host p {
      padding: 1.25rem;
    }
  `],
})
export class RouteTabsetShowcaseChild2Component {
}
