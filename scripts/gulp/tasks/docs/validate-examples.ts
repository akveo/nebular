import { task } from 'gulp';
import { readFileSync } from 'fs';
import { DOCS_OUTPUT } from '../config';
import { isFileExists } from './helpers';

task('validate-examples', ['parse-themes'], () => {
  const docs = JSON.parse(readFileSync(DOCS_OUTPUT, 'utf8'));
  docs.classes.forEach(cls => validateInlineExamples(cls));
});

function validateInlineExamples(cls) {
  const examples = cls.overview.filter(tag => {
    return tag.type === 'inline-example' && tag.content.path;
  }).map(example => example.content.path);

  const missing = examples.filter(file => !isFileExists(file));

  if (missing.length) {
    throw new Error(`Can't resolve:\n${missing.join('\n')}`);
  }
}
