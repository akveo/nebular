# Redirect user

## Redirecting user after login/registration

At this step, we assume that the Nebular Auth module is up and running, 
you have successfully configured an auth strategy and adjusted auth look & fell accordingly with your requirements.

By default, Nebular redirects to the `/` page on success, and stays on the same page on error.


## Changing redirect path 

In a case you need to redirect to a different page, you can change it like this:

```typescript

@NgModule({
  imports: [
   // ...
    
   NbAuthModule.forRoot({
         strategies: [
           NbOAuth2AuthStrategy.setup({
             name: 'oauth',
             
             redirect: {
               success: '/welcome/', // welcome page path
               failure: null, // stay on the same page
             },
           }),
         ],
         forms: {},
       }), 
  ],
});

```

Using `NbPasswordAuthStrategy` you can specify redirect settings for a particular method:

```typescript

@NgModule({
  imports: [
   // ...
    
   NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
             name: 'email',
             
             login: {
               redirect: {
                 success: '/dashboard/',
                 failure: null, // stay on the same page
               },
             },

             register: {
               redirect: {
                 success: '/welcome/',
                 failure: null, // stay on the same page
               },
             }
           }),
         ],
         forms: {},
       }), 
  ],
});

```

## Related Articles

- Receiving [user token after authentication](docs/auth/getting-user-token)
- [Custom Auth Components](docs/auth/custom-auth-components)
