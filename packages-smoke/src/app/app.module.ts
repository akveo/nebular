import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule } from '@areyoufreebusy/theme';
import { NbAuthModule } from '@areyoufreebusy/auth';
import { NbSecurityModule } from '@areyoufreebusy/security';
import { NbMomentDateModule } from '@areyoufreebusy/moment';
import { NbDateFnsDateModule } from '@areyoufreebusy/date-fns';
import { NbEvaIconsModule } from '@areyoufreebusy/eva-icons';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'packages-smoke' }),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbAuthModule.forRoot(),
    NbSecurityModule.forRoot(),
    NbMomentDateModule,
    NbDateFnsDateModule,
    NbEvaIconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
