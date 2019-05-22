/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAuthTokenClass } from '../services/token/token';

export class NbAuthStrategyOptions {
  name: string;
  token?: {
    class?: NbAuthTokenClass;
    [key: string]: any;
  };
}
