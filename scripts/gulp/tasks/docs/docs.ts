import { src, task } from 'gulp';
import { exportThemes } from './export-themes';

const typedoc = require('gulp-typedoc');
const sass = require('gulp-sass');
const exec = require('child_process').execSync;

task('docs', ['generate-doc-json'], parseSassThemes);
task('generate-doc-json', generateDocJson);

function generateDocJson() {
  return src(['src/framework/**/*.ts', '!src/framework/theme/**/node_modules{,/**}'])
    .pipe(typedoc({
      module: 'commonjs',
      target: 'ES6',
      // TODO: ignoreCompilerErrors, huh?
      ignoreCompilerErrors: true,
      includeDeclarations: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      excludeExternals: true,
      exclude: 'node_modules/**/*',
      json: 'docs/docs.json',
      version: true,
      noLib: true,
    }));
}

function parseSassThemes() {
  exec('prsr -g typedoc -f angular -i docs/docs.json -o docs/output.json');
  return src('docs/themes.scss')
    .pipe(sass({
      functions: exportThemes('docs/', ''),
    }));
}
