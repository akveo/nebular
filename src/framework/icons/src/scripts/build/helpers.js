/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const fs = require('fs');
const path = require('path');

const iconsName = 'nebular';

function renameFonts() {
  const fontsPath = './fonts';

  fs.readdir(fontsPath, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      const newFileName = iconsName + '.' +file.split('.')[1];
      fs.rename(path.join(fontsPath, file), path.join(fontsPath, newFileName), err => {
        if (err) throw err;
      });
    })
  })
}

function fixCss() {
  const styleFile = './style.css';

  fs.readFile(styleFile, (err, data) => {
    if (err) throw err;

    const file = data.toString();
    const fixed = file.replace(/icomoon/g, iconsName).replace(/icon/g, 'nb');

    fs.writeFile(styleFile, fixed, err => {
      if (err) throw err;
    })
  })
}

module.exports.fixFont = function () {
  renameFonts();
  fixCss();
};
