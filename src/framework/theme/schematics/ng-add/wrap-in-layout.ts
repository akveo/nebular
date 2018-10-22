/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Component } from '@angular/core';
import { Schema } from './schema';
import { readText } from '../util';

export function wrapRootComponentInLayout(_options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    try {
      // const project: WorkspaceProject = getProject(host, options.project);
      const appComponentPath: string = './src/app/app.component.ts';
      const appComponent: string = readText(host, appComponentPath).replace(/(?:\r\n|\r|\n)/g, ' ');
      // const mainPath: string = getProjectMainFilePath(project);
      // const mainFile: string = read(host, mainPath);
      // const rootModule: string = mainFile.match(/bootstrapModule\((.*)\)/)[1];
      // const rootModulePath: string = mainFile.match(/import.*AppModule.*from.*'(.*)'/)[1];
      const match = appComponent.match(/@Component\((.*)\)/);
      const componentDescriptorStr = match && match[1];
      if (componentDescriptorStr) {
        context.logger.info(componentDescriptorStr);
        const componentDescriptor: Component = JSON.parse(componentDescriptorStr);
        let startOffset: number;
        let endOffset: number;
        let path: string;

        if (componentDescriptor.template) {
          path = appComponentPath;
          startOffset = appComponent.indexOf('template') + 11;
          endOffset = startOffset + componentDescriptor.template.length;
        } else {
          path = componentDescriptor.templateUrl as string;
          startOffset = 0;
          endOffset = readText(host, path).length;
        }

        const recordedChange = host
          .beginUpdate(path)
          .insertLeft(startOffset, `
<nb-layout>
  <nb-layout-header fixed>
  <!-- insert your header here -->
  </nb-layout-header>

  <nb-layout-column>

      `)
          .insertRight(endOffset, `

  </nb-layout-column>
  <nb-layout-footer fixed>
  <!-- insert your footer here -->
  </nb-layout-footer>
</nb-layout>
      `);

        host.commitUpdate(recordedChange);

      }
    } catch (e) {
      context.logger.error(e.stack);
    }
    return host;
  }
}
