import { task } from 'gulp';
import { accessSync, readFileSync, writeFileSync } from 'fs';

const playgroundRoot = './src/playground/';
const docsSrc = './docs/output.json';
const extensions = ['ts', 'html', 'scss'];


task('find-full-examples', ['parse-themes'],  () => {
  console.dir(process.cwd());
  const docs = JSON.parse(readFileSync(docsSrc, 'utf8'));
  docs.classes.forEach(cls => {
    cls.overview = cls.overview.map(tag => {
      if (isTabbed(tag)) {
        return extendExample(tag);
      }

      return tag;
    });

    return cls;
  });

  writeFileSync(docsSrc, JSON.stringify(docs));
});

function isTabbed(tag) {
  return tag.type === 'inline-example'
    && !extensions.some(extension => tag.content.path.endsWith(extension))
}

function extendExample(tag) {
  const content = extensions.map(extension => `${tag.content.path}.${extension}`)
    .filter(checkIsExists);

  return { ...tag, content }
}

function checkIsExists(file): boolean {
  try {
    accessSync(playgroundRoot + file);
    return true;
  } catch (e) {
    return false;
  }
}

//
// function validateInlineExamples(cls) {
//   cls.overview.filter(tag => tag.type === 'inline-example')
//     .map(example => example.content.path)
//     .forEach(accessSync)
// }
//
// function validateLiveExamples(cls) {
//   cls.overview.filter(tag => tag.type === 'live-example')
//     .map(example => example.content)
//     .forEach(path => checkInRoutes(path))
// }
//
// function checkInRoutes(path: string) {
//   routes.
// }
