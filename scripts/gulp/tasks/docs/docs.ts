import { src, task } from 'gulp';
import { exportThemes } from './export-themes';
import './example';
import { structure as DOCS } from '../../../../docs/structure';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { isAbsolute, join, resolve, sep } from 'path';
import { DOCS_DIST } from '../config';

const typedoc = require('gulp-typedoc');
const sass = require('gulp-sass');
const exec = require('child_process').execSync;

task('docs', ['generate-doc-json', 'find-full-examples']);
task('generate-doc-json', generateDocJson);
task('parse-themes', ['generate-doc-json'], parseThemes);
task('create-docs-dirs', () => {
  const docsStructure = flatten('docs', routesTree(DOCS));
  createDirsStructure(docsStructure);
});

function generateDocJson() {
  return src(['src/framework/**/*.ts', '!src/**/*.spec.ts', '!src/framework/theme/**/node_modules{,/**}'])
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

function parseThemes() {
  exec('prsr -g typedoc -f angular -i docs/docs.json -o docs/output.json');
  return src('docs/themes.scss')
    .pipe(sass({
      functions: exportThemes('docs/', ''),
    }));
}

function routesTree(structure) {
  return structure
    .filter((page: any) => ['section', 'page', 'tabs'].includes(page.type))
    .map((page: any) => {
      if (page.type === 'tabs') {
        page.children = ['overview', 'api', 'theme', 'examples']
          .map(name => ({ name, type: 'page'}));
      }
      return page;
    })
    .map((page: any) => {
      return {
        path: prepareSlag(page.name),
        children: page.children ? routesTree(page.children) : [],
      }
    });
}

function prepareSlag(name) {
  return name.replace(/[^a-zA-Z0-9\s]+/g, '')
    .replace(/\s/g, '-')
    .toLowerCase();
}

function flatten(root, arr) {
  let res: any[] = [];
  arr.forEach((item: any) => {
    const path = `${root}/${item.path}`;
    res.push(path);
    if (item.children) {
      res = res.concat(flatten(path, item.children));
    }
  });

  return res;
}

function createDirsStructure(dirs) {
  const index = readFileSync(join(DOCS_DIST, 'index.html'), 'utf8');
  dirs.forEach((dir: any) => {
    const fullPath = join(DOCS_DIST, dir);
    if (!existsSync(fullPath)) {
      mkDirByPathSync(fullPath);
    }

    writeFileSync(join(fullPath, 'index.html'), index);
  });
}

function mkDirByPathSync(targetDir, {isRelativeToScript = false} = {}) {
  const initDir = isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = resolve(baseDir, parentDir, childDir);
    try {
      mkdirSync(curDir);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    return curDir;
  }, initDir);
}
