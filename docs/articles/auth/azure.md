# Configuring Azure OAuth2 with Nebular Auth

Using `NbOAuth2AuthStrategy` gives the possibility to configure authentication with a lot of 3rd party authentication providers, such as Azure in our example.
There is no need in any backend implementation, as [OAuth2](https://tools.ietf.org/html/rfc6749) protocol enables completely server-less authentication flow as one of the options.

## Complete example

A complete code example could be found on [GitHub](https://github.com/akveo/nebular/tree/master/src/playground/without-layout/azure).
And here the playground example available to play around with [Azure OAuth2 Nebular Example](/example/azure).

<hr>

## Related Articles

- [NbAuthService](/docs/auth/nbauthservice)
- [NbTokenService](/docs/auth/nbtokenservice)
- Receiving [user token after authentication](/docs/auth/getting-user-token)
- [NbOAuth2AuthStrategy](/docs/auth/nboauth2authstrategy)
