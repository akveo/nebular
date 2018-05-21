import { dest, src, task } from 'gulp';
import { accessSync, readFileSync, writeFileSync } from 'fs';
import { DOCS_OUTPUT, EXTENSIONS, PLAYGROUND_ROOT } from '../config';
import { join } from 'path';

const del = require('del');
const replace = require('gulp-replace');

const EXAMPLES_SRC = './src/playground/**/*.*';
const EXAMPLES_DEST = './docs/assets/examples';

task('copy-examples', () => {
  del.sync(EXAMPLES_DEST);
  src(EXAMPLES_SRC)
    .pipe(replace(/(\s|\S)*?import/, 'import'))
    .pipe(dest(EXAMPLES_DEST))
});

task('find-full-examples', ['parse-themes', 'validate-examples'], () => {
  const docs = JSON.parse(readFileSync(DOCS_OUTPUT, 'utf8'));
  docs.classes.forEach(cls => {
    cls.overview = cls.overview.map(tag => {
      if (isTabbed(tag)) {
        return unfoldTabbed(tag);
      }

      if (isStacked(tag)) {
        return unfoldStacked(tag);
      }

      return tag;
    });
  });

  writeFileSync(DOCS_OUTPUT, JSON.stringify(docs));
});

task('validate-examples', ['parse-themes'], () => {
  const docs = JSON.parse(readFileSync(DOCS_OUTPUT, 'utf8'));
  docs.classes.forEach(cls =>  validateInlineExamples(cls));
});

function isTabbed(tag) {
  return tag.type === 'inline-example'
    && !EXTENSIONS.some(extension => tag.content.path.endsWith(extension))
}

function isStacked(tag) {
  return tag.type === 'example'
    && !EXTENSIONS.some(extension => tag.content.endsWith(extension))
}

function unfoldTabbed(tag) {
  const content: any = EXTENSIONS.reduce((acc: any, extension) => {
    const file = `${tag.content.path}.${extension}`;

    if (isFileExists(file)) {
      acc[extension] = file;
    }

    return acc;
  }, {});

  return { ...tag, content }
}

function unfoldStacked(tag) {
  const tabs = EXTENSIONS.reduce((acc: any, extension) => {
    const file = `${tag.content}.${extension}`;

    if (isFileExists(file)) {
      acc[extension] = file;
    }

    return acc;
  }, {});

  return {...tag, content: { tabs, id: tag.content }}
}

function validateInlineExamples(cls) {
  const examples = cls.overview
    .filter(tag => tag.type === 'inline-example' && tag.content.path)
    .map(example => example.content.path);

  const missing = examples.filter(file => !isFileExists(file) && !isComponentExists(file));

  if (missing.length) {
    throw new Error(`Can't resolve:\n${missing.join('\n')}`);
  }
}

export function isComponentExists(path): boolean {
  return EXTENSIONS.map(extension => `${path}.${extension}`)
    .some(isFileExists);
}

export function isFileExists(file): boolean {
  try {
    const path = join(PLAYGROUND_ROOT, file);
    accessSync(path);
    return true;
  } catch (e) {
    return false;
  }
}
