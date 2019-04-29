import { task } from 'gulp';

import './tasks/inline-resources/inline-resources';
import './tasks/bundle/bundle';
import './tasks/docs/docs';
import './tasks/copy-sources';
import './tasks/bump-versions';
import './tasks/change-prefix';

task('default', ['copy-sources']);
