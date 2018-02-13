<div class="note note-info section-end">
  <div class="note-title">Note</div>
  <div class="note-body">
    If you use our [ngx-admin starter kit](#/docs/installation/based-on-starter-kit-ngxadmin-ngxadmin) then you already have the Security module in place.
  </div>
</div>

## Installation steps

1) First, let's install the module as it's distributed as an npm package. Security module doesn't have a dependency on Auth or Theme modules, but it is recommended to use them in conjunction.


```bash

npm i @nebular/security
```
    
2) Import the module:

```typescript

import { NbSecurityModule } from '@nebular/security

```

3) Now, let's register the module in the root module:

```typescript

@NgModule({
  imports: [
   // ...
    
   NbSecurityModule.forRoot(),

```

Great, at this stage we have installed Nebular Security and ready to configure it.

<hr class="section-end">

## Where to next

- Roles & Permissions [Configuration & Usage](#/docs/security/acl-configuration--usage)
