import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {TagShowcaseComponent} from './tag-showcase/tag-showcase.component';
import {TagStatusShowcaseComponent} from './tag-status-showcase/tag-status-showcase.component';



const routes: Route[] = [
  {
    path: 'tag',
    component: TagShowcaseComponent,
  },
  {
    path: 'tag-status',
    component: TagStatusShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TagRoutingModule { }
