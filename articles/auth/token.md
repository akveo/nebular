# Getting user token

## Receiving user token after login/registration

At this step, we assume that the Nebular Auth module is up and running, 
you have successfully configured an auth strategy and adjusted auth look & fell accordingly with your requirements.

It's time to get a user token after a successful authentication to be able to communicate with the server and, for instance, show username in the header of the application.
Let's assume that your backend returns a JWT token so that we can use the token payload to extract user info out of it.

Each `Strategy` specifies which token class is going to be used by default. For example, `NbPasswordAuthStrategy` uses `NbAuthSimpleToken`,
and `NbOAuth2AuthProvider` uses `NbAuthOAuth2Token`. It is also possible to specify another token class if it is required, like in the example below.
<hr>

## Configure the token type

Let's tell Nebular that we are waiting for a JWT token instead of a simple string token.
We just need to provide a respective class to do that. Open your `app.module.ts` and adjust your `Strategy` configuration:

```typescript

@NgModule({
  imports: [
   // ...
    
   NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
             name: 'email',
             
             token: {
               class: NbAuthJWTToken,
             }
           }),
         ],
         forms: {},
       }), 
  ],
});

```
This line tells Angular to inject `NbAuthJWTToken` (instead of the default `NbAuthSimpleToken`) which is a wrapper class around a value your API service returns.
<hr>

## Configure token extraction

Then, let's configure where `NbPasswordAuthStrategy` should look for a token in the login/register response data. 
By default `NbPasswordAuthStrategy` expects that your token is located under the `data.token` key of the JSON response:

```typescript
{
  data: {
    token: 'some-jwt-token'
  }
}
```

We'll assume that our API returns a token as just `{ token: 'some-jwt-token' }` not wrapping your response in `data` property, let's tell that to Nebular:

```typescript

@NgModule({
  imports: [
   // ...
    
   NbAuthModule.forRoot({
         strategies: [
           NbPasswordAuthStrategy.setup({
             name: 'email',
             
             token: {
               class: NbAuthJWTToken,
              
               key: 'token', // this parameter tells where to look for the token
             }
           }),
         ],
         forms: {},
       }), 
  ],
});

```
<hr>

## Use token

Okay, let's use the token to extract a payload and show username in the header. Open your `header.component.ts` and import the following services:

```typescript
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
```

Then, let's create a `user` variable, which will store the token payload inside of the component: 

```typescript

@Component({
  ...
})
export class HeaderComponent {

  user = {};

  ...
}
```

Then, let's inject the `NbAuthService` and subscribe to an `onTokenChange` method, which will push an event on each token update so that the header component 
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
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable 
        }
        
      });
  }

}
```

Lastly, let's grab a `user` variable and put it in the template to show the user info. The `nb-user` component is a great fit for this:


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
<hr>

## Related Articles

- [NbAuthService](docs/auth/nbauthservice)
- [NbTokenService](docs/auth/nbtokenservice)
