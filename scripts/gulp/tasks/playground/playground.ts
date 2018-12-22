import { exec } from 'child_process';
import { task } from 'gulp';
import { watch } from 'chokidar';
import { PLAYGROUND_ROOT } from '../config';

const PG_GLOB = PLAYGROUND_ROOT + '**/*.ts';

function startWatch() {
  const watcher = watch(PG_GLOB, { awaitWriteFinish: true, ignoreInitial: true });
  const cb = stopWatchRunSchematic.bind(null, watcher);
  watcher.on('add', cb);
  watcher.on('change', cb);
}

function stopWatchRunSchematic(watcher) {
  watcher.close();
  exec('npm run gen:playground-module', logAndRestart);
}

function logAndRestart(error: Error, stdout: string, stderr: string): void {
  if (error) {
    console.error(error);
  }
  if (stdout) {
    // tslint:disable-next-line:no-console
    console.log(stdout);
  }
  if (stderr) {
    console.error(stderr);
  }
  startWatch();
}

task('watch:gen:playground-modules', startWatch);
