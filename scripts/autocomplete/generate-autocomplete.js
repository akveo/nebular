const path = require('path');
const fs = require('fs');
const files = process.argv.slice(2);

const scriptPath = __dirname.split(path.sep);
const projectDir = scriptPath.splice(0, scriptPath.length - 2).join(path.sep) + path.sep;
const pathToThemes = ['src', 'framework', 'theme', 'styles', 'themes'];
const resultFilePath =  projectDir + pathToThemes.join(path.sep) + path.sep;
const resultFileName = '_autocomplete.scss';

/**
 * @returns Array of properties for each file respectively
 */
async function getProperites() {
  return Promise.all(files
    .filter(file => file.endsWith('.scss'))
    .map(async file => {
      const buffer = fs.readFileSync(file);
      const extractThemeContent = /[\w\W]*\$theme: \(([\w\W]*?)\);[\w\W]*/g;
      const removeComments = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/g;
      const getProperties = /([\w-]*:)/g;
      const themeContent = extractThemeContent.exec(buffer.toString())[1];
      const themeContentWithoutComments = themeContent.replace(removeComments, '');
      const propertiesMatch = themeContentWithoutComments.matchAll(getProperties);
      const props = [];

      for (let item of propertiesMatch) {
        props.push(item[0].substr(0, item[0].length - 1));
      }

      return props;
    }));
}

const props = getProperites();

props.then(_ => {
  const uniqueProps = [...new Set(_.flat())];

  let data = "";

  uniqueProps.forEach(prop => {
    data += `@function ${prop}() { @return nb-theme(${prop}); }\n\n`;
  });

  fs.writeFileSync(resultFilePath + resultFileName, data);
});

