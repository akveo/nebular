<div class="note note-info section-end">
  <div class="note-title">Note</div>
  <div class="note-body">
    If you use our [ngx-admin starter kit](#/docs/installation/based-on-starter-kit-ngxadmin-ngxadmin) then you already have the Auth module in place.
  </div>
</div>

## Installation steps

1) First, let's install the module as it's distributed as an npm package, but make sure you have the [Nebular Theme module up and running](https://akveo.github.io/nebular/#/docs/installation/add-into-existing-project).
Nebular Theme is required to use built-in Auth Components. If you are not going to use those at all, you can use `Auth Module` without `Nebular Theme`. 

Let's assume that we need to setup email & password authentication based on Nebular Auth and NbEmailPassAuthProvider.

`npm i @nebular/auth`
    
2) Import the module and `NbEmailPassAuthProvider` provider:

`import { NbEmailPassAuthProvider, NbAuthModule } from '@nebular/auth';`

3) Now, let's configure the module by specifying available providers, in your case we add `NbEmailPassAuthProvider`:

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

We also specified a `forms` key, which configures available options for the Auth Components. We'll leave it empty for now and get back to it in the [Configuring UI](#/docs/auth/configuring-ui) article.

4) Next, we need to configure Auth Components routes, let's add those into your `app-routing.module.ts`:


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

5) Last but not least - install the component styles into your themes.scss ([more details](/#/docs/guides/enabling-theme-system)):

```scss
@import '~@nebular/auth/styles/all'; // or @import '~@nebular/auth/styles/{theme-name}';

// ... 

@include nb-install() {
  @include nb-theme-global();
  @include nb-auth-global(); // append the install mixin inside of the nb-install
};

```

At this point, if you navigate to http://localhost:4200/#/auth/login the login form is shown.

<hr class="section-end">

## Where to next

- [Configuring a provider](#/docs/auth/configuring-a-provider)
- Adjusting [Auth Components UI](#/docs/auth/configuring-ui)
