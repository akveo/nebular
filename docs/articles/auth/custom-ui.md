# Custom Auth Components

When it comes to the UI part of the app, sometimes we may need to customize it beyond the [settings available for the Auth Components](docs/auth/configuring-ui).
In such cases, we recommend creating custom Auth components. Considering UI part of the Auth module is decoupled from the core Auth logic,
we can easily customize the look & feel of the components still utilizing all of the powerful features of different Auth Strategies and Services.

<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    This article assumes that you have a basic Angular app structure and already followed the [Auth Installation guide](docs/auth/installation). 
  </div>
</div>
<hr>

## Review the app structure
As a first step let's review the app structure we should already have. The app should consist at least of the following files:

- `app.module.ts`
- `app.component.ts`
- `app-routing.component.ts`

If you followed all of the steps of the [Auth Installation guide](docs/auth/installation) then you already have a Strategy configured in the `app.module.ts` as well as 
you configured routes to the out of the box auth components.

<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    In case your setup is based on the ngx-admin your configuration is a bit different - the Strategy is configured under `core.module`, which providers are imported into the `app.module`. This should be the only difference for this setup.
  </div>
</div>
<hr>

## Create Auth Module

As we need to have our custom components, let's create a separate lazy loaded module for them. This way we can minimize a page loading time when the components are not required
(i.e. when the user is authenticated). Also, it's a good practice to move feature logic in a separate module.

Let's start with the `auth` folder with the following files in it:

- `auth.module.ts` - will declare our custom components
- `auth-routing.module.ts` - components routes

Now, let's fill in the `auth.module.ts` with the basic module declaration:

```ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    NbAuthModule,
  ],
  declarations: [
    // ... here goes our new components
  ],
})
export class NgxAuthModule {
}

```

A couple of required modules for future components. Also, notice how we imported the `NbAuthModule` but without the `forRoot` call.
This way we imported the declared auth components, such as for example `NbAuthBlock`, so we can use it inside of our components.

Now, let's fill in the routing file:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  // .. here goes our components routes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
``` 

Well, currently there is nothing really in it, let's leave it like this for now.

One last thing in this step - we need to add a route to our lazy-loaded module into the app-routing like this:

```ts
export const routes: Routes = [
  // .. some other app routs
  {
    path: 'auth',
    loadChildren: './auth/auth.module#NgxAuthModule',
  },
];
```
Make sure the relative module path is correct in your setup.

<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    Also, if you have configured routes to the out of the box components as per the Installation guide you need to remove those.
  </div>
</div>

At this step, you can open http://localhost:4200/#/auth in your browser. Nothing is going to be shown, but neither errors or/and the redirect should occur.
<hr>

## Setup Auth Container

All auth components should have a container, so a component that contains a layout. Such a component is already provided by Nebular and we are going to use it in our case.
At the step we just need to add it to the `auth-routing.module.ts`:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';  // <---

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,  // <---
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
```

Now open your browsers at http://localhost:4200/#/auth and you should be able to see the auth container: 

![image](assets/images/articles/custom-auth/auth-container.png)

Great, let's move on to the most interesting part.
<hr>

## Login Component Extension

The simplest way to customize the auth components is to create a custom component that extends from the Nebular one.
This way we can keep the component logic untouched and just re-write necessary parts - templates, styles, particular methods.

In our case, we need to modify the Login component template as we need to add labels to the input elements. To do so we need to modify the component template.

For starters, let's create our custom login component inherited from `NbLoginComponent`. Create a `login` folder and add `login.component.ts` and `login.component.html`:

```ts
import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {
}
```

```html
<strong>Hello</strong>
```

Then register the component in the auth module:

```ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';

import { NgxLoginComponent } from './login/login.component'; // <---


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    NbAuthModule,
  ],
  declarations: [
    NgxLoginComponent, // <---
  ],
})
export class NgxAuthModule {
}
```

And update the routing:

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';

import { NgxLoginComponent } from './login/login.component'; // <---

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: NgxLoginComponent, // <---
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
```

Now the most interesting part - as we need to modify the template, we can simply copy it from Nebular sources and adjust necessary parts.
Unfortunately, the library isn't distributed with the sources, so we need to copy the template sources from [GitHub](https://github.com/akveo/nebular/blob/v2.0.0/src/framework/auth/components/login/login.component.html). 

<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    Make sure are you copying sources from the same Nebular version as you have locally, and not from the `master` branch.
  </div>
</div>

Paste the template into your `auth/login.component.html` and modify as necessary.
That's it! You can check your page at http://localhost:4200/#/auth.


![image](assets/images/articles/custom-auth/form-with-labels.png)

## Complete example

A complete code example could be found on [GitHub](https://github.com/akveo/nebular/tree/master/src/playground/without-layout/smart-home).
And here the playground example available to play around with [OAuth2 Nebular Example](/example/smart-home).

<hr>

## Related Articles

- [Configuring a Strategy](docs/auth/configuring-a-strategy)
- Configuring [Auth Components](docs/auth/configuring-ui)

