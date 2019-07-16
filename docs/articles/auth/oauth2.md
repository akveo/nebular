# Configuring Google OAuth2 with Nebular Auth

Using `NbOAuth2AuthStrategy` gives the possibility to configure authentication with a lot of 3rd party authentication providers, such as Google, Facebook, etc.
There is no need in any backend implementation, as [OAuth2](https://tools.ietf.org/html/rfc6749) protocol enables completely server-less authentication flow as one of the options.

In this article we will setup and configure `NbOAuth2AuthStrategy` for [Google Authentication](https://developers.google.com/identity/protocols/OAuth2UserAgent) 
based on [Implicit](https://tools.ietf.org/html/rfc6749#section-4.2) flow.
<hr>

## Step 1. Obtain keys

As a first step, we need to set up an application and obtain its keys on the authentication server (Google in our case).
More details how to do this you can find on [Enable APIs for your project](https://developers.google.com/identity/protocols/OAuth2UserAgent#enable-apis) page. 
We won't copy over this part of the article here, but as a result, you should have your `client_id` - unique application identifier.
<hr>

## Step 2. Enable a Strategy

Next step would be to register `NbOAuth2AuthStrategy` in your `app.module.ts`:

```ts
@NgModule({
  imports: [
    // ...

    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          // ...
        }),
      ],
    }),
  ],
})
export class YourModule {
}
``` 

So we imported `NbAuthModule` and provided a strategy we want to use. If you already have some strategy configurated - don't worry, you can just add a new one to the `strategies` array.
We also assigned a `name` - `google`. Later on, we will use this alias to call the strategy.
<hr>

## Step 3. Configure

Let's fill in our strategy with some settings. We add the `client_id` obtained in Step 1. We don't need client_secret for this authentication flow, so we leave it empty.
Then we set `authorize` endpoint, response_type (which is `token` in our case) and [scope](https://tools.ietf.org/html/rfc6749#section-3.3) of the authentication:
 
```ts
@NgModule({
  imports: [
    // ...

    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: 'YOUR_CLIENT_ID',
          clientSecret: '',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
          },
        }),
      ],
    }),
  ],
})
export class YourModule {
}
```
<hr>

## Step 4. Routes

We need at least two routes to be able to organize OAuth2 flow. First one - "login" route, where we can simply have a button to initiate the authentication process.
The second one - so-called "callback" route, we need to handle OAuth2 server response.
Let's add both to our routing referring some empty components:

```ts
RouterModule.forChild([
  {
    path: '',
    component: NbOAuth2LoginComponent,
  },
  {
    path: 'callback',
    component: NbOAuth2CallbackComponent,
  },
]),
```
<hr>

## Step 5. Redirect URI

The last configuration bit is to set up the `redirect_uri` parameter. Make sure you've added the URL to the Google Console as per the [documentation](https://developers.google.com/identity/protocols/OAuth2UserAgent#redirecting).

Now let's complete the setup:
```ts
@NgModule({
  imports: [
    // ...

    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: 'YOUR_CLIENT_ID',
          clientSecret: '',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            
            
            redirectUri: 'http://localhost:4100/example/oauth2/callback',
          },
        }),
      ],
    }),
  ],
})
export class YourModule {
}
```
<hr>

## Step 6. Complete your components

And finally, let's add code to our component to initiate the authentication. First - `NbOAuth2LoginComponent`:


```ts
@Component({
  selector: 'nb-oauth2-login',
  template: `
    <button class="btn btn-success" *ngIf="!token" (click)="login()">Sign In with Google</button>
  `,
})
export class NbOAuth2LoginComponent implements OnDestroy {

  alive = true;

  login() {
    this.authService.authenticate('google')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
```
The code is pretty much straightforward - we call `NbAuthService`.`authenticate` method and pass our strategy alias - `google` subscribing to result.
This will prepare `authorization` request URL and redirect us to google authentication server.

Now, we need to configure that "callback" URL to be able to properly handle response:

```ts
@Component({
  selector: 'nb-playground-oauth2-callback',
  template: `
    <nb-layout>
      <nb-layout-column>Authenticating...</nb-layout-column>
    </nb-layout>
  `,
})
export class NbOAuth2CallbackPlaygroundComponent implements OnDestroy {

  alive = true;

  constructor(private authService: NbAuthService, private router: Router) {
    this.authService.authenticate('google')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess()) {
          this.router.navigateByUrl('/pages/dashboard');
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
``` 
Here we call the same `authenticate` method, which will determine that we are in the `redirect` state, handle the response, save your token and redirect you back to your app.
<hr>

## Complete example

A complete code example could be found on [GitHub](https://github.com/akveo/nebular/tree/master/src/playground/with-layout/oauth2).
And here the playground example available to play around with [OAuth2 Nebular Example](/example/oauth2).

<hr>

## Related Articles

- [NbAuthService](/docs/auth/nbauthservice)
- [NbTokenService](/docs/auth/nbtokenservice)
- Receiving [user token after authentication](/docs/auth/getting-user-token)
- [NbOAuth2AuthStrategy](/docs/auth/nboauth2authstrategy)
