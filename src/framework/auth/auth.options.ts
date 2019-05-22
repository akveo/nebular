import { InjectionToken } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { NbAuthStrategy } from './strategies/auth-strategy';
import { NbAuthStrategyOptions } from './strategies/auth-strategy-options';
import { NbAuthToken, NbAuthTokenClass } from './services/token/token';

export type NbAuthStrategyClass = new (...params: any[]) => NbAuthStrategy;

export type NbAuthStrategies  = [NbAuthStrategyClass, NbAuthStrategyOptions][];

export interface NbAuthOptions {
  forms?: any;
  strategies?: NbAuthStrategies;
}

export interface NbAuthSocialLink {
  link?: string,
  url?: string,
  target?: string,
  title?: string,
  icon?: string,
}

const socialLinks: NbAuthSocialLink[] = [];

export const defaultAuthOptions: any = {
  strategies: [],
  forms: {
    login: {
      redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
      strategy: 'email',  // provider id key. If you have multiple strategies, or what to use your own
      rememberMe: true,   // whether to show or not the `rememberMe` checkbox
      showMessages: {     // show/not show success/error messages
        success: true,
        error: true,
      },
      socialLinks: socialLinks, // social links at the bottom of a page
    },
    register: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      terms: true,
      socialLinks: socialLinks,
    },
    requestPassword: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    resetPassword: {
      redirectDelay: 500,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    logout: {
      redirectDelay: 500,
      strategy: 'email',
    },
    validation: {
      password: {
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      email: {
        required: true,
      },
      fullName: {
        required: false,
        minLength: 4,
        maxLength: 50,
      },
    },
  },
};

export const NB_AUTH_OPTIONS = new InjectionToken<NbAuthOptions>('Nebular Auth Options');
export const NB_AUTH_USER_OPTIONS = new InjectionToken<NbAuthOptions>('Nebular User Auth Options');
export const NB_AUTH_STRATEGIES = new InjectionToken<NbAuthStrategies>('Nebular Auth Strategies');
export const NB_AUTH_TOKENS = new InjectionToken<NbAuthTokenClass<NbAuthToken>[]>('Nebular Auth Tokens');
export const NB_AUTH_INTERCEPTOR_HEADER = new InjectionToken<string>('Nebular Simple Interceptor Header');
export const NB_AUTH_TOKEN_INTERCEPTOR_FILTER =
       new InjectionToken<(req: HttpRequest<any>) => boolean>('Nebular Interceptor Filter');

