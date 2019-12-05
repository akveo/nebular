import { renameSync as fsRenameSync } from 'fs';
import { join } from 'path';
import { dest, src, task, series, parallel } from 'gulp';
import * as rename from 'gulp-rename';
import * as replace from 'gulp-replace';
import * as minimist from 'minimist';
import { capitalize, dasherize } from '@angular-devkit/core/src/utils/strings';

import { BUILD_DIR } from './config';

type NebularPackage = 'auth' | 'bootstrap' | 'dateFns' | 'evaIcons' | 'moment' | 'theme' | 'security';

interface PackagePrefix {
  prefix: string;
}
type ParsedArguments = PackagePrefix & { [P in NebularPackage]?: string };
type PackageNamesConfig = PackagePrefix &
  { unscopedPrefix: string } &
  { [P in NebularPackage]: string } &
  { unprefixed: { [P in NebularPackage]: string } };

interface StringReplacement {
  from: string | RegExp;
  to: string;
}

const ROLLUP_CONFIG_DIR = './scripts/gulp/tasks/bundle';
const ROLLUP_CONFIG_PATH = `${ROLLUP_CONFIG_DIR}/rollup-config.ts`;
const NEBULAR_PACKAGES: NebularPackage[] = ['auth', 'bootstrap', 'dateFns', 'evaIcons', 'moment', 'theme', 'security'];

/**
 * Reads package prefix and all package names passed as command line arguments.
 * List of supported arguments:
 * --prefix    - prefix of the package. Also used as prefix in class names, selector prefixes etc.
 * --auth      - replacement for @nebular/auth
 * --bootstrap - replacement for @nebular/bootstrap
 * --date-fns  - replacement for @nebular/date-fns
 * --eva-icons - replacement for @nebular/eva-icons
 * --moment    - replacement for @nebular/moment
 * --theme     - replacement for @nebular/theme
 * --security  - replacement for @nebular/security
 * @param argv command line arguments
 * @returns ParsedArguments
 */
function parseArguments(argv: string[]): ParsedArguments {
  const args = minimist(argv.slice(2));
  const prefix = args.prefix;

  if (!prefix) {
    throwNoPrefixSpecified();
  }

  const parsedArguments = { prefix };
  for (const packageName of NEBULAR_PACKAGES) {
    parsedArguments[packageName] = args[dasherize(packageName)];
  }

  return parsedArguments;
}

/**
 * Prefixes packages and fills config with default package names for packages
 * not passed as `--[package-name]` argument.
 * Default package name is `${prefix}/${dasherize(packageName)}`.
 * For example, with prefix set `@custom`, `@nebular/auth` would ne `@custom/auth`.
 * @param parsedArguments parsed command line arguments
 * @returns PackageNamesConfig
 */
function applyDefaults(parsedArguments: ParsedArguments): PackageNamesConfig {
  const { prefix } = parsedArguments;
  const config = {
    prefix,
    unscopedPrefix: prefix.replace(/^@/, ''),
    unprefixed: {},
  };

  for (const nbPackageName of NEBULAR_PACKAGES) {
    const packageName = parsedArguments[nbPackageName] || dasherize(nbPackageName);
    config.unprefixed[nbPackageName] = packageName;
    config[nbPackageName] = `${prefix}/${packageName}`;
  }

  return config as PackageNamesConfig;
}

/**
 * Parses command line arguments and fills packageNames not set in it.
 * @param argv
 */
function getPackageNamesConfig(argv: string[]): PackageNamesConfig {
  return applyDefaults(parseArguments(argv));
}

/**
 * Generates replacements for classes, component, css selectors etc.
 * @param prefix unscoped package prefix
 * @returns StringReplacement[]
 */
function generatePrefixReplacements(prefix: string): StringReplacement[] {
  return [
    { from: /^nb/g, to: prefix.toLowerCase() },
    { from: /^NB/g, to: prefix.toUpperCase() },
    { from: /^Nb/g, to: capitalize(prefix) },
  ];
}

/**
 * Returns all strings to replace with appropriate new value.
 * This includes package names and all class, selector, etc. combinations.
 * @param packageNamesConfig
 * @returns StringReplacement[]
 */
