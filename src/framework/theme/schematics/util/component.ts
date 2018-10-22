/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import { getSourceFile } from '@angular/cdk/schematics';
import { Tree } from '@angular-devkit/schematics';
import { dirname, join, normalize } from '@angular-devkit/core';
import * as ts from 'typescript';


interface TemplateInfo {
  templateProp?: ts.PropertyAssignment;
  templateUrlProp?: ts.PropertyAssignment;
}

export function getComponentTemplateInfo(host: Tree, componentPath: string): TemplateInfo {
  const compSource: ts.SourceFile = getSourceFile(host, componentPath);
  const compMetadata: ts.Node = getDecoratorMetadata(compSource, 'Component', '@angular/core')[0];

  return {
    templateProp: getMetadataProperty(compMetadata, 'template'),
    templateUrlProp: getMetadataProperty(compMetadata, 'templateUrl'),
  };
}

export function getComponentTemplate(host: Tree, compPath: string, tmplInfo: TemplateInfo): string {
  let template = '';

  if (tmplInfo.templateProp) {
    template = (tmplInfo.templateProp.initializer as ts.StringLiteral).text;
  } else if (tmplInfo.templateUrlProp) {
    const templateUrl = (tmplInfo.templateUrlProp.initializer as ts.StringLiteral).text;
    const dir = dirname(normalize(compPath));
    const templatePath = join(dir, templateUrl);
    const buffer = host.read(templatePath);
    if (buffer) {
      template = buffer.toString();
    }
  }

  return template;
}

function getMetadataProperty(metadata: ts.Node, propertyName: string): ts.PropertyAssignment {
  const properties = (metadata as ts.ObjectLiteralExpression).properties;
  const property = properties
    .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
    .filter((prop: ts.PropertyAssignment) => {
      const name = prop.name;
      switch (name.kind) {
        case ts.SyntaxKind.Identifier:
          return (name as ts.Identifier).getText() === propertyName;
        case ts.SyntaxKind.StringLiteral:
          return (name as ts.StringLiteral).text === propertyName;
      }

      return false;
    })[0];

  return property as ts.PropertyAssignment;
}
