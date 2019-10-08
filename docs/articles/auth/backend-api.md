# Backend Auth Endpoints

<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    While this page provides description about the API endpoints required to integrate Nebular Auth module with your backend, you can also save time by purchasing a
    <a href="https://store.akveo.com?utm_source=nebular_documentation&utm_medium=backend_api_endpoints">
      backend bundle from Akveo Store
    </a>
    for your technology.
  </div>
</div>

Your backend API should support the following endpoint to be compatible with out of the box nebular Authentication Strategies:

- POST method `<domain>/auth/login`

  This is the regular login method, used for the first time call with email and password. The received token will be passed as a header on all further API requests.
  Input:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
  Output:
  ```json
  {
    "token": "string"
  }
  ```

- POST method `<domain>/auth/sign-up`

  This call is to create a new user. Its called after clicking on ‘Register’ button on a Login form.

  Input:
  ```json
  {
    "email": "string",
    "password": "string",
    "fullName": "string",
    "confirmPassword": "string"
  }
  ```
  Output:
  ```json
  {
    "token": "string"
  }
  ```
- POST method `<domain>/auth/request-pass`

  This call is used to request a password reset token. The token is not returned as endpoint output. Instead, it’s expected that the user will receive token to reset password in email and use it for the next call.

  Input:
  ```json
  {
    "email": "string"
  }
  ```
  Output: `Status 200`

- POST method `<domain>/auth/reset-pass`
  This call is used to clear sign in information if it exists. In case of fully REST service which doesn’t keep such information at the backend - just return status 200.
  
  Input:
  ```json
  {
    "email": "string"
  }
  ```
  Output: `Status 200`

# Token Validation

All other endpoints of your API, which are not public, should be protected by token validation. Nebular Auth Module puts JWT token as a header to each request.

# Sample for pure Node.JS

This sample shows part of app.js file how to setup the controller to get users data and validate each controller endpoint using [Passport](https://github.com/jaredhanson/passport) module.

```ts
app.use(`${root}/users`, passport.authenticate('jwt', { session: false }), userController);
```

# Sample for Nest.JS framework for Node.JS

This sample shows how to use [Passport](https://github.com/nestjs/passport/) module for controller calls validation

```ts
@UseGuards(AuthGuard('jwt'))
export class UserController { }
```

Additional information for backend implementation on the subject can be found:
- https://github.com/nestjs/passport/ 
- https://github.com/jaredhanson/passport
- https://docs.nestjs.com/techniques/authentication

