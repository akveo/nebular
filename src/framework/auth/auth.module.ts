import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';

import { NbAuthService } from './services/auth.service';
import { NbDummyAuthProvider } from './providers/dummy-auth.provider';
import { NbEmailPassAuthProvider } from './providers/email-pass-auth.provider';
import { NbTokenService } from './services/token/token.service';
import { NbAuthSimpleToken } from './services/token/token';
import { NbTokenLocalStorage, NbTokenStorage } from './services/token/token-storage';
import {
  defaultSettings,
  NB_AUTH_USER_OPTIONS,
  NB_AUTH_OPTIONS,
  NB_AUTH_PROVIDERS,
  NbAuthOptions, NB_AUTH_INTERCEPTOR_HEADER, NB_AUTH_TOKEN_CLASS, NbAuthProviders,
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

export function nbProvidersFactory(options: NbAuthOptions, injector: Injector): NbAuthProviders {
  const providers = {};

  options.providers.forEach(([name, providerClass, providerConfig]: [string, any, any]) => {
    const object = injector.get(providerClass);
    object.setConfig(providerConfig || {});

    providers[name] = providerClass;
  });

  return providers;
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
        { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthSimpleToken },
        { provide: NB_AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization' },
        { provide: NB_AUTH_PROVIDERS, useFactory: nbProvidersFactory, deps: [NB_AUTH_OPTIONS, Injector] },
        NbAuthService,
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        NbTokenService,
        NbDummyAuthProvider,
        NbEmailPassAuthProvider,
      ],
    };
  }
}
