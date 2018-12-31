import { NgModule } from '@angular/core';
import { NbToastrModule } from '@nebular/theme';
import { ToastrRoutingModule } from './toastr-routing.module';
import { ToastrDestroyByClickComponent } from './toastr-destroy-by-click.component';
import { ToastrDurationComponent } from './toastr-duration.component';
import { ToastrIconComponent } from './toastr-icon.component';
import { ToastrPositionsComponent } from './toastr-positions.component';
import { ToastrPreventDuplicatesComponent } from './toastr-prevent-duplicates.component';
import { ToastrShowcaseComponent } from './toastr-showcase.component';
import { ToastrStatusesComponent } from './toastr-statuses.component';

@NgModule({
  declarations: [
    ToastrDestroyByClickComponent,
    ToastrDurationComponent,
    ToastrIconComponent,
    ToastrPositionsComponent,
    ToastrPreventDuplicatesComponent,
    ToastrShowcaseComponent,
    ToastrStatusesComponent,
  ],
  imports: [
    NbToastrModule.forRoot(),
    ToastrRoutingModule,
  ],
})
export class ToastrModule {}
