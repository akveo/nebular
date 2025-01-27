import { Component } from '@angular/core';

@Component({
  selector: 'nb-menu-item1',
  template: ` <h1>Menu Item #1</h1> `,
  standalone: false,
})
export class MenuItem1Component {}

@Component({
  selector: 'nb-menu-item2',
  template: ` <h1>Menu Item #2</h1> `,
  standalone: false,
})
export class MenuItem2Component {}

@Component({
  selector: 'nb-menu-item3',
  template: ` <router-outlet></router-outlet> `,
  standalone: false,
})
export class MenuItem3Component {}

@Component({
  selector: 'nb-menu-item31',
  template: ` <h1>Menu Item #3.1</h1> `,
  standalone: false,
})
export class MenuItem31Component {}

@Component({
  selector: 'nb-menu-item32',
  template: ` <h1>Menu Item #3.2</h1> `,
  standalone: false,
})
export class MenuItem32Component {}

@Component({
  selector: 'nb-menu-item33',
  template: ` <router-outlet></router-outlet> `,
  standalone: false,
})
export class MenuItem33Component {}

@Component({
  selector: 'nb-menu-item331',
  template: ` <h1>Menu Item #3.3.1</h1> `,
  standalone: false,
})
export class MenuItem331Component {}

@Component({
  selector: 'nb-menu-item332',
  template: ` <h1>Menu Item #3.3.2</h1> `,
  standalone: false,
})
export class MenuItem332Component {}

@Component({
  selector: 'nb-menu-item4',
  template: ` <h1>Menu Item #4</h1> `,
  standalone: false,
})
export class MenuItem4Component {}
