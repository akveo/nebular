import { task } from 'gulp';

import './tasks/inline-resources/inline-resources';
import './tasks/bundle/bundle';
import './tasks/docs/docs';
import './tasks/copy-sources';
import './tasks/bump-versions';
import './tasks/playground/playground-schematic';
import './tasks/build/build';

task('default', ['copy-sources']);
