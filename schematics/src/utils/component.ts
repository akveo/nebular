import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { basename, dirname, normalize, Path, strings } from '@angular-devkit/core';

export function buildComponent(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    options.selector = options.selector || buildSelector(options.name, options.prefix);

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    options.className = buildClassName(options.name, options.prefix);

    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ...options,
      }),
    ]);

    return chain([
      branchAndMerge(chain([
        mergeWith(templateSource),
      ])),
    ])(tree, context);
  };
}

export function parseName(path: string, name: string): { name: string, path: Path } {
  const nameWithoutPath = basename(name as Path);
  const namePath = dirname((path + '/' + name) as Path);

  return {
    name: nameWithoutPath,
    path: normalize('/' + namePath),
  };
}

export function buildSelector(name: string, prefix = '') {
  let selector = strings.dasherize(name);
  if (prefix) {
    selector = `${prefix}-${selector}`;
  }

  return selector;
}

export function buildClassName(name: string, prefix = '') {
  return capitalize(prefix) + name;
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
