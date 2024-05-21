import { task, series } from 'gulp';

import { generateOuputJson } from './output-json';
import { prepareExamples } from './example';

task('docs', series(generateOuputJson, prepareExamples));
