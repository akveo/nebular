/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export function createTsconfigContent(target: string) {
  return {
    'compilerOptions': {
      'declaration': true,
      'emitDecoratorMetadata': true,
      'experimentalDecorators': true,
      'lib': [
        'es2017',
        'dom',
      ],
      'module': 'es2015',
      'moduleResolution': 'node',
      'noEmitOnError': true,
      'outDir': `../.lib_dist/${target}`,
      'rootDir': './',
      'sourceMap': true,
      'target': target,
      'inlineSources': true,
      'stripInternal': true,
      'baseUrl': '.',
      'skipLibCheck': true,
      'typeRoots': [
        'node_modules/@types',
      ],
      'paths': {
        '@nebular/theme': ['./theme'],
      },
    },
    'include': [`./**/*`],
    'exclude': [
      './**/*.e2e.ts',
      './**/*.spec.ts',
      './**/schematics/*',
    ],
    'angularCompilerOptions': {
      'skipTemplateCodegen': true,
      'strictMetadataEmit': true,
      'fullTemplateTypeCheck': true,
      'genDir': './.ng_compiled',
    },
  }
}
