# Installation

<div class="note note-info section-end">
  <div class="note-title">Note</div>
  <div class="note-body">
    If you use our [ngx-admin starter kit](docs/guides/install-based-on-starter-kit) then you already have Security module in place.
  </div>
</div>

First, let's install the module as it's distributed as an npm package. Security module doesn't have a dependency on Auth or Theme modules, but it is recommended to use them in conjunction.


```bash
npm i @nebular/security
```
<hr>   

## Import the module:

```ts
import { NbSecurityModule } from '@nebular/security';
```
<hr>

## Register it

Now, let's register the module in the root module:

```ts
@NgModule({
  imports: [
   // ...
    
   NbSecurityModule.forRoot(),
```

Great, at this stage we have installed Nebular Security and ready to configure it.

<hr>

## Related Articles

- Roles & Permissions [Configuration & Usage](docs/security/acl-configuration--usage)
