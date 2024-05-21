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

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function newComponent(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    options.path = '/src/framework/theme/components/';
    options.prefix = 'nb';
    options.selector = options.selector || buildSelector(options);

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    options.className = buildClassName(options);

    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ...options,
      }),
    ]);

    return chain([branchAndMerge(chain([mergeWith(templateSource)]))])(tree, context);
  };
}

export function parseName(path: string, name: string): { name: string; path: Path } {
  const nameWithoutPath = basename(name as Path);
  const namePath = dirname((path + '/' + name) as Path);

  return {
    name: nameWithoutPath,
    path: normalize('/' + namePath),
  };
}

function buildSelector(options: any) {
  let selector = strings.dasherize(options.name);
  if (options.prefix) {
    selector = `${options.prefix}-${selector}`;
  }

  return selector;
}

function buildClassName(options: any) {
  return capitalize(options.prefix) + options.name;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
