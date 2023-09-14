import { APP_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { NbSecurityModule } from '@nebular/security';
import { NbMomentDateModule } from '@nebular/moment';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbAuthModule.forRoot(),
    NbSecurityModule.forRoot(),
    NbMomentDateModule,
    NbDateFnsDateModule,
    NbEvaIconsModule,
  ],
  providers: [BrowserModule, { provide: APP_ID, useValue: 'packages-smoke' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
