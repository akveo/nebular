# ACL

Permissions control is a general task when it comes to the development of more or less complex web application. Your application may have various roles and resources you need to protect.
ACL (access control list) provides a flexible way of configuring "who can do what against what resource".

In this article we configure a common setup when the app has three roles (`guest`, `user` and `moderator`), the roles have different permissions (`view`, `create`, `remove`) 
and the application contains two types of resources that needs to be protected (`news`, `comments`).
<hr>

## ACL Configuration

Nebular ACL has a simple way of setting it up. When registering a module you can specify a set of ACL rules by simply providing it as a module configuration.

Let's assume that our guest users can only `view` `news` and `comments`, users can do everything as guests, but also can `create` `comments`, and moderators can also `create` and `remove` `news` and `comments`.
Now, let's convert this into an ACL configuration object which Nebular can understand. Open your `app.module.ts` and change the `NbSecurityModule.forRoot()` call as follows:

```ts
@NgModule({
  imports: [
   // ...
    
   NbSecurityModule.forRoot({
     accessControl: {
       guest: {
         view: ['news', 'comments'],
       },
       user: {
         parent: 'guest',
         create: 'comments',
       },
       moderator: {
         parent: 'user',
         create: 'news',
         remove: '*',
       },
     },
   }),
   
 ],

``` 

As you can see the configuration is pretty much straightforward, each role can have a list of permissions (view, create, remove) and resources that are allowed for those permissions. We can also specify a `*` resource,
which means that we have permission against any resource (like moderators can remove both news and comments).    
<hr>

## Role Configuration

So far we told Nebular Security what roles-permissions-resources our application has. Now we need to specify how Nebular can determine the role of the currently authenticated user.
To do so we need to create a `RoleProvider` with one simple method `getRole`, which returns an `Observable<string>` of a role.
In the simplest form we can provide this service directly in the main module:


```ts
// ...

import { of as observableOf } from 'rxjs/observable/of';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';


@NgModule({
  imports: [
   // ...
    
   NbSecurityModule.forRoot({
    // ...
   }),

 ],
  providers: [
    // ...
    {
      provide: NbRoleProvider,
      useValue: {
        getRole: () => {
          return observableOf('guest');
        },
      },
    },
  ],
``` 
That's easy we have just provided a role, so that Nebular can determine which user is currently accessing the app.
The good thing about this configuration is that it's not tightly coupled with the rest of your authentication flow, which gives you a lot of flexibility over it.

<hr>

## Role Provider

But, in our example, the role is "hardcoded", which in the real world app would be dynamic and depend on the current user. 

Assuming that you already have `Nebular Auth` module fully configured and functioning based on `JWT` we will adjust the example to retrieve a role from the user token.

Let's create a separate `role.provider.ts` service in order not to put a lot of logic into the module itself:

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';


@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    // ...
  }
}

``` 

Now, let's complete the `getRole` method to extract the role from the token: 

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          return token.isValid() ? token.getPayload()['role'] : 'guest';
        }),
      );
  }
}
``` 

So we subscribe to the `tokenChange` observable, which will produce a new token each time authentication change occurs. 
Then we simply get a role from a token (for example simplicity, we assume that token payload always has a role value) or return default `guest` value.

Don't worry if your setup does not use Nebular Auth. You can adjust this code to retrieve a user role from any service of your own. 


And let's provide the service in the app module:

```typescript
// ...

import { RoleProvider } from './role.provider';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';


@NgModule({
  imports: [
   // ...
    
   NbSecurityModule.forRoot({
    // ...
   }),

 ],
  providers: [
    // ...
    { provide: NbRoleProvider, useClass: RoleProvider }, // provide the class
  ],
``` 

<hr>

## Usage

Finally, we can move on to the part where we start putting security rules in our app. Let's assume that we have that `Post Comment` button, that should only be shown to authenticated users (with a role `user`).
So we need to hide the button for guests. 

Nebular Security provides us with a simple `*nbIsGranted` conditional directive, which under the hood works as `*ngIf`, showing or hiding a template block based on a user role:

```typescript
@Component({
  // ...
  template: `
      <button *nbIsGranted="['create', 'comments']" >Post Comment</button>
    `,
})
export class CommentFormComponent {
// ...
```
We just need to pass a `permission` and some `resource` in order to control the button visibility.

For more advanced use cases, we can directly use the `NbAccessChecker` service. It provides you with `isGranted` method, which returns an `Observable<boolean>` of the ACL check result.
We can adjust our example to utilize it. In your `comment-form.component.ts`, import the `NbAccessChecker` service. 

```typescript
import { Component } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';

@Component({
  // ...
})
export class CommentFormComponent {

  constructor(public accessChecker: NbAccessChecker) { }
}
``` 

And let's add an `if` statement to the `Post Comment` button so that it is only shown when permitted:

```typescript
@Component({
  // ...
  template: `
      <button *ngIf="accessChecker.isGranted('create', 'comments') | async" >Post Comment</button>
    `,
})
export class CommentFormComponent {
// ...
``` 
We call `isGranted` method, which listens to the currently provided role and checks it permissions against specified in the ACL configuration. 
Moreover, as it listens to the *role change*, it hides the button if authentication gets changed during the app usage.

The same way we can call the `isGranted` method from any part of the app, including router guards and services, which gives us a transparent and flexibly configurable way to manage user access to various resources.   
