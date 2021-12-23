# Protecting application based on user authentication

Let's imagine we have the following application structure:
- `/pages/*` - protected area available only for authenticated users
- `/auth/*` - authentication area (login/register/etc) available for non-authenticated users

Angular provides a simple way to protect your routes called [Router Guard](https://angular.io/guide/router#guard-the-admin-feature).
Here's how we combine it with Nebular Auth to protect `/pages/*` from anonymous users:
<hr>

## Create a guard
Create `auth-guard.service.ts` somewhere near your `app-routing.module.ts` like this:

```ts
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate() {
    return true;
  }
}
```
<hr>

## Complete canActivate
Then, let's import `NbAuthService` and complete the `canActivate` method:

```ts
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService) {
  }

  canActivate() {
    return this.authService.isAuthenticated(); // canActive can return Observable<boolean>, which is exactly what isAuthenticated returns
  }
}
```
*So we just return the isAuthenticated value, so that when it's true - route can be activated, and vise versa when it's not.*
<hr>

## Register the service
Now we need to register the service inside of the `app.module.ts`:

```ts
import { AuthGuard } from '../auth-guard.service';

@NgModule({
  imports: [
    // ...
  ],
  providers: [
    // ...
    AuthGuard
  ]
});

```

<hr>

## Add guard to routes 
Last step - reference the AuthGuard in the `app-routing.module.ts`:

```ts
import { AuthGuard } from '../auth-guard.service';

// ...

const routes: Routes = [
  { 
    path: 'pages',
    canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    loadChildren: 'app/pages/pages.module#PagesModule' 
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      // ...
    ],
  },
  // ...
];

```

As a result, it is not possible to access any of the `pages/*` if you are not an authenticated user.
<hr>

## Redirect non-authenticated to the login page

Additionally, you may want to redirect straight to `auth/login` when the user is accessing a restricted page.
Let's modify our guard a bit to reflect this logic:

```ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login']);
          }
        }),
      );
  }
}
```
*So we just check the the value returned by isAuthenticated and simply redirect to the login page.*

Easy as that! Hope you found it useful.
<hr>

## Related Articles

- [NbAuthService](docs/auth/nbauthservice)
- [NbTokenService](docs/auth/nbtokenservice)
