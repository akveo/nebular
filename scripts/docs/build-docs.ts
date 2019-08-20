import { join } from 'path';
import { copy, mkdirp, remove, outputFile } from 'fs-extra';

import { generateGithubSpaScript } from './ghspa-template';
import { runCommand } from './run-command';
import { log } from './log';

import { REPO_URL, OUT_DIR, REPO_OWNER, REPO_NAME } from './config';
const WORK_DIR = join(process.cwd(), '../_DOCS_BUILD_WORK_DIR_');
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
  log(`Cleaning work dir "${WORK_DIR}"`);
  await remove(WORK_DIR);
  log(`Cleaning output dir "${OUT_DIR}"`);
  await remove(OUT_DIR);

  log(`Creating work dir "${WORK_DIR}"`);
  await mkdirp(WORK_DIR);

  log(`Cloning ${REPO_URL} into ${MASTER_BRANCH_DIR}`);
  await runCommand(`git clone ${REPO_URL} ${MASTER_BRANCH_DIR}`, { cwd: WORK_DIR });

  log('Reading versions configuration');
  const config: VersionsConfig = await import(DOCS_VERSIONS_PATH);
  log(`Versions configuration:`);
  const jsonConfig = JSON.stringify(config, null, '  ');
  log(jsonConfig);

  log(`Building docs`);
  await buildDocs(config);

  log(`Adding versions.json to ${OUT_DIR}`);
  await outputFile(join(OUT_DIR, 'versions.json'), jsonConfig);

  log(`Deploying to ghpages`);
  await deploy(OUT_DIR);

  log(`Cleaning up working directory (${WORK_DIR})`);
  await remove(WORK_DIR);
}());

async function buildDocs(config: VersionsConfig) {
  const currentVersion = config.versions.find((v: Version) => v.name === config.currentVersionName);
  const redirectVersions = config.versions
    .filter((v: Version) => v !== currentVersion)
    .map((v: Version) => v.name);
  const ghspaScript = generateGithubSpaScript(redirectVersions);

  return Promise.all(config.versions.map((version: Version) => {
    const versionDistDir = version === currentVersion
      ? OUT_DIR
      : join(OUT_DIR, version.name);

    return prepareVersion(version, versionDistDir, ghspaScript);
  }))
    // rethrow error so it becomes the last log entry
    .catch(e => { throw e; });
}

async function prepareVersion(version: Version, distDir: string, ghspaScript: string) {
  const projectDir = join(WORK_DIR, `${version.name}`);

  await copyToBuildDir(MASTER_BRANCH_DIR, projectDir);
  await checkoutVersion(version.checkoutTarget, projectDir);
  await runCommand('npm install', { cwd: projectDir });
  await buildDocsApp(projectDir, version.path);
  await copy(join(projectDir, 'docs/dist'), distDir);
  await outputFile(join(distDir, 'assets/ghspa.js'), ghspaScript);

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
    await runCommand(`git checkout ${checkoutTarget}`, { cwd: repoDirectory, showLog: false });
  } catch (e) {
    throw new Error(`Error checking out ${checkoutTarget}: ${e.message}`);
  }
}

async function buildDocsApp(projectDir: string, baseHref: string) {
  await runCommand('npm run docs:prepare', { cwd: projectDir });
  await runCommand(`npm run build -- docs --prod --base-href '${baseHref}'`, { cwd: projectDir });
  await runCommand('npm run docs:dirs', { cwd: projectDir });
}

async function deploy(distDir: string) {
  await runCommand(
    `npx angular-cli-ghpages --dir . --repo=https://GH_TOKEN@github.com/${REPO_OWNER}/${REPO_NAME}.git`,
    { cwd: distDir, showLog: true },
  );
}
