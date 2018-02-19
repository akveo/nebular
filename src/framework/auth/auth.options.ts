import { InjectionToken } from '@angular/core';
import { NbAuthToken } from './services';

export interface NbAuthOptions {
  forms?: any;
  providers?: any;
}

export interface NbAuthProviders {
  [key: string]: any;
}

export interface NbAuthSocialLink {
  link?: string,
  url?: string,
  target?: string,
  title?: string,
  icon?: string,
}

const socialLinks: NbAuthSocialLink[] = [];

export const defaultSettings: any = {
  forms: {
    login: {
      redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
      provider: 'email',  // provider id key. If you have multiple providers, or what to use your own
      rememberMe: true,   // whether to show or not the `rememberMe` checkbox
      showMessages: {     // show/not show success/error messages
        success: true,
        error: true,
      },
      socialLinks: socialLinks, // social links at the bottom of a page
    },
    register: {
      redirectDelay: 500,
      provider: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      terms: true,
      socialLinks: socialLinks,
    },
    requestPassword: {
      redirectDelay: 500,
      provider: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    resetPassword: {
      redirectDelay: 500,
      provider: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      socialLinks: socialLinks,
    },
    logout: {
      redirectDelay: 500,
      provider: 'email',
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
export const NB_AUTH_PROVIDERS = new InjectionToken<NbAuthProviders>('Nebular Auth Providers');
export const NB_AUTH_TOKEN_CLASS = new InjectionToken<NbAuthToken>('Nebular Token Class');
export const NB_AUTH_INTERCEPTOR_HEADER = new InjectionToken<NbAuthProviders>('Nebular Simple Interceptor Header');
