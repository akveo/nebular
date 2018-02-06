<div class="note note-info section-end">
  <div class="note-title">Note</div>
  <div class="note-body">
    If you use our [ngx-admin starter kit](#/docs/installation/based-on-starter-kit-ngxadmin-ngxadmin) then you already have the Security module in place.
  </div>
</div>

## Abstract

Permissions control is a general task when it comes to development of more of less complex web application. Your application may have various roles and resources you need to protect.
ACL (access control list) provides a flexible way of configuring "who can do what against what resource".

In this article we configure a common setup when the app has three roles (`guest`, `user` and `moderator`), the roles have different permissions (`view`, `create`, `delete`) 
and the application contains two type of resources that needs to be protected (`news`, `comments`).

## Configuration

1) Nebular ACL has a simple way of setting it up. When registering a module you can specify the ACL rules by simply providing it as a module configuration object.

Let's assume that our guest users can only `view` `news` and `comments`, users can do everything as guest, but also can `create` `comments`, and moderators can also `create` and `remove` `news` and `comments`.
Now, let's convert this into ACL configuration object witch Nebular can understand. Open your `app.module.ts` and change the `NbSecurityModule.forRoot()` call as follows:

```typescript

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

``` 
As you can see the configuration is pretty much straightforward, each role can have a list of permissions (view, create, remove) and resources that are allowed for those permissions. We can also specify a `*` resource,
which means that we have a permission againts any resource (like moderators can remove both news and comments).    
