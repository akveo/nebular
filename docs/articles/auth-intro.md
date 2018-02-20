The main goal of the Auth module is to provide a pluggable set of components and services for easier setup of the authentication layer for the Angular applications.
The module separates the UI part (login/register components) from the business logic with help of the `authentication providers` layer. 

<div class="note note-info">
  <div class="note-title">Note</div>
  <div class="note-body">
    The setup still requires backend services to communicate with.
  </div>
</div>
<hr class="section-end">

## What's included

Authentication UI components:
  - Login
  - Logout
  - Register
  - Password Recover
  - Password Reset

You can use the built-in components or create your custom ones.  
  
Auth providers:
  - `NbDummyAuthProvider` - simple provider for testing purposes, could be used to simulate backend responses while API is in the development;
  - `NbEmailPassAuthProvider` - the most common email/password authentication strategy.
    
Other helper services:
  - `NbAuthService` - facade service to communicate with a configured provider;
  - `NbTokenService` - service that allows you to manage authentication token - get, set, clear and also listen to token changes over time;
  - `NbTokenLocalStorage` - storage service for storing tokens in a browser local storage;
  - `NbAuthJWTToken` and `NbAuthSimpleToken` - helper classes to work with your token;
  - `NbAuthJWTInterceptor` and `NbAuthSimpleInterceptor` - http interceptors to inject token value into http requests.

<hr class="section-end">

## Where to next

- Auth Module [Installation](#/docs/auth/installation) 
