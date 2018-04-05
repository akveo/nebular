import { task } from 'gulp';
import { readFileSync, writeFileSync } from 'fs';
import { DOCS_OUTPUT } from '../config';
import { isFileExists } from './helpers';

const extensions = ['ts', 'html', 'scss'];

task('find-full-examples', ['parse-themes'], () => {
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

function isTabbed(tag) {
  return tag.type === 'inline-example'
    && !extensions.some(extension => tag.content.path.endsWith(extension))
}

function extendExample(tag) {
  const content = extensions.map(extension => `${tag.content.path}.${extension}`)
    .filter(isFileExists);

  return { ...tag, content }
}
