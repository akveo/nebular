# BuildSmoke

This project is used to verify all nebular packages were built properly.
We just install newly build packages in this app and build it in production mode.

# To run locally

1. Run `npm run build:packages` in the project root.
2. Go to "packages-smoke" directory and run `npm install`
3. Verifying application build:
   - `npm run build -- --configuration=production`
   - `npm run e2e`
4. Run with ssr:
   - `npm run build:ssr`
   - `npm run serve:ssr`
