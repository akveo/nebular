/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { dirname, join, normalize } from '@angular-devkit/core';
import * as ts from 'typescript';

import { Schema } from '../schema';
import { getComponentTemplate, getComponentTemplateInfo, writeText } from '../../util';
import { layoutEnd, layoutStart } from './layout-content';

/**
 * Wraps `AppComponent` in `NbLayoutComponent`. It's required for correct
 * work of Nebular components.
 * */
export function wrapRootComponentInLayout(_options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    try {
      const componentPath: string = './src/app/app.component.ts';
      const tmpl = getComponentTemplateInfo(host, componentPath);
      const template = getComponentTemplate(host, componentPath, tmpl);
      const wrappedTemplate = wrapTemplateInLayout(template);

      if (tmpl.templateProp) {
        const recorder = host.beginUpdate(componentPath)
          .remove(tmpl.templateProp.initializer.pos, template.length)
          .insertLeft(tmpl.templateProp.initializer.pos, wrappedTemplate);
        host.commitUpdate(recorder);
      } else if (tmpl.templateUrlProp) {
        const templateUrl = (tmpl.templateUrlProp.initializer as ts.StringLiteral).text;
        const dir = dirname(normalize(componentPath));
        const templatePath = join(dir, templateUrl);
        writeText(host, templatePath, wrapForHtml(template));
      }

    } catch (e) {
      context.logger.error(e.stack);
    }
    return host;
  }
}

function wrapTemplateInLayout(template: string): string {
  return ` \`
    ${layoutStart}
${padd(template, 8)}
    ${layoutEnd}
`;
}

function wrapForHtml(template: string): string {
  return `${layoutStart}
${padd(template, 4)}
${layoutEnd}
`;
}

function padd(text: string, paddLen: number): string {
  return text
    .split('\n')
    .map(line => `${' '.repeat(paddLen)}${line}`)
    .join('\n');
}
