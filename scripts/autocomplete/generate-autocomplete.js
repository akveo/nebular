const path = require('path');
const fs = require('fs');
const inputFiles = process.argv.slice(2);

const scriptPath = __dirname.split(path.sep);
const projectDir = scriptPath.splice(0, scriptPath.length - 2).join(path.sep) + path.sep;
const pathToThemes = ['src', 'framework', 'theme', 'styles', 'themes'];
const pathToAutocomplete = ['src', 'framework', 'theme', 'styles']; // Path for autocomplete feature file from project root

const themeFilesPath = projectDir + pathToThemes.join(path.sep) + path.sep;
const resultFilePath =  projectDir + pathToAutocomplete.join(path.sep) + path.sep;
const resultFileName = '_autocomplete.scss'; // Autocomplete feature file

const start = new Date().getTime();

getFilesInThemesDir(inputFiles)
  .then(files => getVariables(files))
  .then(vars => {
      const uniqueProps = [...new Set(vars.flat())];
      let data = "";

      uniqueProps.forEach(prop => {
        data += `@function ${prop}() { @return nb-theme(${prop}); }\n\n`;
      });

      fs.writeFileSync(resultFilePath + resultFileName, data);
  })
  .finally(() => console.log(`Autocomplete generated. Generation took ${(new Date().getTime() - start) / 1000} seconds.`))
  .catch(err => console.error("Was unable to parse themes for generating autocomplete. Error message: \n " + err.stack));

/**
 * If no files given, take built-in Nebular themes
 *
 * @returns {Promise<string[]>}
 */
async function getFilesInThemesDir(inputFiles) {
  let files = inputFiles;
  if (!files || files.length === 0) {
    files = [];
    fromDir(files, themeFilesPath,'.scss');
  }
  return files;
}

/**
 * Parses all given scss theme files for variables
 *
 * @returns Array of variables for each file respectively
 */
async function getVariables(files) {
  return Promise.all(
    files
      .filter(file => {
        console.log(file);
        const isScss = file.endsWith('.scss');
        if (!isScss) {
          console.warn(`File '${file}' provided for autocomplete generation has no .scss extension. It will be skipped.`);
        }
        return isScss;
      })
      .map(parseFileVars)
  );
}

/**
 * Parses given scss theme file for variables
 *
 * @returns Array of variables for given file
 */
async function parseFileVars(file) {
  const buffer = fs.readFileSync(file);
  const extractThemeContent = /[\w\W]*\$(?:theme|eva-mapping): \(([\w\W]*?)\);[\w\W]*/g;
  const removeComments = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/g;
  const getProperties = /([\w-]*:)/g;
  const themeParseResult = extractThemeContent.exec(buffer.toString());
  if (!themeParseResult || themeParseResult.length === 0) {
    return;
  }
  const themeContent = themeParseResult[1];
  const themeContentWithoutComments = themeContent.replace(removeComments, '');
  const propertiesMatch = themeContentWithoutComments.matchAll(getProperties);
  const vars = [];

  for (let item of propertiesMatch) {
    vars.push(item[0].substr(0, item[0].length - 1));
  }

  return vars;
}


/**
 * Finds all files in directory by extension
 *
 * @param fileList variable
 * @param directory
 * @param extension (with .)
 */
function fromDir(fileList, directory, extension = '.scss'){

  if (!fs.existsSync(directory)){
    console.log("No such directory: ", directory);
    return;
  }

  let files = fs.readdirSync(directory);
  for(let i = 0; i < files.length; i++){
    let filename = path.join(directory,files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()){
      fromDir(fileList, filename, extension); //recurse
    }
    else if (filename.indexOf(extension)>=0) {
      fileList.push(filename);
    }
  }
}
