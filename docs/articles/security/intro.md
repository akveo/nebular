# Security 

Security is an important part of any adult web application. It is a common task to manage user access to particular resources.
Unlike the `Nebular Auth`, which provides a way to `authenticate` a user, `Nebular Security` helps you to `authorize` a user to access some of the application resources.

<div class="note note-warning">
  <div class="note-title">Warning</div>
  <div class="note-body">
    Front-end ACL won't resolve all of the security issues and just provides a better user experience for your application.
    It is essential to duplicate security rules on the back-end side.
  </div>
</div>
<hr>

## What's included

- ACL roles/permissions/resources configuration
- `RoleProvider` - user role determination, authentication agnostic 
- `NbAccessChecker` - a service that checks whether access is granted or not
- `*nbIsGranted` - conditional directive to manager your content visibility


- *Security Decorator* - a decorator that manages access to a particular method, coming soon.

<hr>

## Related Articles

- Security Module [Installation](docs/security/installation) 
