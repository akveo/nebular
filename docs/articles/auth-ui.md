## UI Components

Auth module comes with a list of authentication components:

- `<nb-auth-block></nb-auth-block>` - component-wrapper, provides basic styles for the forms, already included inside of the page-components;
- `<nb-register></nb-register>` - registration page;
- `<nb-login></nb-login>` - login page;
- `<nb-logout></nb-logout>` - logout page - shows "logging out..." message while sending logout request;
- `<nb-request-password></nb-request-password>` - request password page;
- `<nb-reset-password></nb-reset-password>` - reset password page.
<hr class="section-end">

## UI Settings

Alongside with the provider's configuration `AuthModule` also accepts a list of settings for UI side under the `forms` key:

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
         forms: {},
       }), 
  ],
});

```

You can configure each specific form separately, here're the default values:

```typescript

  forms: {
    login: {
      redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
      provider: 'email',  // provider id key. If you have multiple providers, or what to use your own you need to tell a component to use it here
      rememberMe: true,   // whether to show or not the `rememberMe` checkbox
      showMessages: {     // show/not show success/error messages
        success: true,
        error: true,
      },
    },
    register: {
      redirectDelay: 500,
      provider: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      terms: true,
    },
    requestPassword: {
      redirectDelay: 500,
      provider: 'email',
      showMessages: {
        success: true,
        error: true,
      },
    },
    resetPassword: {
      redirectDelay: 500,
      provider: 'email',
      showMessages: {
        success: true,
        error: true,
      },
    },
    logout: {
      redirectDelay: 500,
      provider: 'email',
    },
    validation: {  // fields validation rules. The validations are shared between all forms.
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
```

So, for instance, to remove the redirectDelay setting and disable the success message, we can do the following:

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
         providers: {
           email: {
             service: NbEmailPassAuthProvider,
             config: {
              ...
             },
           },
         },
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
<hr class="section-end">

## Custom UI Components

In a case when the look & feel of the Nebular auth components doesn't satisfy your needs, you can easily create custom authentication components based on the Nebular ones.

All you need to do is:

1) Copy [source code](https://github.com/akveo/nebular/tree/master/src/framework/auth/components) of the components you want to change under your project. If you use `ngx-admin`, you may place them under `src/app/@theme/components/auth`.
Rename components to conform your app prefix, for instance using `ngx-` prefix.

<div class="note note-warning">
  <div class="note-title">Don't copy other auth module files</div>
  <div class="note-body">
    There is no need to copy services and files, otherwise, you'll be getting conflicts with the original Nebular Auth module.
  </div>
</div>

<div class="note note-warning">
  <div class="note-title">Renaming</div>
  <div class="note-body">
    Make sure to rename component classes and selectors to follow your application prefix. You may use `Refactor` feature of your Editor.
  </div>
</div>
<hr class="section-end">

2) Register them in your `*.module.ts` (i.e. `theme.module.ts`):

```

// make sure the path is correct for your setup
import { NgxAuthComponent } from './components/auth/auth.component';
import { NgxAuthBlockComponent } from './components/auth/auth-block/auth-block.component';
import { NgxLoginComponent } from './components/auth/login/login.component';
import { NgxRegisterComponent } from './components/auth/register/register.component';
import { NgxLogoutComponent } from './components/auth/logout/logout.component';
import { NgxRequestPasswordComponent } from './components/auth/request-password/request-password.component';
import { NgxResetPasswordComponent } from './components/auth/reset-password/reset-password.component';


@NgModule({
  imports: [...],
  declarations: [
  
      ...
       
      NgxAuthComponent,
      NgxAuthBlockComponent,
      NgxLoginComponent,
      NgxRegisterComponent,
      NgxRequestPasswordComponent,
      NgxResetPasswordComponent,
      NgxLogoutComponent,
    ],
})
export class ThemeModule {
```
*In this example we decided to copy all auth components to re-do the UI completely.*

3) Update your routes to import the new components:


```typescript
import { NgxAuthComponent } from './components/auth/auth.component';
import { NgxAuthBlockComponent } from './components/auth/auth-block/auth-block.component';
import { NgxLoginComponent } from './components/auth/login/login.component';
import { NgxRegisterComponent } from './components/auth/register/register.component';
import { NgxLogoutComponent } from './components/auth/logout/logout.component';
import { NgxRequestPasswordComponent } from './components/auth/request-password/request-password.component';
import { NgxResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

export const routes: Routes = [
  // ... 
  
  {
    path: 'auth',
    component: NgxAuthComponent,
    children: [
      {
        path: '',
        component: NgxLoginComponent,
      },
      {
        path: 'login',
        component: NgxRegisterComponent,
      },
      {
        path: 'register',
        component: NgxRegisterComponent,
      },
      {
        path: 'logout',
        component: NgxLogoutComponent,
      },
      {
        path: 'request-password',
        component: NgxRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NgxResetPasswordComponent,
      },
    ],
  },
  
];
```

That's it. Now you can adjust the components the way you need. Though please make sure to keep the NbAuthService related logic untouched, so that the components may still communicate with the auth providers.
<hr class="section-end">

## Where to next

- Receiving [user token after authentication](#/docs/auth/getting-user-token)
