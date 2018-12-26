import { Rule, chain, schematic } from '@angular-devkit/schematics';

export function generatePlayground(): Rule {
  return chain([
    schematic('playground-module', {}),
    schematic('playground-components', {}),
  ]);
}
