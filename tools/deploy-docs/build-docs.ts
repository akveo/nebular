import { join } from 'path';
import { writeFile } from 'fs/promises';
import { copy, mkdirp, remove, writeJson, readJson, readFile, stat, readdir, pathExists, outputFile } from 'fs-extra';

import { generateGithubSpaScript } from './ghspa-template';
import { runCommand } from './run-command';
import { log } from './log';

import { REPO_URL, OUT_DIR, REPO_OWNER, REPO_NAME } from './config';
import { getStdout } from './get-stdout';

const WORK_DIR = join(process.cwd(), '../_DOCS_BUILD_WORK_DIR_');
const MASTER_BRANCH_DIR = join(WORK_DIR, 'MASTER');
const DOCS_VERSIONS_PATH = join(MASTER_BRANCH_DIR, 'docs/versions.json');
const GH_PAGES_DIR = join(WORK_DIR, 'gh-pages');
const FILE_WITH_HASH = 'last-commit-hash.txt';

export interface Version {
  checkoutTarget: string;
  name: string;
  path: string;
  isCurrent?: boolean;
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

  log('Get build versions from gh-pages branch');
  await copyToBuildDir(MASTER_BRANCH_DIR, GH_PAGES_DIR);
  await checkoutVersion('gh-pages', GH_PAGES_DIR);
  const builtVersions: { hash; path }[] = await checkBuiltVersions();
  log(`Built versions in gh-pages: ${JSON.stringify(builtVersions)}`);

  log('Reading versions configuration');
  const config: Version[] = await import(DOCS_VERSIONS_PATH);
  ensureSingleCurrentVersion(config);

  log(`Versions configuration:`);
  const jsonConfig = JSON.stringify(config, null, '  ');
  log(jsonConfig);

  log(`Building docs`);
  await buildDocs(config, builtVersions);

  log(`Adding versions.json to ${OUT_DIR}`);
  await outputFile(join(OUT_DIR, 'versions.json'), jsonConfig);

  log(`Deploying to ghpages`);
  await deploy(OUT_DIR);

  log(`Cleaning up working directory (${WORK_DIR})`);
  await remove(WORK_DIR);
})();

function ensureSingleCurrentVersion(versions: Version[]) {
  const currentVersion = versions.filter((v) => v.isCurrent);
  if (currentVersion.length !== 1) {
    throw new Error(`Versions config error: Only one current version allowed.`);
  }
}

async function checkBuiltVersions() {
  let builtVersions: { hash; path }[] = [];

  //take hash from the GH_PAGES_DIR directory
  const hashFilePath = join(GH_PAGES_DIR, FILE_WITH_HASH);
  const exists = await pathExists(hashFilePath);

  if (exists) {
    builtVersions.push({ hash: await readFile(hashFilePath, 'utf8'), path: GH_PAGES_DIR });
  }

  //take hash from the first-level directories of GH_PAGES_DIR
  const files = await readdir(GH_PAGES_DIR);
  for await (let file of files) {
    const stats = await stat(join(GH_PAGES_DIR, file));
    if (stats.isDirectory()) {
      const hashFilePathInDirectory = join(GH_PAGES_DIR, file, FILE_WITH_HASH);
      const existsInDirectory = await pathExists(hashFilePathInDirectory);
      if (existsInDirectory) {
        builtVersions.push({
          hash: await readFile(hashFilePathInDirectory, 'utf8'),
          path: join(GH_PAGES_DIR, file),
        });
      }
    }
  }

  return builtVersions;
}

async function buildDocs(versions: Version[], builtVersions: { hash; path }[]) {
  const ghspaScript = generateGithubSpaScript(versions);

  return Promise.all(
    versions.map((version: Version) => {
      const versionDistDir = version.isCurrent ? OUT_DIR : join(OUT_DIR, version.name);

      return prepareVersion(version, versionDistDir, ghspaScript, builtVersions);
    }),
  );
}

async function prepareVersion(version: Version, distDir: string, ghspaScript: string, builtVersions: { hash; path }[]) {
  const projectDir = join(WORK_DIR, `${version.name}`);

  await copyToBuildDir(MASTER_BRANCH_DIR, projectDir);
  await checkoutVersion(version.checkoutTarget, projectDir);

  const currentHash = getStdout('git rev-parse HEAD', { cwd: projectDir, showLog: true });

  const existInGhPages = builtVersions.find((item) => currentHash === item.hash);

  if (existInGhPages) {
    await copyFromGhPages(version, existInGhPages.path, distDir);
  } else {
    await runCommand('npm ci --legacy-peer-deps', { cwd: projectDir });
    await addVersionNameToPackageJson(version.name, join(projectDir, 'package.json'));
    await addVersionTs(version, join(projectDir, 'docs', 'version.ts'));
    await buildDocsApp(projectDir, version.path);
    await addCommitHash(join(OUT_DIR, FILE_WITH_HASH), projectDir);
    await copy(join(projectDir, OUT_DIR), distDir);
    await outputFile(join(distDir, 'assets/ghspa.js'), ghspaScript);

    await remove(projectDir);
  }
}

async function copyFromGhPages(version, correspondingVersionPath, distDir) {
  log(`Copying existing docs ${version.name} from ${correspondingVersionPath}`);

  const files = await readdir(correspondingVersionPath);
  for await (let file of files) {
    const stats = await stat(join(correspondingVersionPath, file));
    if (!stats.isDirectory() || file === 'docs' || file === 'assets') {
      await copy(join(correspondingVersionPath, file), join(distDir, file));
    }
  }
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

async function addVersionNameToPackageJson(versionName: string, packageJsonPath: string) {
  const packageJsonObject = await readJson(packageJsonPath);
  packageJsonObject.versionName = versionName;
  await writeJson(packageJsonPath, packageJsonObject, { EOL: '\n' });
}

async function addVersionTs(version: Version, versionTsPath: string) {
  const source = `export const VERSION_NAME = '${version.name}';`;
  await writeFile(versionTsPath, source, 'utf8');
}

async function addCommitHash(path: string, projectDir: string) {
  await runCommand(`git rev-parse HEAD > ${path}`, { cwd: projectDir });
}

async function buildDocsApp(projectDir: string, baseHref: string) {
  if (!baseHref.endsWith('/')) {
    baseHref = baseHref + '/';
  }
  await runCommand('npm run docs:prepare', { cwd: projectDir });
  await runCommand(`npm run build -- docs --configuration production --base-href '${baseHref}'`, { cwd: projectDir });
  await runCommand('npm run docs:dirs', { cwd: projectDir });
}

async function deploy(distDir: string) {
  await runCommand(`npx angular-cli-ghpages -S --dir . --repo=https://github.com/${REPO_OWNER}/${REPO_NAME}.git`, {
    cwd: distDir,
    showLog: true,
  });
}
