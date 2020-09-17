/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAuthStrategyOptions, NbStrategyToken } from '../auth-strategy-options';
import { NbAuthSimpleToken } from '../../services/token/token';

export class NbDummyAuthStrategyOptions extends NbAuthStrategyOptions {
  token?: NbStrategyToken = {
    class: NbAuthSimpleToken,
  };
  delay?: number = 1000;
  alwaysFail?: boolean = false;
}

export const dummyStrategyOptions: NbDummyAuthStrategyOptions = new NbDummyAuthStrategyOptions();
