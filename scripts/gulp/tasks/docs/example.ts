import { task } from 'gulp';
import { accessSync, readFileSync, writeFileSync } from 'fs';
import { DOCS_OUTPUT, EXTENSIONS, PLAYGROUND_ROOT } from '../config';
import { join } from 'path';


task('find-full-examples', ['parse-themes', 'validate-examples'], () => {
  const docs = JSON.parse(readFileSync(DOCS_OUTPUT, 'utf8'));
  docs.classes.forEach(cls => {
    cls.overview = cls.overview.map(tag => {
      if (isTabbed(tag)) {
        return extendExample(tag);
      }

      return tag;
    });

    return cls;
  });

  writeFileSync(DOCS_OUTPUT, JSON.stringify(docs));
});

task('validate-examples', ['parse-themes'], () => {
  const docs = JSON.parse(readFileSync(DOCS_OUTPUT, 'utf8'));
  docs.classes.forEach(cls => validateInlineExamples(cls));
});

function isTabbed(tag) {
  return tag.type === 'inline-example'
    && !EXTENSIONS.some(extension => tag.content.path.endsWith(extension))
}

function extendExample(tag) {
  const content = EXTENSIONS.map(extension => `${tag.content.path}.${extension}`)
    .filter(isFileExists);

  if (content.length === 1) {
    const component = tag.content.path;
    const real = content.shift();
    throw new Error(`${component} contains only one file, please specify concrete file: ${real} instead.`);
  }

  return { ...tag, content }
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
