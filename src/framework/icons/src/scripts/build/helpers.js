/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const fs = require('fs');
const path = require('path');

const srcRoot = './tmp';
const cssRoot = './css';
const scssRoot = './scss';

const iconsName = 'nebular';
const license = `/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
`;

function copyFonts() {
  const srcFonts = './fonts';

  const files = fs.readdirSync(path.join(srcRoot, srcFonts));

  if (!fs.existsSync(srcFonts)) {
    fs.mkdirSync(srcFonts);
  }

  files.forEach(file => {
    const newFileName = iconsName + '.' + file.split('.')[1];
    fs.createReadStream(path.join(srcRoot, srcFonts, file))
      .pipe(fs.createWriteStream(path.join(srcFonts, newFileName)));
  })
}

function fixCss() {
  const srcCss = './style.css';
  const buildCss = './nebular-icons.css';
  const srcStylePath = path.join(srcRoot, srcCss);

  const file = fs.readFileSync(srcStylePath).toString();

  let fixed = license + file
    .replace(/icomoon/g, iconsName) // font name
    .replace(/\.(icon-)/g, '.') // prefix
    .replace(/fonts/g, '../fonts') // fonts path
    .replace(/:(before)/g, '::$1') // pseudo double semicol
    .replace(/"icon-"/g, '\'nb-\'') // class selector quotes
    .replace(/" icon-"/g, '\' nb-\'')
    .replace(/(content: )"(.*)"/g, '$1\'$2\''); // content quotes

  const iconRegex = /\.nb-.+(?=::before)/g;
  const allIcons = fixed.match(iconRegex).join(',\n');
  fixed = fixed.replace(/\[class\^='nb-'\], \[class\*=' nb-'\]/, allIcons);

  if (!fs.existsSync(cssRoot)) {
    fs.mkdirSync(cssRoot);
  }
  fs.writeFileSync(path.join(cssRoot, buildCss), fixed);
}

function genScss() {
  if (!fs.existsSync(scssRoot)) {
    fs.mkdirSync(scssRoot);
  }

  genScssRoot();
  genScssVariables();
  genScssFont();
}

function genScssRoot() {
  const buildScss = './nebular-icons.scss';
  const rootFileContent = `${license}
@import 'nebular-icons-variables';
@import 'nebular-icons-font';
`;

  fs.writeFileSync(path.join(scssRoot, buildScss), rootFileContent);
}

function genScssVariables() {
  const buildScss = './_nebular-icons-variables.scss';
  const variablesContent = `${license}
$nebular-icons-font-path: '../fonts' !default;
$nebular-icons-font-family: 'nebular' !default;
`;

  fs.writeFileSync(path.join(scssRoot, buildScss), variablesContent);
}

function genScssFont() {
  const buildScss = './_nebular-icons-font.scss';
  const buildCss = path.join(cssRoot, 'nebular-icons.css');

  const file = fs.readFileSync(buildCss).toString();
  const content = file
    .replace(/\.\.\/fonts/g, '#{$nebular-icons-font-path}')
    .replace(/(font-family: )(.*)(;)/g, '$1#{$nebular-icons-font-family}$3');

  fs.writeFileSync(path.join(scssRoot, buildScss), content);
}

module.exports.fixFont = function () {
  copyFonts();
  fixCss();
  genScss();
};
