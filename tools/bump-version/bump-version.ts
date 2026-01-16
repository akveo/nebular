/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { readJson, writeJson, readdir } from 'fs-extra';

(async () => {
  const FRAMEWORK_ROOT = './src/framework';
  const EXCLUDE = ['icons', 'bootstrap'];

  const versionToSet = require('../../package.json').version;
  const packagesToUpdate = await getPackagesToUpdate();

  for (const pkg of packagesToUpdate) {
    bumpVersionAndNebularPeers(pkg);
  }

  async function getPackagesToUpdate() {
    const files = await readdir(FRAMEWORK_ROOT);
    return files
      .filter(keepNebularPackages)
      .map(createFullPathToPackageJson)
      .concat(['./package.json', './packages-smoke/package.json']);
  }

  async function bumpVersionAndNebularPeers(pkgPath: string) {
    const pkgJson = await readJson(pkgPath, { throws: false });

    pkgJson.version = versionToSet;
    if (pkgJson.peerDependencies) {
      Object.keys(pkgJson.peerDependencies)
        .filter((peer) => peer.includes('@nebular'))
        .forEach((peer) => (pkgJson.peerDependencies[peer] = versionToSet));
    }

    writeJson(pkgPath, pkgJson, { spaces: 2 });
  }

  function keepNebularPackages(pkgPath: string): boolean {
    return !EXCLUDE.includes(pkgPath);
  }

  function createFullPathToPackageJson(pkgName: string): string {
    return `${FRAMEWORK_ROOT}/${pkgName}/package.json`;
  }
})();
