import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NbThemeModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { NbSecurityModule } from '@nebular/security';
import { NbMomentDateModule } from '@nebular/moment';
import { NbDateFnsDateModule } from '@nebular/date-fns';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbAuthModule.forRoot(),
    NbSecurityModule.forRoot(),
    NbMomentDateModule,
    NbDateFnsDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
