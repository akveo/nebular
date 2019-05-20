import { task } from 'gulp';

import './tasks/inline-resources/inline-resources';
import './tasks/docs/docs';
import './tasks/copy-sources';
import './tasks/bump-versions';
import './tasks/build';
import './tasks/resources';
import './tasks/compile/typescript';
import './tasks/compile/scss';
import './tasks/bundle/bundle';
import './tasks/packages-path';

import './tasks/change-prefix';

task('default', ['copy-sources']);
