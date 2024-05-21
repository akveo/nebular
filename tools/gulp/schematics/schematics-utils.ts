/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { existsSync, readdirSync } from 'fs';
import { join, resolve as resolvePath } from 'path';
import { spawn } from 'child_process';
import * as log from 'fancy-log';
import { SCHEMATICS_SPEC_TSCONFIG, SOURCE_DIR } from '../config';

export function getPackagesWithSchematicsSpecs(): string[] {
  return readdirSync(SOURCE_DIR).filter((p) => existsSync(join(SOURCE_DIR, p, SCHEMATICS_SPEC_TSCONFIG)));
}

export function schematicFilePaths(basePath: string): string[] {
  return [`${basePath}/**/*.json`, `${basePath}/**/files/**/*`, '!./**/dist/**/*'];
}

// github.com/angular/components/blob/3a237bd254cd3c02a913e3cd2faef8546203c252/tools/package-tools/ts-compile.ts#L11
export function tsCompile(binary: 'ngc' | 'tsc', flags: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const binaryPath = resolvePath(`./node_modules/.bin/${binary}`);
    const childProcess = spawn(binaryPath, flags, { shell: true });

    childProcess.stdout.on('data', (data: string | Buffer) => log(`${data}`));
    childProcess.stderr.on('data', (data: string | Buffer) => log.error(`${data}`));
    childProcess.on('exit', (exitCode: number) => {
      exitCode === 0 ? resolve() : reject(`${binary} compilation failure`);
    });
  });
}
