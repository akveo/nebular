import { join } from 'path';
import { copy, mkdirp, remove, outputFile, move } from 'fs-extra';
import { Clone, Checkout, Repository } from 'nodegit';

import { generateGithubSpaScript } from './ghspa-template';
import { runCommand } from './run-command';

import { repository as REPO_URL, outDir as OUT_DIR } from './config.json';
const WORK_DIR = join(process.cwd(), '../_DOCS_BUILD_WORK_DIR_');
const DIST_DIR = join(WORK_DIR, 'dist');
const MASTER_BRANCH_DIR = join(WORK_DIR, 'MASTER');
const DOCS_VERSIONS_PATH = join(MASTER_BRANCH_DIR, 'docs/versions.json');

interface VersionsConfig {
  currentVersionName: string;
  versions: Version[];
}

interface Version {
  checkoutTarget: string;
  name: string;
  path: string;
}

(async function () {
  console.log(`Cleaning work dir "${WORK_DIR}"`);
  await remove(WORK_DIR);
  console.log(`Cleaning output dir "${OUT_DIR}"`);
  await remove(OUT_DIR);

  console.log(`Creating work dir "${WORK_DIR}"`);
  await mkdirp(WORK_DIR);

  console.log(`Cloning ${REPO_URL} into ${MASTER_BRANCH_DIR}`);
  await Clone.clone(REPO_URL, MASTER_BRANCH_DIR);

  console.log('Reading versions configuration');
  const config: VersionsConfig = await import(DOCS_VERSIONS_PATH);
  console.log(`Versions configuration:`);
  const jsonConfig = JSON.stringify(config, null, '  ');
  console.log(jsonConfig);

  console.log(`Building docs`);
  await buildDocs(config);

  console.log(`Adding versions.json to ${DIST_DIR}`);
  await outputFile(join(DIST_DIR, 'versions.json'), jsonConfig);

  const ghspaPath = join(DIST_DIR, 'ghspa.js');
  const specialRedirectVersions = config.versions
    .filter((v: Version) => v.name !== config.currentVersionName)
    .map((v: Version) => v.name);
  console.log(`Generating ghspa.js script. Versions to redirect: ${specialRedirectVersions}`);
  await addGithubSpaScript(specialRedirectVersions, ghspaPath);

  console.log(`Moving into output dir: ${OUT_DIR}`);
  await move(DIST_DIR, OUT_DIR);

  console.log(`Cleaning up working directory (${WORK_DIR})`);
  await remove(WORK_DIR);
}());

async function buildDocs(config: VersionsConfig) {
  return Promise.all(config.versions.map((version: Version) => {
    const versionDist = config.currentVersionName === version.name
      ? DIST_DIR
      : join(DIST_DIR, version.name);

    return prepareVersion(version, versionDist);
  }))
}

async function prepareVersion(version: Version, distDir: string) {
  const projectDir = join(WORK_DIR, `${version.name}`);

  await copyToBuildDir(MASTER_BRANCH_DIR, projectDir);
  await checkoutVersion(version.checkoutTarget, projectDir);
  await runCommand('npm install', { cwd: projectDir });
  await buildDocsApp(projectDir, version.path);
  await copy(join(projectDir, 'docs/dist'), distDir);

  await remove(projectDir);
}

async function copyToBuildDir(from: string, to: string) {
  try {
    await mkdirp(to);
    await copy(from, to);
  } catch (e) {
    throw new Error(`Error copying from ${from} to ${to}: ${e.message}`);
  }
}

async function checkoutVersion(checkoutTarget: string, repoDirectory: string) {
  try {
    const repo = await Repository.open(repoDirectory);
    await Checkout.tree(repo, checkoutTarget);
  } catch (e) {
    throw new Error(`Error checking out ${checkoutTarget}: ${e.message}`);
  }
}

async function buildDocsApp(projectDir: string, baseHref: string) {
  await runCommand('npm run docs:prepare', { cwd: projectDir });
  await runCommand(`npm run build -- docs --prod --base-href '${baseHref}'`, { cwd: projectDir });
  await runCommand('npm run docs:dirs', { cwd: projectDir });
}

async function addGithubSpaScript(specialRedirectVersions: string[], filePath: string) {
  const script = generateGithubSpaScript(specialRedirectVersions);

  try {
    await outputFile(filePath, script);
  } catch (e) {
    throw new Error(`Error creating ghspa.js file in ${filePath}: ${e.message}`);
  }
}
