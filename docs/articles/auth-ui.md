# UI Components

Auth module comes with a list of authentication components:

- `<nb-auth-block></nb-auth-block>` - component-wrapper, provides basic styles for the forms, already included inside of the page-components;
- `<nb-register></nb-register>` - registration page;
- `<nb-login></nb-login>` - login page;
- `<nb-logout></nb-logout>` - logout page - shows "logging out..." message while sending logout request;
- `<nb-request-password></nb-request-password>` - request password page;
- `<nb-reset-password></nb-reset-password>` - reset password page.
<hr>

## UI Settings

Alongside with the strategies' configuration `AuthModule` also accepts a list of settings for UI side under the `forms` key:

```typescript

@NgModule({
  imports: [
   // ...
    
   NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
             name: 'email',
           }),
         ],
         forms: {},
       }), 
  ],
});

```

You can configure each specific form separately, here're the default values:

```typescript

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
      strategy: 'email',  // strategy id key.
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
```
<hr>

## Remove redirect delay

So, for instance, to remove the redirectDelay setting and disable the success message, we can do the following:

```typescript

@NgModule({
  imports: [
   // ...
    
   NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
             name: 'email',
           }),
         ],
         forms: {
           login: {
             redirectDelay: 0,
             showMessages: {
               success: true,
             },
           },
           register: {
             redirectDelay: 0,
             showMessages: {
               success: true,
             },
           },
           requestPassword: {
             redirectDelay: 0,
             showMessages: {
               success: true,
             },
           },
           resetPassword: {
             redirectDelay: 0,
             showMessages: {
               success: true,
             },
           },
           logout: {
             redirectDelay: 0,
           },
         },
       }), 
  ],
});

```

If it looks a bit verbose, we can move the repeating part into a variable like this:

```typescript

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  imports: [
   // ...
    
   NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
             name: 'email',
           }),
         ],
         forms: {
           login: formSetting,
           register: formSetting,
           requestPassword: formSetting,
           resetPassword: formSetting,
           logout: {
             redirectDelay: 0,
           },
         },
       }), 
  ],
});

```
The settings will be merged with the default values so no need to specify all of the keys here.
<hr>

## Where to next

- Receiving [user token after authentication](docs/auth/getting-user-token)
- [Custom Auth Components](docs/auth/custom-auth-components)
