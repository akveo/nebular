# Assign multiple roles to a user

In a case when you have slightly more complicated requirements, when a user has more than one role, you can configure the `NbRoleProvider` service to return an array of user roles.
<hr>

## Roles configuration

In the simplest form you just need to modify the `getRole` method to return an array of roles:
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
          // here we simply return a list of roles for current user
          return observableOf(['guest', 'user', 'editor']);
        },
      },
    },
  ],
``` 

Thus, once a user is accessing some secured resource, `isGranted` method returns `true` if at least one of the roles can access the resource.
