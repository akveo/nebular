import { dest, src, task } from 'gulp';

const EXAMPLES_SRC = './src/playground/**/*.*';
const EXAMPLES_DEST = './docs/assets/examples';

task('copy-examples', () => {
  src(EXAMPLES_SRC).pipe(dest(EXAMPLES_DEST))
});
