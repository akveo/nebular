## Receiving user token after login/registration

At this step, we assume that Nebular Auth module is up and running, 
you have successfully configured an auth provider and adjusted auth look & fell accordingly with your requirements.

It's time to get a user token after successful authentication to be able to communicate with the server and, for instance, show a username in the header of the application.
Let's assume that your backend returns a JWT token so that we can use the token payload to extract a user info out of it.

1) Firstly, let's tell Nebular that we are waiting for JWT token, to do that we just need to provide a respective class. Open your `app.module.ts` and add the following:

```typescript

import { NB_AUTH_TOKEN_WRAPPER_TOKEN, NbAuthJWTToken } from '@nebular/auth';

@NgModule({
  imports: [ ... ].
  
  providers: [
    ...
    { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useValue: NbAuthJWTToken },
  ],
});

```
This line tells Angular to inject `NbAuthJWTToken` (instead of the default `NbAuthSimpleToken`) which is a wrapper class around a value your API service returns.

2) Then, let's configure where Nebular should look for the token in the login/register response data. By default Nebular expects that your token is located under the `data.token` keys of the JSON response:

```typescript
{
  data: {
    token: 'some-jwt-token'
  }
}
```

We'll assume that our API returns a token as just `{token: 'some-jwt-token'}` not wrapping your response in the `data` property, let's tell that to Nebular:

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
                
               token: {
                 key: 'token', // this parameter tells Nebular where to look for the token
               },
             },
           },
         },
       }), 
  ],
});
```  


3) Okay, let's use the token to extract a payload and show a username in the header. Open your `header.component.ts` and import the following services:

```typescript
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
```

4) Then, let's create a `user` variable, which will store the token payload inside of the component: 

```typescript

@Component({
  ...
})
export class HeaderComponent {

  user = {};

  ...
}
```

5) Then, let's inject the `NbAuthService` and subscribe to an `onTokenChange` method, which will push an event on each token update so that the header component 
is up-to-date with the information received from the backend and there is no need to additionally refresh/request the data:

```typescript

@Component({
  ...
})
export class HeaderComponent {

  user = {};

  constructor(private authService: NbAuthService) {
  
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
      
        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable 
        }
        
      });
  }

}
```

6) Lastly, let's grad a `user` variable and put it in the template to show the user info. The `nb-user` component is a great fit for this:


```typescript

@Component({
  template: `
  
    <nb-layout-header fixed>
      <nb-user [name]="user?.name" [picture]="user?.picture"></nb-user>
    </nb-layout-header>
  `
})
export class HeaderComponent implements OnInit {
  ...
}
```
*We assume that the extracted payload contains name and picture properties*.

And done! Relatively you can inject `NbAuthService` in the other components to manage your authentication state in the application.
<hr class="section-end">

## Where to next

- [NbAuthService](#/docs/auth/nbauthservice)
- [NbTokenService](#/docs/auth/nbtokenservice)
