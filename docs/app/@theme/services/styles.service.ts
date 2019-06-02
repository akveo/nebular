/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable } from '@angular/core';
import { DOCS } from '../../app.options';

const DEFAULT_THEME_NAME = 'default';

@Injectable()
export class NgdStylesService {

  constructor(@Inject(DOCS) private docs) {
  }

  mapThemedValues(classStyles: any): any {
    const defaultTheme = this.docs.completeThemes[DEFAULT_THEME_NAME].data;

    return classStyles.map(item => {
      return item.styles.map(prop => {
        return {
          ...prop,
          parent: this.getPropParent(defaultTheme, prop),
          value: this.getPropValue(defaultTheme, prop),
        };
      });
    })
  }

  protected getPropValue(theme, prop) {
    const resolved = theme[prop.name];

    if (resolved && resolved.value) {
      return resolved.value;
    }
    return null;
  }

  protected getPropParent(theme, prop) {
    const resolved = theme[prop.name];

    if (resolved && resolved.parents && resolved.parents[0]) {
      return resolved.parents[0].prop
    }
    return null;
  }
}
