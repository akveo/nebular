# Installation

<div class="note note-info section-end">
  <div class="note-title">Note</div>
  <div class="note-body">
    If you use our [ngx-admin starter kit](docs/guides/install-based-on-starter-kit) then you already have the Auth module in place.
  </div>
</div>

## Install the module

First, let's install the module as it's distributed as npm package. Make sure you have the [Nebular Theme module up and running](https://akveo.github.io/nebulardocs/installation/add-into-existing-project).
Nebular Theme is required to use built-in Auth Components. If you are not going to use those at all, you can use `Auth Module` without the `Nebular Theme` module.  

```bash
npm i @nebular/auth
```
<hr>

## Import

Import the module and `NbPasswordAuthStrategy` strategy:

```ts
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
```

<hr>

## Configure a strategy

Now, let's configure the module by specifying available strategies, in our case we add `NbPasswordAuthStrategy`.
To add a strategy we need to call static `setup` method to pass a list of options:

```ts
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

We also specified `forms` key, that configures available options for the Auth Components.
We leave it empty for now and get back to it in the [Configuring UI](docs/auth/configuring-ui) article.
<hr>

## Enable Auth Components

Next, we need to configure Auth Components routes, let's add those into your `app-routing.module.ts`:


```ts
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
<hr>

## Enable Styles

Last but not least - install the component styles into your styles.scss ([more details](docs/guides/enabling-theme-system)):

```scss
@import '~@nebular/auth/styles/all'; // or @import '~@nebular/auth/styles/{theme-name}';

// ... 

@include nb-install() {
  @include nb-theme-global();
  @include nb-auth-global(); // append the install mixin inside of the nb-install
};

```

At this point, if you navigate to http://localhost:4200/#/auth/login the login form is shown.

<hr>

## Related Articles

- [Configuring a Strategy](docs/auth/configuring-a-strategy)
- Adjusting [Auth Components UI](docs/auth/configuring-ui)
