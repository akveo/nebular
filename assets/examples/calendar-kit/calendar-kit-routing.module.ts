import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { CalendarKitFullCalendarShowcaseComponent } from './calendar-kit-full-calendar.component';

const routes: Route[] = [
  {
    path: 'calendar-kit-full-calendar.component',
    component: CalendarKitFullCalendarShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class CalendarKitRoutingModule {}
