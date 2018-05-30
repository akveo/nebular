import {
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { buildComponent } from '../utils/component';

export function component(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {

    options.path = '/src/framework/theme/components/';
    options.prefix = 'nb';

    return buildComponent(options)(tree, context);
  };
}
