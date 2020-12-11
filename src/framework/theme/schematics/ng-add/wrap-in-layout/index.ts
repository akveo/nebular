/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Rule, Tree } from '@angular-devkit/schematics';
import { dirname, join, normalize } from '@angular-devkit/core';
import * as ts from 'typescript';

import { getAppComponentPath, getComponentTemplateDescriptor, TemplateDescriptor, writeText } from '../../util';
import { wrapHtmlFileTemplateInLayout, wrapInlineTemplateInLayout } from './layout-content';
import { Schema } from '../schema';

/**
 * Wraps `AppComponent` in `NbLayoutComponent`. It's required for correct
 * work of Nebular components.
 * */
export function wrapRootComponentInLayout(options: Schema): Rule {
  return async (tree: Tree) => {
    const componentPath: string = await getAppComponentPath(tree, options.project);
    const templateDescriptor: TemplateDescriptor = getComponentTemplateDescriptor(tree, componentPath);

    if (templateDescriptor.isInline()) {
      wrapInlineTemplate(tree, templateDescriptor);
    } else {
      wrapHtmlFileTemplate(tree, templateDescriptor);
    }
  }
}

function wrapInlineTemplate(tree: Tree, templateDescriptor: TemplateDescriptor) {
  const { templateProp, componentPath, template } = templateDescriptor;

  const wrappedTemplate = wrapInlineTemplateInLayout(template);
  const recorder = tree.beginUpdate(componentPath)
    .remove(templateProp.initializer.pos, templateProp.initializer.getFullText().length)
    .insertLeft(templateProp.initializer.pos, wrappedTemplate);

  tree.commitUpdate(recorder);
}

function wrapHtmlFileTemplate(tree: Tree, templateDescriptor: TemplateDescriptor) {
  const { templateUrlProp, componentPath, template } = templateDescriptor;

  const templateUrl = (templateUrlProp.initializer as ts.StringLiteral).text;
  const dir = dirname(normalize(componentPath));
  const templatePath = join(dir, templateUrl);

  writeText(tree, templatePath, wrapHtmlFileTemplateInLayout(template));
}
