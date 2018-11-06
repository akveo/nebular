import { chain, Rule } from '@angular-devkit/schematics';
import { generateMissingModules } from './generate-missing-modules';
import { addRoutingModuleImport } from './add-routing-module';
import { addComponentsToModules } from './import-components';


export function playgroundModule(): Rule {
  return () => {
    return chain([
      generateMissingModules,
      addRoutingModuleImport,
      addComponentsToModules,
    ]);
  };
}
