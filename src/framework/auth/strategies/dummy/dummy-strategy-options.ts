/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAuthStrategyOptions } from '../auth-strategy-options';
import { NbAuthSimpleToken } from '../../services/token/token';

export class NbDummyAuthStrategyOptions extends NbAuthStrategyOptions {
  token? = {
    class: NbAuthSimpleToken,
  };
  delay? = 1000;
  alwaysFail? = false;
}

export const dummyStrategyOptions: NbDummyAuthStrategyOptions = new NbDummyAuthStrategyOptions();
