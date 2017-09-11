/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable } from '@angular/core';
import { nbMediaBreakpointsToken } from '../theme.options';

/**
 * Media breakpoint type
 *
 * Where `name` - breakpoint name alias (e.g. xs, sm, md, etc), and width - min breakpoint width
 */
export interface NbMediaBreakpoint {
  name: string;
  width: number;
}

export const DEFAULT_MEDIA_BREAKPOINTS = [
  {
    name: 'xs',
    width: 0,
  },
  {
    name: 'is',
    width: 400,
  },
  {
    name: 'sm',
    width: 576,
  },
  {
    name: 'md',
    width: 768,
  },
  {
    name: 'lg',
    width: 992,
  },
  {
    name: 'xl',
    width: 1200,
  },
  {
    name: 'xxl',
    width: 1400,
  },
  {
    name: 'xxxl',
    width: 1600,
  },
];

/**
 * Manages media breakpoints
 *
 * Provides access to available media breakpoints to convert window width to a configured breakpoint,
 * e.g. 200px - *xs* breakpoint
 */
@Injectable()
export class NbMediaBreakpointsService {


  constructor(@Inject(nbMediaBreakpointsToken) private breakpoints) {
  }

  /**
   * Returns a configured breakpoint by width
   * @param width number
   * @returns {Z|{name: string, width: number}}
   */
  getByWidth(width: number): NbMediaBreakpoint {
    const unknown = { name: 'unknown', width: width };
    const breakpoints = this.getBreakpoints();

    return breakpoints
      .find((point: NbMediaBreakpoint, index: number) => {
        const next = breakpoints[index + 1];
        return width >= point.width && (!next || width < next.width);
      }) || unknown;
  }

  /**
   * Returns a configured breakpoint by name
   * @param name string
   * @returns {Z|{name: string, width: number}}
   */
  getByName(name: string): NbMediaBreakpoint {
    const unknown = { name: 'unknown', width: NaN };
    const breakpoints = this.getBreakpoints();

    return breakpoints.find((point: NbMediaBreakpoint) => name === point.name) || unknown;
  }

  /**
   * Returns a list of configured breakpoins for the theme
   * @returns {{name: string, width: number}[]}
   */
  getBreakpoints(): NbMediaBreakpoint[] {
    return this.breakpoints;
  }
}
