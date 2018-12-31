import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { RadioDisabledComponent } from './radio-disabled.component';
import { RadioShowcaseComponent } from './radio-showcase.component';

const routes: Route[] = [
  {
    path: 'radio-disabled.component',
    component: RadioDisabledComponent,
  },
  {
    path: 'radio-showcase.component',
    component: RadioShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class RadioRoutingModule {}
