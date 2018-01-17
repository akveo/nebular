import { Component, Input, HostBinding } from '@angular/core';
import { NbCardComponent } from '../card.component'

@Component({
  selector: 'nb-card-front',
  template: '<ng-content select="nb-card"></ng-content>',
})
export class NbFrontComponent { }

@Component({
  selector: 'nb-card-back',
  template: '<ng-content select="nb-card"></ng-content>',
})
export class NbBackComponent { }
