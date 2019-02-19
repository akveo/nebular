import { task } from 'gulp';

import './tasks/inline-resources/inline-resources';
import './tasks/bundle/bundle';
import './tasks/bundle/es2015-bundle';
import './tasks/docs/docs';
import './tasks/copy-sources';
import './tasks/bump-versions';

task('default', ['copy-sources']);
