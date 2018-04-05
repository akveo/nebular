import { accessSync } from 'fs';
import { PLAYGROUND_ROOT } from '../config';

export function isFileExists(file): boolean {
  try {
    accessSync(PLAYGROUND_ROOT + file);
    return true;
  } catch (e) {
    return false;
  }
}
