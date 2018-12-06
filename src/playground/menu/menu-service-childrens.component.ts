/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component} from '@angular/core';

@Component({
  selector: 'nb-menu-item1',
  template: `
    <h1>Home</h1>
  `,
})
export class NbMenuServiceItem1Component { }

@Component({
  selector: 'nb-menu-item2',
  template: `
    <h1>User account</h1>
  `,
})
export class NbMenuServiceItem2Component { }

@Component({
  selector: 'nb-menu-item3',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NbMenuServiceItem3Component { }

@Component({
  selector: 'nb-menu-item31',
  template: `
    <h1>Services</h1>
  `,
})
export class NbMenuServiceItem31Component { }

@Component({
  selector: 'nb-menu-item32',
  template: `
    <h1>Hardware</h1>
  `,
})
export class NbMenuServiceItem32Component { }

@Component({
  selector: 'nb-menu-item33',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NbMenuServiceItem33Component { }

@Component({
  selector: 'nb-menu-item331',
  template: `
    <h1>Open Source Software</h1>
  `,
})
export class NbMenuServiceItem331Component { }

@Component({
  selector: 'nb-menu-item332',
  template: `
    <h1>Commercial Software</h1>
  `,
})
export class NbMenuServiceItem332Component { }
