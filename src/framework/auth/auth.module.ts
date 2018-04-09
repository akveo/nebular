import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';

import { NbAuthService, NbTokenService, NbAuthSimpleToken, NbTokenLocalStorage, NbTokenStorage } from './services';
import { NbDummyAuthStrategy, NbDefaultAuthStrategy } from './strategies';

import {
  defaultSettings,
  NB_AUTH_USER_OPTIONS,
  NB_AUTH_OPTIONS,
  NB_AUTH_STRATEGIES,
  NbAuthOptions, NB_AUTH_INTERCEPTOR_HEADER, NB_AUTH_TOKEN_CLASS,
} from './auth.options';

import { NbAuthComponent } from './components/auth.component';

import { NbAuthBlockComponent } from './components/auth-block/auth-block.component';
import { NbLoginComponent } from './components/login/login.component';
import { NbRegisterComponent } from './components/register/register.component';
import { NbLogoutComponent } from './components/logout/logout.component';
import { NbRequestPasswordComponent } from './components/request-password/request-password.component';
import { NbResetPasswordComponent } from './components/reset-password/reset-password.component';

import { routes } from './auth.routes';
import { deepExtend } from './helpers';

export function nbAuthServiceFactory(options: NbAuthOptions, tokenService: NbTokenService, injector: Injector) {
  const strategies = options.strategies || {};

  for (const key in strategies) {
    if (strategies.hasOwnProperty(key)) {
      const strategy = strategies[key];
      const object = injector.get(strategy.service);
      object.setOptions(strategy.options || {});
    }
  }

  return new NbAuthService(tokenService, injector, strategies);
}

export function nbOptionsFactory(options) {
  return deepExtend(defaultSettings, options);
}

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    NbAuthComponent,
    NbAuthBlockComponent,
    NbLoginComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
    NbLogoutComponent,
  ],
  exports: [
    NbAuthComponent,
    NbAuthBlockComponent,
    NbLoginComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
    NbLogoutComponent,
  ],
})
export class NbAuthModule {
  static forRoot(nbAuthOptions?: NbAuthOptions): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NbAuthModule,
      providers: [
        { provide: NB_AUTH_USER_OPTIONS, useValue: nbAuthOptions },
        { provide: NB_AUTH_OPTIONS, useFactory: nbOptionsFactory, deps: [NB_AUTH_USER_OPTIONS] },
        { provide: NB_AUTH_STRATEGIES, useValue: {} },
        { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthSimpleToken },
        { provide: NB_AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization' },
        {
          provide: NbAuthService,
          useFactory: nbAuthServiceFactory,
          deps: [NB_AUTH_OPTIONS, NbTokenService, Injector],
        },
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        NbTokenService,
        NbDummyAuthStrategy,
        NbDefaultAuthStrategy,
      ],
    };
  }
}
