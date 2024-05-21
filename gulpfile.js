/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

'use strict';
/**
 * Load the TypeScript compiler and then load the tasks from 'scripts/gulp'.
 */
const { join } = require('path');
const gulpPath = join(__dirname, 'tools/gulp');
const tsconfigPath = join(gulpPath, 'tsconfig.json');

// Register TypeScript.
require('ts-node').register({ project: tsconfigPath });
require(join(gulpPath, 'gulpfile'));
