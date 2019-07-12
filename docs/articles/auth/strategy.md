# Strategy

In Nebular terms `Auth Strategy` is a class containing authentication logic specific for some authentication flow (email/password, OAuth2, etc). 
It accepts user input (login/email/password/token/etc), communicates the input to the backend API and finally provides the resulting output back to the Auth UI layer.
Currently, there are two Auth Strategies available out of the box:

  - `NbDummyAuthStrategy` - a simple strategy for testing purposes, could be used to simulate backend responses while API is in the development;
  - `NbPasswordAuthStrategy` - the most common email/password authentication strategy.
  
Each Strategy has a list of configurations available with the default values set. But you can adjust the settings based on your requirements.
<hr>
  
## Configure a strategy

As an example, let's configure API endpoints for the `NbPasswordAuthStrategy`. The strategy is configured by default, please take a look at the [default configuration values](docs/auth/nbpasswordauthstrategy) if you need any custom behavior.
We assume you already have the Auth module installed inside of your `*.module.ts`:


```typescript

@NgModule({
  imports: [
   // ...
    
   NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
             name: 'email',
           }),
         ],
         forms: {},
       }), 
  ],
});

```
`email` here is an alias we've assigned to the strategy so that we can dynamically mention it later. This also allows us to configure multiple strategies with various configurations in one app.
<hr>

## Setup API configuration

Now, let's add API endpoints. According to the [NbPasswordAuthStrategy documentation](docs/auth/nbpasswordauthstrategy), we have `baseEndpoint` setting, and also an `endpoint` setting for each function (login/register/etc):

```typescript

@NgModule({
  imports: [
   // ...
    
   NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
             name: 'email',
            
             baseEndpoint: '',
              login: {
                // ...
                endpoint: '/api/auth/login',
              },
              register: {
                // ...
                endpoint: '/api/auth/register',
              },
           }),
         ],
         forms: {},
       }), 
  ],
});
```

Let's assume that our API is localed on a separate server `http://example.com/app-api/v1` and change the `baseEndpoint` accordingly:

```typescript
{
 // ...
 baseEndpoint: 'http://example.com/app-api/v1',
 // ...
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

Finally, let's presume that unlike in the default strategy settings, our API accepts only `HTTP POST`, so let's fix that too: 

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
    No need to list all available configurations there. Your settings will be merged with default strategy settings accordingly.
  </div>
</div>

Great! With these simple steps, you should have the authentication layer correctly configured against your API back-end.
<hr>

## Related Articles

- Adjusting [Auth Components UI](docs/auth/configuring-ui)
- Receiving [user token after authentication](docs/auth/getting-user-token)
