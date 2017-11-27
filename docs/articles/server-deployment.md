Though in the development Nebular app consists of a number of TypeScript, SASS, etc files, the built package is just a bunch HTML/JavaScript/CSS files.
No other processing is needed to get them running in a browser.
So to deploy the app you basically need two simple steps:

1. Build your app with `npm run build:prod`
2. Copy the output from the `dist` folder under a web-server of your choice.

More details on how to setup your web-server to better serve the application can be found on Angular Documentation website, under <a href="https://angular.io/guide/deployment#server-configuration" target="_blank">Server Configuration</a> section.
<hr class="section-end">

## Next

- [Backend configuration](#/docs/guides/backend-integration).
