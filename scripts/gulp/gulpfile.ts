import { task } from 'gulp';

import './tasks/inline-resources/inline-resources';
import './tasks/bundle/bundle';
import './tasks/docs/docs';
import './tasks/copy-sources';
import './tasks/bump-versions';
import './tasks/playground/playground';

task('default', ['copy-sources']);
