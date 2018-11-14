import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';

import {
  NB_AUTH_FALLBACK_TOKEN,
  NbAuthService,
  NbAuthSimpleToken,
  NbAuthTokenClass,
  NbAuthTokenParceler,
  NbTokenLocalStorage,
  NbTokenService,
  NbTokenStorage,
} from './services';
import {
  NbAuthStrategy,
  NbAuthStrategyOptions,
  NbDummyAuthStrategy,
  NbOAuth2AuthStrategy,
  NbPasswordAuthStrategy,
} from './strategies';

import {
  defaultAuthOptions,
  NB_AUTH_INTERCEPTOR_HEADER,
  NB_AUTH_OPTIONS,
  NB_AUTH_STRATEGIES,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NB_AUTH_TOKENS,
  NB_AUTH_USER_OPTIONS,
  NbAuthOptions,
  NbAuthStrategyClass,
} from './auth.options';

import { NbAuthComponent } from './components/auth.component';

import { NbAuthBlockComponent } from './components/auth-block/auth-block.component';
import { NbLoginComponent } from './components/login/login.component';
import { NbRegisterComponent } from './components/register/register.component';
import { NbLogoutComponent } from './components/logout/logout.component';
import { NbRequestPasswordComponent } from './components/request-password/request-password.component';
import { NbResetPasswordComponent } from './components/reset-password/reset-password.component';

import { deepExtend } from './helpers';

export function nbStrategiesFactory(options: NbAuthOptions, injector: Injector): NbAuthStrategy[] {
  const strategies = [];
  options.strategies
    .forEach(([strategyClass, strategyOptions]: [NbAuthStrategyClass, NbAuthStrategyOptions]) => {
      const strategy: NbAuthStrategy = injector.get(strategyClass);
      strategy.setOptions(strategyOptions);

      strategies.push(strategy);
    });
  return strategies;
}

export function nbTokensFactory(strategies: NbAuthStrategy[]): NbAuthTokenClass[] {
  const tokens = [];
  strategies
    .forEach((strategy: NbAuthStrategy) => {
      tokens.push(strategy.getOption('token.class'));
    });
  return tokens;
}

export function nbOptionsFactory(options) {
  return deepExtend(defaultAuthOptions, options);
}

export function nbNoOpInterceptorFilter(req: HttpRequest<any>): boolean {
  return true;
}

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule,
    FormsModule,
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
        { provide: NB_AUTH_STRATEGIES, useFactory: nbStrategiesFactory, deps: [NB_AUTH_OPTIONS, Injector] },
        { provide: NB_AUTH_TOKENS, useFactory: nbTokensFactory, deps: [NB_AUTH_STRATEGIES] },
        { provide: NB_AUTH_FALLBACK_TOKEN, useValue: NbAuthSimpleToken },
        { provide: NB_AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization' },
        { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: nbNoOpInterceptorFilter },
        { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
        NbAuthTokenParceler,
        NbAuthService,
        NbTokenService,
        NbDummyAuthStrategy,
        NbPasswordAuthStrategy,
        NbOAuth2AuthStrategy,
      ],
    };
  }
}
