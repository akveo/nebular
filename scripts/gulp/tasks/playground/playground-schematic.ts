import { exec } from 'child_process';
import { task } from 'gulp';
import { watch } from 'chokidar';
import { PLAYGROUND_ROOT } from '../config';

const PG_GLOB = PLAYGROUND_ROOT + '**/*.ts';
const DEBOUNCE_TIME = 3000;

function debounce(callback, delay: number = DEBOUNCE_TIME) {
  let timeoutId;
  return function debounced() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  }
}

function startWatch() {
  const watcher = watch(PG_GLOB, { ignoreInitial: true });
  const debouncedSchematic = debounce(() => stopWatchRunSchematic(watcher));
  watcher.on('add', debouncedSchematic);
  watcher.on('change', debouncedSchematic);
}

function stopWatchRunSchematic(watcher) {
  watcher.close();
  exec('npm run gen:playground', logAndRestart);
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

task('watch:gen:playground', startWatch);
