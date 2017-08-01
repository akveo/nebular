import { NgModule, ModuleWithProviders, Injector, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NbLayoutModule } from '@nebular/theme';

import { NbAuthService } from './services/auth.service';
import { NbDummyAuthProvider } from './providers/dummy-auth.provider';
import { NbEmailPassAuthProvider } from './providers/email-pass-auth.provider';

import { NbAuthOptions, nbAuthOptionsToken, nbAuthProvidersToken } from './auth.options';

import { NbAuthComponent } from './components/auth.component';
import { NbTokenService } from './services/token.service';
import { NbSecuredHttp } from './services/secured-http';

import { NbAuthBlockComponent } from './components/auth-block/auth-block.component';
import { NbLoginComponent } from './components/login/login.component';
import { NbRegisterComponent } from './components/register/register.component';
import { NbLogoutComponent } from './components/logout/logout.component';
import { NbRequestPasswordComponent } from './components/request-password/request-password.component';
import { NbResetPasswordComponent } from './components/reset-password/reset-password.component';

import { routes } from './auth.routes';

export function nbAuthServiceFactory(config: any, tokenService: NbTokenService, injector: Injector) {
  const providers = config.providers || {};

  for (const key in providers) {
    if (providers.hasOwnProperty(key)) {
      const provider = providers[key];
      provider.object = injector.get(provider.service);
      provider.object.setConfig(provider.config || {});
    }
  }

  return new NbAuthService(tokenService, providers);
}

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpModule,
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
        { provide: nbAuthOptionsToken, useValue: nbAuthOptions },
        { provide: nbAuthProvidersToken, useValue: {} },
        {
          provide: NbAuthService,
          useFactory: nbAuthServiceFactory,
          deps: [nbAuthOptionsToken, NbTokenService, Injector],
        },
        NbTokenService,
        NbSecuredHttp,
        NbDummyAuthProvider,
        NbEmailPassAuthProvider,
      ],
    };
  }
}
