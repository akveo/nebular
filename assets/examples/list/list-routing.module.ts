import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { SimpleListShowcaseComponent } from './simple-list-showcase.component';
import { UsersListShowcaseComponent } from './users-list-showcase.component';

const routes: Route[] = [
  {
    path: 'simple-list-showcase.component',
    component: SimpleListShowcaseComponent,
  },
  {
    path: 'users-list-showcase.component',
    component: UsersListShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ListRoutingModule {}
