import { dest, src, task } from 'gulp';

task('copy-schematics', () => {
  src([
    './schematics/**/*.json',
    './schematics/**/files/**/*',
    '!./schematics/dist/**/*',
  ])
    .pipe(dest('./schematics/dist/'));
});
