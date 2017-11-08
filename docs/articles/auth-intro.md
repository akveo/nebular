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
  
Two auth providers:
  - Dummy auth provider - simple provider for testing purposes, could be used to simulate backend responses while API is in the development;
  - EmailPass auth provider - the most common email/password authentication strategy.
    
Other helper services:
  - Token Service, JWT token, and Simple token - helper services for token management handling;
  - JWT and Simple HTTP interceptors - intercepts the token into your HTTP requests.

<hr class="section-end">

## Where to next

- Auth Module [Installation](#/docs/auth/installation) 
