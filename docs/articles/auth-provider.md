## A provider

In Nebular terms `auth provider` is a class containing authentication logic using by the application UI. 
It accepts user input (login/email/password/oauth token/etc), communicates the input to the backend API and finally provides some resulting output back to the UI layer.
Currently, there are two Auth Providers available out of the box:

Two auth providers:
  - `NbDummyAuthProvider` - simple provider for testing purposes, could be used to simulate backend responses while API is in the development;
  - `NbEmailPassAuthProvider` - the most common email/password authentication strategy.
  
Each provider has a list of configurations available with the default values set. But you can adjust the settings based on your requirements.
<hr class="section-end">
  
## Configuration

As an example, let's configure API endpoints for the `NbEmailPassAuthProvider`. The provider is all set by default, so please take a look at the [default configuration values]((#/docs/auth/email--password-provider) before modifying them.
We assume you already have the Auth module installed inside of your `*.module.ts`:


```typescript

@NgModule({
  imports: [
   // ...
    
   NbAuthModule.forRoot({
         providers: {
           email: {
             service: NbEmailPassAuthProvider,
             config: {
              ...
             },
           },
         },
       }), 
  ],
});

```

Now, let's add API endpoints. According to the [NbEmailPassAuthProvider documentation](#/docs/auth/email--password-provider), we have `baseEndpoint` setting, and also an `endpoint` setting for each function (login/register/etc):

```typescript
{
 ...
 baseEndpoint: '',
 login: {
   ...
   endpoint: '/api/auth/login',
   ...
 },
 register: {
   ...
   endpoint: '/api/auth/register',
   ...
 },
```

Let's assume that our API is localed on a separate server `http://example.com/app-api/v1` and change the `baseEndpoint` accordingly:

```typescript
{
 ...
 baseEndpoint: 'http://example.com/app-api/v1',
 ...
}
```

And configure the endpoints, considering that the final endpoint will consist of `baseEndpoint + method.endpoint`:

```typescript
{
 baseEndpoint: 'http://example.com/app-api/v1',
 login: {
   endpoint: '/auth/sign-in',
 },
 register: {
   endpoint: '/auth/sign-up',
 },
 logout: {
    endpoint: '/auth/sign-out',
  },
  requestPass: {
    endpoint: '/auth/request-pass',
  },
  resetPass: {
    endpoint: '/auth/reset-pass',
  },
}
```

Finally, let's presume that unlike in the default provider settings, our API accepts only `HTTP POST`, so let's fix that too: 

```typescript
{
 baseEndpoint: 'http://example.com/app-api/v1',
 login: {
   endpoint: '/auth/sign-in',
   method: 'post',
 },
 register: {
   endpoint: '/auth/sign-up',
   method: 'post',
 },
 logout: {
    endpoint: '/auth/sign-out',
    method: 'post',
  },
  requestPass: {
    endpoint: '/auth/request-pass',
    method: 'post',
  },
  resetPass: {
    endpoint: '/auth/reset-pass',
    method: 'post',
  },
}
```

<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    No need to list all available configurations there. Your settings will be merged with default provider settings accordingly.
  </div>
</div>

Great! With these simple steps, you should have the authentication layer correctly configured against your API back-end.
<hr class="section-end">

## Where to next

- Adjusting [Auth Components UI](#/docs/auth/configuring-ui)
- Receiving [user token after authentication](#/docs/auth/getting-user-token)