function getReplacements(packageNamesConfig: PackageNamesConfig): StringReplacement[] {
  const { unscopedPrefix } = packageNamesConfig;

  const prefixReplacements: StringReplacement[] = generatePrefixReplacements(unscopedPrefix);
  const projectReplacements: StringReplacement[] = NEBULAR_PACKAGES.map((packageName) => {
    return { from: `@nebular/${packageName}`, to: packageNamesConfig[packageName] };
  });

  return prefixReplacements.concat(projectReplacements);
}

/**
 * Copies nebular publish ts config and replaces nebular packages names with custom ones.
 */
task('generate-ts-config', () => {
  const { theme }: PackageNamesConfig = getPackageNamesConfig(process.argv);
  let stream = src('tsconfig.publish.json');

  for (const packageName of NEBULAR_PACKAGES) {
    stream = stream.pipe(replace(`@nebular/${dasherize(packageName)}`, theme))
  }

  return stream
    .pipe(rename('tsconfig-custom.publish.json'))
    .pipe(dest('.'));
});

/**
 * Copies sources to build dir and renames package dirs to custom ones.
 */
task('copy-build-dir-and-rename', () => {
  return src('./src/framework/**/*')
    .pipe(dest(BUILD_DIR))
    .on('end', renameDirs);
});

/**
 * Renames package directories if custom names for packages were specified.
 */
function renameDirs () {
  const config: PackageNamesConfig = getPackageNamesConfig(process.argv);

  for (const packageName of NEBULAR_PACKAGES) {
    const nbPackageDirName = dasherize(packageName);
    const fromDir = join(BUILD_DIR, nbPackageDirName);
    const toDir = join(BUILD_DIR, config.unprefixed[packageName]);
    fsRenameSync(fromDir, toDir);
  }
}

/**
 * Patches rollup config in place. Replaces all nebular tokens with custom ones.
 */
task('patch-rollup-config', () => {
  let stream = src(ROLLUP_CONFIG_PATH);
  const config: PackageNamesConfig = getPackageNamesConfig(process.argv);
  const { unscopedPrefix, unprefixed: unprefixedPackageNames } = config;
  const replacements: StringReplacement[] = getReplacements(config);

  // Add replacers for `nb.[package-name]`
  for (const [ nbPackageName, customPackageName ] of Object.entries(unprefixedPackageNames)) {
    replacements.push({
      from: `nb.${dasherize(nbPackageName)}`,
      to: `${unscopedPrefix}.${customPackageName}`,
    });
  }


  for (const { from, to } of replacements) {
    stream = stream.pipe(replace(from, to));
  }

  return stream.pipe(dest(ROLLUP_CONFIG_DIR));
});

/**
 * Copies sources to build dir, generates ts config and replaces Nebular prefixes and package names with
 * custom passed as command line arguments. See full list of arguments in `parseArguments` doc comment.
 *
 * Usage:
 * `$gulp change-prefix -- --prefix @custom-prefix`
 * Results in `@custom-prefix/theme`, `@custom-prefix/auth`, etc.
 *
 * Each package name could be configured individually. For example:
 * `$gulp change-prefix -- --prefix @custom-prefix --theme ui-kit --eva-icons icons`
 * Result:
 * `@nebular/theme`     -> `@custom-prefix/ui-kit`
 * `@nebular/eva-icons` -> `@custom-prefix/icons`
 * `@nebular/auth`      -> `@custom-prefix/auth`,
 * `@nebular/date-fns`  -> `@custom-prefix/date-fns`, etc.
 *
 * This task not mean to be used directly. Rather you should use following command:
 * `$npm run build:custom-prefix -- --prefix @custom-prefix --theme @custom-prefix/ui-kit`.
 * It will create ready to publish bundles for each package in `src/.lib/[package-name]` directory.
 */
task(
  'change-prefix',
  series(
    parallel(
      'copy-build-dir-and-rename',
      'generate-ts-config',
      'patch-rollup-config',
    ),
    () => {
      const replacements: StringReplacement[] = getReplacements(getPackageNamesConfig(process.argv));

      let stream = src(`${BUILD_DIR}/**/*`);

      for (const { from, to } of replacements) {
        stream = stream.pipe(replace(from, to));
      }

      return stream.pipe(dest(BUILD_DIR));
    },
  ),
);

function throwNoPrefixSpecified() {
  throw new Error(`'--prefix' parameter must be specified`);
}
