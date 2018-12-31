import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { ScrollWindowComponent } from './scroll-window.component';

const routes: Route[] = [
  {
    path: 'scroll-window.component',
    component: ScrollWindowComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ScrollRoutingModule {}
