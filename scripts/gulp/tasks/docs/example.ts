import { dest, src, task } from 'gulp';
import { accessSync, readFileSync, writeFileSync } from 'fs';
import { DOCS_OUTPUT, EXTENSIONS, PLAYGROUND_ROOT } from '../config';
import { join } from 'path';

const EXAMPLES_SRC = './src/playground/**/*.*';
const EXAMPLES_DEST = './docs/assets/examples';

task('copy-examples', () => {
  src(EXAMPLES_SRC).pipe(dest(EXAMPLES_DEST))
});

task('find-full-examples', ['parse-themes', 'validate-examples'], () => {
  const docs = JSON.parse(readFileSync(DOCS_OUTPUT, 'utf8'));
  docs.classes.forEach(cls => {
    cls.overview = cls.overview.map(unfold);
    cls.liveExamples = cls.liveExamples.map(unfold);
  });
  writeFileSync(DOCS_OUTPUT, JSON.stringify(docs));
});

task('validate-examples', ['parse-themes'], () => {
  const docs = JSON.parse(readFileSync(DOCS_OUTPUT, 'utf8'));
  docs.classes.forEach(cls => validate(cls));
});

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
  const files = EXTENSIONS
    .map(extension => `${tag.content.id}.${extension}`)
    .filter(isFileExists);

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
  const examples = cls.overview
    .filter(({ type }) => type !== 'text')
    .map(({ content }) => content);

  const missing = examples.filter(({ id }) => !isFileExists(id) && !isComponentExists(id));

  if (missing.length) {
    throw new Error(createMissingMsg(missing));
  }
}

function createMissingMsg(examples): string {
  const missing = examples.map(({ id }) => id);
  return `Can't resolve:\n${missing.join('\n')}`;
}

function isComponentExists(path): boolean {
  return EXTENSIONS
    .map(extension => `${path}.${extension}`)
    .some(isFileExists);
}

function isFileExists(file): boolean {
  try {
    const path = join(PLAYGROUND_ROOT, file);
    accessSync(path);
    return true;
  } catch (e) {
    return false;
  }
}

function isFile(id) {
  return EXTENSIONS.some(extension => id.endsWith(extension));
}

function withoutExtension(file) {
  return file.replace(/\.(ts|html|scss)/, '');
}
