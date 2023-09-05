import { Component } from '@angular/core';

@Component({
  selector: 'npg-menu-item1',
  template: ` <h1>Menu Item #1</h1> `,
})
export class MenuItem1Component {}

@Component({
  selector: 'npg-menu-item2',
  template: ` <h1>Menu Item #2</h1> `,
})
export class MenuItem2Component {}

@Component({
  selector: 'npg-menu-item3',
  template: ` <router-outlet></router-outlet> `,
})
export class MenuItem3Component {}

@Component({
  selector: 'npg-menu-item31',
  template: ` <h1>Menu Item #3.1</h1> `,
})
export class MenuItem31Component {}

@Component({
  selector: 'npg-menu-item32',
  template: ` <h1>Menu Item #3.2</h1> `,
})
export class MenuItem32Component {}

@Component({
  selector: 'npg-menu-item33',
  template: ` <router-outlet></router-outlet> `,
})
export class MenuItem33Component {}

@Component({
  selector: 'npg-menu-item331',
  template: ` <h1>Menu Item #3.3.1</h1> `,
})
export class MenuItem331Component {}

@Component({
  selector: 'npg-menu-item332',
  template: ` <h1>Menu Item #3.3.2</h1> `,
})
export class MenuItem332Component {}

@Component({
  selector: 'npg-menu-item4',
  template: ` <h1>Menu Item #4</h1> `,
})
export class MenuItem4Component {}
