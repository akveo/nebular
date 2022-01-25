import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule } from '@beast/theme';
import { NbAuthModule } from '@beast/auth';
import { NbSecurityModule } from '@beast/security';
import { NbMomentDateModule } from '@beast/moment';
import { NbDateFnsDateModule } from '@beast/date-fns';
import { NbEvaIconsModule } from '@beast/eva-icons';

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
