# BuildSmoke

This project is used to verify all nebular packages were built properly.
We just install newly build packages in this app and build it in production mode.

# To run locally
1. Run `npm run release:prepare` in the project root.
2. Copy folder .lib from `src/.lib` to `packages-smoke/.lib`
3. Go to folder packages-smoke run `npm install`
4. Verifying application build:
     - `npm run build -- --prod`
     - `npm run build -- --configuration=production-2015`
     - `npm run e2e`
     - `npm run e2e -- --configuration=production-2015`
5. Run with ssr:
     - `npm run build:ssr`
     - `npm run serve:ssr`
