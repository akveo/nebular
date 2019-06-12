import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { ToastrDestroyByClickComponent } from './toastr-destroy-by-click.component';
import { ToastrDurationComponent } from './toastr-duration.component';
import { ToastrIconComponent } from './toastr-icon.component';
import { ToastrPositionsComponent } from './toastr-positions.component';
import { ToastrPreventDuplicatesComponent } from './toastr-prevent-duplicates.component';
import { ToastrShowcaseComponent } from './toastr-showcase.component';
import { ToastrStatusesComponent } from './toastr-statuses.component';

const routes: Route[] = [
  {
    path: 'toastr-destroy-by-click.component',
    component: ToastrDestroyByClickComponent,
  },
  {
    path: 'toastr-duration.component',
    component: ToastrDurationComponent,
  },
  {
    path: 'toastr-icon.component',
    component: ToastrIconComponent,
  },
  {
    path: 'toastr-positions.component',
    component: ToastrPositionsComponent,
  },
  {
    path: 'toastr-prevent-duplicates.component',
    component: ToastrPreventDuplicatesComponent,
  },
  {
    path: 'toastr-showcase.component',
    component: ToastrShowcaseComponent,
  },
  {
    path: 'toastr-statuses.component',
    component: ToastrStatusesComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ToastrRoutingModule {}
