import { writeFileSync } from 'fs';

export function createTsConfigEsm2015(packageName): string {
  const config = `{
  "extends": "./tsconfig.publish",
  "compilerOptions": {
    "outDir": "./src/.lib/${packageName}/esm2015",
    "declaration": true,
    "declarationDir": "./src/.lib/${packageName}",
    "rootDir": "./.ng_build/${packageName}"
  },
  "files": ["./.ng_build/${packageName}/public_api.ts"],
  "angularCompilerOptions": {
    "skipTemplateCodegen": true,
    "strictMetadataEmit": true,
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true,
    "enableResourceInlining": true,
    "skipMetadataEmit": false,
    "strictTypeChecks": true,
    "flatModuleOutFile": "index.js",
    "flatModuleId": "@nebular/${packageName}"
  }
}`;

  const configName = `tsconfig.build-esm2015.${packageName}.json`;
  writeConfig(configName, config);

  return configName;
}

export function createTsConfigEsm5(packageName): string {
  const config = `
{
  "extends": "./tsconfig.publish",
  "compilerOptions": {
    "outDir": "./src/.lib/${packageName}/esm5",
    "declaration": false,
    "target": "es5",
    "rootDir": "./.ng_build/${packageName}"
  },
  "files": ["./.ng_build/${packageName}/public_api.ts"],
  "angularCompilerOptions": {
    "skipTemplateCodegen": true,
    "strictMetadataEmit": false,
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true,
    "enableResourceInlining": true,
    "skipMetadataEmit": true,
    "strictTypeChecks": true,
    "flatModuleOutFile": "index.js",
    "flatModuleId": "@nebular/${packageName}"
  }
}`;

  const configName = `tsconfig.build-esm5.${packageName}.json`;
  writeConfig(configName, config);

  return configName;
}

function writeConfig(fileName: string, config: string): void {
  writeFileSync(fileName, config);
}
