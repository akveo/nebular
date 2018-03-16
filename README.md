[![npm](https://img.shields.io/npm/l/@nebular/theme.svg)]()
[![Build Status](https://travis-ci.org/akveo/nebular.svg?branch=master)](https://travis-ci.org/akveo/nebular)
[![npm](https://img.shields.io/npm/dt/@nebular/theme.svg)](https://www.npmjs.com/package/@nebular/theme)
[![Dependency Status](https://david-dm.org/akveo/ngx-admin/status.svg)](https://david-dm.org/akveo/ng2-admin)

## Nebular is a set of essential modules for your next Angular application.

### What's included:

#### :art: Theme
@nebular/theme

Main Nebular module which includes UI Kit and Theme System.

##### Native Angular Components

| Component    | Description                                                          |
|--------------|----------------------------------------------------------------------|
|              |                                                                      |
| Layout       | Page layout component, with configurable columns, header and footer. |
| Sidebar      | Layout sidebar with multiple states.                                 |
| Menu         | Multi-depth menu component.                                          |
| Card         | Basic card with arbitrary header and footer.                         |
| Flip Card    | A card with back and front sides and "flip" switching effect.        |
| Reveal Card  | A card with back and front sides and "reveal" switching effect.      |
| Search       | Global search with amazing showing animations.                       |
| Tabs         | Basic and route-based tab components.                                |
| Actions      | Horizontal actions bar.                                              |
| User         | User avatar with context menu.                                       |
| Badge        | Simple helper components for showing a badge.                        |
| Popover      | Pop-up box that appears when a user clicks on an element.            |
| Context Menu | A directive to attache a menu to any element.                        |
| Checkbox     | Simple checkbox with two-way data binding support.                   |

##### Theme System
A set of beautiful styles with handy mixins and guidelines to create and support multiple themes in one project. With themes **hot reload** without a page refresh.

##### Bootstrap Styles
Overridings for bootstrap styles for elements consistency with the rest of your theme.

##### Server Side Rendering 
Components are compatible with SSR, meaning that it is possible to render them on server.


#### :closed_lock_with_key: Auth
@nebular/auth

UI and logic for front-end authentication flow.

##### Auth UI Components

| Component        | Description                                                     |
|------------------|-----------------------------------------------------------------|
|                  |                                                                 |
| Login            | Email & password login page.                                    |
| Register         | Sign up page component.                                         |
| Reset Password   | A page to request password reset.                               |
| Restore Password | A page to setup a new password.                                 |
| Auth Block       | Wrapper to center auth component on a page.                     |

##### Auth Providers

Auth UI decoupled from the communication to a particular back-end through out authentication provider services allowing you to connect to any backend API.

##### Token Management

Services to retrieve, store and publish authentication token with helpers for JWT.

##### Token Storage

Configurable token storage service.

##### Auth Interceptors

#### :cop: Security
@nebular/security

##### ACL

Roles and permission management based on access control list. `*nbIsGranted` conditional directive.


### Starter Kits

[ngx-admin](http://github.com/akveo/ngx-admin) - application based on Nebular modules with beautiful IOT components.
[ngx-admin-starter](https://github.com/akveo/ngx-admin/tree/starter-kit) - clean application based on Nebular modules with a limited number of additional dependencies.


### Demo Application:

- [Live Demo](http://akveo.com/ngx-admin) - our ngx-admin demo application built on top of Nebular. 
- Click [here](https://github.com/akveo/ngx-admin) to find ngx-admin repository.


### Use cases
Nebular is a great toolkit if you build a Rich UI web-application based on Angular, and don't want to spend your time on painful project setup. It provides you with a unified approach for managing styles of various components (3rd party including), pure components tightly connected to Angular and authentication layer easily configurable for your API.

### The purpose
There are a lot of awesome front-end frameworks and libraries out there these days. They provide a massive quantity of useful features making our lives more comfortable. Our intention is not to create a new one as we are pretty much aware of the complexity and amount of work developers put on their creations. But as developers, we feel that nowadays front-end development is disjointed. You have to search for libraries, go through the different installation process, everything looks different, and sometimes it's just annoying that you can't just sit and start going. That's why we are on a mission to assemble together the most usefule modules and libraries, join them with a unified application and graphical interface creating a great toolkit for easier setup.

### Documentation
Installation, customization and other useful articles: https://akveo.github.io/nebular

### License
[MIT](LICENSE.txt) license.

### BrowserStack
This project runs its tests on multiple desktop and mobile browsers using [BrowserStack](http://www.browserstack.com).

<img src="https://cloud.githubusercontent.com/assets/131406/22254249/534d889e-e254-11e6-8427-a759fb23b7bd.png" height="40" />

### How can I support the developers?
- Star our GitHub repo :star:
- Create pull requests, submit bugs, suggest new features or documentation updates :wrench:
- Follow us on [Twitter](https://twitter.com/akveo_inc) :feet:
- Like our page on [Facebook](https://www.facebook.com/akveo/) :thumbsup:

### From Akveo
Made with :heart: by [Akveo team](http://akveo.com/). Follow us on [Twitter](https://twitter.com/akveo_inc) to get the latest news first!
We're always happy to receive your feedback!
