Starting Nebular from [Nebular Admin](https://github.com/ngx-admin/) starter kit is the easiest way to run your first Nebular application. 
 
___________________________
Please note, that Nebular Admin is just a frontend web application. Backend integration can be done relatively simple, but you should be aware that all the data is mocked using Javascript objects. If you want data to be dynamic, you should develop integration by your own. Nebular team doesn't consider providing generic integration layer as a part of this project, because every backend API has different structure in terms of data format and URLs.
__________________________

## Install tools

To install Nebular on your machine you need to have following tools installed:
- Git - https://git-scm.com/
- Node.js - https://nodejs.org. Please note node **version** should be **>=7**
- You might also need some specific native packages depending on your operational system like `build-essential` on Ubuntu
_______________
Please note that **it is not possible** to build Nebular **without these tools** and it will not be possible because of the way how Angular was built.
_______________

## Download the code
After you finished with tools setup, you need to download code of Nebular Admin application. The easiest way to do that is to clone github repository:
```bash
git clone https://github.com/akveo/ngx-admin.git
```
After clone is completed, you need to install npm modules.
```bash
cd ngx-admin && npm i
```

**Please make sure that installation process terminated without errors.**

## Running local copy

To run a local copy in development mode, execute:

```bash
npm start
```

Go to http://0.0.0.0:4200 or http://localhost:4200 in your browser.


To run the local copy in a production mode and build the sources, execute:

```bash
npm run start:prod
```
or in AOT mode
```bash
npm run start:prod:aot
```

To create a bundle in production mode, execute:

```bash
npm run build:prod
```
or
```bash
npm run build:prod:aot
```

This will clear up your `dist` folder (where release files are located), generate a release build and start the built-in server.
Now you can copy the sources from the `dist` folder and use it with any backend framework or simply [put it under a web server](#/docs/guides/server-deployment).

