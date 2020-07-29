/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAuthTokenClass } from '../services/token/token';

export interface NbStrategyToken {
  class?: NbAuthTokenClass;
  [key: string]: any;
}

export class NbAuthStrategyOptions {
  name: string;
  token?: NbStrategyToken;
}
