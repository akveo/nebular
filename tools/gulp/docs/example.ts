import { dest, src, series } from 'gulp';
import { accessSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { DOCS_OUTPUT, EXTENSIONS } from '../config';

const del = require('del');
const replace = require('gulp-replace');

export const prepareExamples = series(copyExamples, validateExamples, populateOverviewAndLiveExamples);

/**
 * Copy everything from with-layout and without-layout dirs
 * directly into examples dir. This way we can reference examples
 * without specifying this dirs.
 * For example, @stacked-example(..., button/button-showcase.component)
 * instead of @stacked-example(..., layout/button/button-showcase.component)
 */
const EXAMPLES_SRC = [
  './src/playground/*.*',
  './src/playground/with-layout/**/*.*',
  './src/playground/without-layout/**/*.*',
];
const EXAMPLES_DEST = './docs/assets/examples';

function copyExamples() {
  del.sync(EXAMPLES_DEST);
  return src(EXAMPLES_SRC)
    .pipe(replace(/\/\*\*.*\*\/\n\s*\n/s, ''))
    .pipe(dest(EXAMPLES_DEST));
}

function validateExamples(done) {
  const docs = JSON.parse(readFileSync(DOCS_OUTPUT, 'utf8'));

  docs.classes.forEach((cls) => validate(cls));

  done();
}

function populateOverviewAndLiveExamples(done) {
  const docs = JSON.parse(readFileSync(DOCS_OUTPUT, 'utf8'));
  docs.classes.forEach((cls) => {
    cls.overview = cls.overview.map(unfold);
    cls.liveExamples = cls.liveExamples.map(unfold);
  });
  writeFileSync(DOCS_OUTPUT, JSON.stringify(docs));

  done();
}

function unfold(tag) {
  if (tag.type === 'text') {
    return tag;
  }

  return unfoldWithFiles(tag);
}

function unfoldWithFiles(tag) {
  if (isFile(tag.content.id)) {
    return unfoldFile(tag);
  }

  return unfoldComponent(tag);
}

function unfoldFile(tag) {
  const id = withoutExtension(tag.content.id);
  const files = [tag.content.id];
  return createNode(tag, files, id);
}

function unfoldComponent(tag) {
  const files = EXTENSIONS.map((extension) => `${tag.content.id}.${extension}`).filter(isFileExists);

  return createNode(tag, files);
}

function createNode(tag, files, id = tag.content.id) {
  return {
    ...tag,
    content: {
      ...tag.content,
      files,
      id,
    },
  };
}

function validate(cls) {
  const examples = cls.overview.filter(({ type }) => type !== 'text').map(({ content }) => content);

  const missing = examples.filter(({ id }) => !isFileExists(id) && !isComponentExists(id));

  if (missing.length) {
    throw new Error(createMissingMsg(missing));
  }
}

function createMissingMsg(examples): string {
  const missing = examples.map(({ id, name }) => `${name}, ${id}`);
  return `Can't resolve:\n${missing.join('\n')}`;
}

function isComponentExists(path): boolean {
  return EXTENSIONS.map((extension) => `${path}.${extension}`).some(isFileExists);
}

function isFileExists(file): boolean {
  try {
    const path = join(EXAMPLES_DEST, file);
    accessSync(path);
    return true;
  } catch (e) {
    return false;
  }
}

function isFile(id) {
  return EXTENSIONS.some((extension) => id.endsWith(extension));
}

function withoutExtension(file) {
  return file.replace(/\.(ts|html|scss)/, '');
}
