## Firebase authentication with Nebular Auth

`@nebular/firebase-auth` allows authentication in firebase applications with `@nebular/auth`.
The package provides the following strategies:
  - `NbFirebasePasswordStrategy` - authentication with email/password
  - `NbFirebaseGoogleStrategy` - authentication with google accounts
  - `NbFirebaseFacebookStrategy` - authentication with facebook accounts
  - `NbFirebaseTwitteStrategy` - authentication with twitter accounts

`@nebular/auth` package is sponsored by [GO-ER](https://go-er.com) and [What Now Travel](https://whatnow.travel/).

## Installation

<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
   The package connects firebase auth with nebular/auth so you need `firebase` and `@angular/fire` installed
 and configured for your application. For more instructions please see [@angular/fire docs](https://github.com/angular/angularfire).
 Also make sure you import AngularFireAuthModule.
  </div>
</div>

 
Install Nebular Auth and Nebular Firebase Auth.
 
 ```sh
   npm i @nebular/auth @nebular/firebase-auth
 ```

Import the NbAuthModule with some firebase strategies, in that example we use NbFirebasePasswordStrategy.

```ts
import { NbAuthModule } from '@nebular/auth';
import { NbFirebasePasswordStrategy } from '@nebular/firebase-auth';


@NgModule({
  imports: [
   // ...
      
    NbAuthModule.forRoot({
     strategies: [
       NbFirebasePasswordStrategy.setup({
         name: 'password',
       }),
     ],
     forms: {},
    }),
  ],
});
```
<hr>

## Authentication with email and password

Nebular Firebase Auth provides NbFirebasePassword strategy for authentication with email and password.

Strategy settings:
 <div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    There is no need to copy over the whole object to change the settings you need.
     Also, this.getOption call won't work outside of the default options declaration (which is inside of the NbPasswordAuthStrategy class),
      so you have to replace it with a custom helper function if you need it.
  </div>
</div>

```ts
export class NbFirebasePasswordStrategyOptions extends NbAuthStrategyOptions {
  name: string;
  token = {
    class: NbAuthJWTToken,
  };
  register?: boolean | NbPasswordStrategyModule = {
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully registered.'],
  };
  login?: boolean | NbPasswordStrategyModule = {
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Login/Email combination is not correct, please try again.'],
    defaultMessages: ['You have been successfully logged in.'],
  };
  logout?: boolean | NbPasswordStrategyModule = {
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['You have been successfully logged out.'],
  };
  refreshToken?: boolean | NbPasswordStrategyModule = {
    redirect: {
      success: null,
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Your token has been successfully refreshed.'],
  };
  requestPassword?: boolean | NbPasswordStrategyModule = {
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Reset password instructions have been sent to your email.'],
  };
  resetPassword?: boolean | NbPasswordStrategyModule = {
    redirect: {
      success: '/',
      failure: null,
    },
    defaultErrors: ['Something went wrong, please try again.'],
    defaultMessages: ['Your password has been successfully changed.'],
  };
  errors?: NbPasswordStrategyMessage = {
    key: 'message',
    getter: (module: string, res, options: NbFirebasePasswordStrategyOptions) => getDeepFromObject(
      res,
      options.errors.key,
      options[module].defaultErrors,
    ),
  };
  messages?: NbPasswordStrategyMessage = {
    key: 'messages',
    getter: (module: string, res, options: NbFirebasePasswordStrategyOptions) => getDeepFromObject(
      res.body,
      options.messages.key,
      options[module].defaultMessages,
    ),
  };
}
```
<hr>

## Social Authentication providers

Nebular Firebase Auth for now provides strategies for authentication with Google, Facebook and Twitter.
These strategies share the same settings structure and default settings value.

Strategies settings:

```ts
export class NbFirebaseIdentityProviderStrategyOptions extends NbAuthStrategyOptions {
   name: string;
   logout?: boolean | NbPasswordStrategyModule = {
      redirect: {
        success: '/',
        failure: null,
      },
      defaultErrors: ['Something went wrong, please try again.'],
      defaultMessages: ['You have been successfully logged out.'],
    };
    authenticate?: boolean | NbPasswordStrategyModule = {
      redirect: {
        success: '/',
        failure: null,
      },
      defaultErrors: ['Something went wrong, please try again.'],
      defaultMessages: ['You have been successfully authenticated.'],
    };
    errors?: NbPasswordStrategyMessage = {
      key: 'message',
      getter: (module: string, res, options: NbFirebaseIdentityProviderStrategyOptions) => options[module].defaultErrors,
    };
    messages?: NbPasswordStrategyMessage = {
      key: 'message',
      getter: (module: string, res, options: NbFirebaseIdentityProviderStrategyOptions) => options[module].defaultMessages,
    };
    scopes?: string[] = [];
    customParameters?: { [key: string]: string } = {};
  }
};
```
<hr>

## Complete example

A complete code example could be found on [GitHub](https://github.com/akveo/nebular/tree/master/src/playground/without-layout/firebase).

And here the playground examples available to play around with
 - [Firebase Nebular Password Example](/example/firebase/password-showcase)
 - [Firebase Nebular Social Authentication Providers Example](/example/firebase/social-auth-showcase)

