import {
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { buildClassName, buildComponent, buildSelector, capitalize } from '../utils/component';

export function playgroundExample(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {

    options.path = '/src/playground/';
    options.prefix = 'nb';
    options.name = options.component + capitalize(options.name);

    options.componentClassName = buildClassName(options.component, options.prefix);
    options.componentSelector = buildSelector(options.component, options.prefix);

    return buildComponent(options)(tree, context);
  };
}
