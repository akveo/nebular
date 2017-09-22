The main goal of this module is to provide a plugable set of components and services for easier setup of the authentication layer on the UI side. 
Also it incorporates a layer of Auth Providers, meaning that Authentication layer could be extended or changed by a configuration.
*Note*: the setup will still require a backend services to communicate with.

## What's included

Four pages:
  - Login
  - Register
  - Password Recover
  - Password Reset
  
  
Two auth providers:
  - Dummy auth provider - for testing purposes
  - EmalPass auth provider - the most common email and password authentication
    
Other helper services:
  - Token Service, JWT token and Simple token - helper services for token handling
  - JWT and Simple HTTP interceptors - intercepts the token into your HTTP requests
  

## How to start

1) First, let's install the module as it's distributed as npm package:

`npm i @nebular/auth`
    
2) Import the module and `NbEmailPassAuthProvider` provider:

`import { NbEmailPassAuthProvider, NbAuthModule } from '@nebular/auth';`

3) Now, let's configure the module:

```typescript

@NgModule({
  imports: [
   // ...
    
   NbAuthModule.forRoot({
         providers: {
           email: {
             service: NbEmailPassAuthProvider,
             config: {
              ...
             },
           },
         },
       }), 
  ],
});

```

4) Next, we need to show the auth pages somewhere, let's add them into your app.routes.ts


```typescript
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

export const routes: Routes = [
  // ... 
  
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  
];
```
*Note*: we wrap the pages into AuthComponent which is optional and just provides some basic styling for the page.

5) Last but not least - install the component styles into your themes.scss ([More Details](/#/docs/guides/enabling-theme-system)):

```scss
@import '~@nebular/auth/styles/all'; // or @import '~@nebular/auth/styles/{theme-name}';

// ... 

@include nb-install() {
  @include nb-theme-global();
  @include nb-auth-global(); // append the install mixin inside of the nb-install
};

```

5) At this point if you navigate to http://localhost:4200/#/auth/login the login from will be shown.


## Where to next

- Configuring a provider [Email & Password provider settings](#/docs/auth/email--password-provider)
- Getting auth token after authentication [NbTokenService](#/docs/auth/nbtokenservice)

