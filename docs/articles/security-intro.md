Security is an important part of any adult web application. It is a common task to manage a user access to particular resources.
Unlike the `Nebular Auth`, which provides a way to `authenticate` a user, `Nebular Security` helps you to `authorize` a user to access some of the application resources.

<div class="note note-warning">
  <div class="note-title">Warning</div>
  <div class="note-body">
    Front-end ACL won't resolve all of the security issues and just provides a better user expiriece for your application.
    It is essential to duplicate security rules on the back-end side.
  </div>
</div>
<hr class="section-end">

## What's included

- ACL roles/permissions/resources configuration
- `RoleProvider` - user role determination, authentication agnostic 
- `NbAccessChecker` - a service that checks whether access is granted or not
- `*nbIsGranted` - conditional directive to manager your content visibility


- *Security Decorator* - decorator that manages access to a particular method, coming soon.

<hr class="section-end">

## Where to next

- Security Module [Installation](#/docs/security/installation) 
