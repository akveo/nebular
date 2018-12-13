import { Component } from '@angular/core';

@Component({
  selector: 'nb-menu-item1',
  template: `
    <h1>Menu Item #1</h1>
  `,
})
export class NbMenuItem1Component { }

@Component({
  selector: 'nb-menu-item2',
  template: `
    <h1>Menu Item #2</h1>
  `,
})
export class NbMenuItem2Component { }

@Component({
  selector: 'nb-menu-item3',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NbMenuItem3Component { }

@Component({
  selector: 'nb-menu-item31',
  template: `
    <h1>Menu Item #3.1</h1>
  `,
})
export class NbMenuItem31Component { }

@Component({
  selector: 'nb-menu-item32',
  template: `
    <h1>Menu Item #3.2</h1>
  `,
})
export class NbMenuItem32Component { }

@Component({
  selector: 'nb-menu-item33',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NbMenuItem33Component { }

@Component({
  selector: 'nb-menu-item331',
  template: `
    <h1>Menu Item #3.3.1</h1>
  `,
})
export class NbMenuItem331Component { }

@Component({
  selector: 'nb-menu-item332',
  template: `
    <h1>Menu Item #3.3.2</h1>
  `,
})
export class NbMenuItem332Component { }

@Component({
  selector: 'nb-menu-item4',
  template: `
    <h1>Menu Item #4</h1>
  `,
})
export class NbMenuItem4Component { }
