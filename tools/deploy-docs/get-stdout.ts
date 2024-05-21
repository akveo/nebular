import { promisify } from 'util';
import { exec } from 'child_process';

export interface GetStdoutOptions {
  cwd?: string;
  showLog?: boolean;
}

const DEFAULT_OPTIONS: GetStdoutOptions = { cwd: process.cwd(), showLog: false };

export async function getStdout(command: string, options?: GetStdoutOptions) {
  let { cwd, showLog } = Object.assign({}, DEFAULT_OPTIONS, options);

  try {
    console.log(`Reading stdout when running "${command}" in "${cwd}"`);
    const { stdout } = await promisify(exec)(command, { cwd });

    if (showLog && stdout) {
      console.log(stdout);
    }

    return stdout;
  } catch ({ message, stdout }) {
    let errorMessage = `Error running "${command}" in "${cwd}": ${message}.`;
    if (stdout) {
      errorMessage += `\nstdout: ${stdout}`;
      console.error(stdout);
    }
    throw new Error(errorMessage);
  }
}
