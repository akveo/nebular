/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbTokenClass } from '../services/';

export class NbAuthStrategyOptions {
  name: string;
  token: {
    class: NbTokenClass;
    [key: string]: any;
  };
}
