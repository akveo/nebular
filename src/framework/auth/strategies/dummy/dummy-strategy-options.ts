/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAuthStrategyOptions } from '../auth-strategy-options';
import { NbAuthSimpleToken } from '../../services/';

export class NbDummyAuthStrategyOptions extends NbAuthStrategyOptions {
  name: string;
  token? = {
    class: NbAuthSimpleToken,
  };
  delay? = 1000;
  alwaysFail? = false;
}

export const dummyStrategyOptions: NbDummyAuthStrategyOptions = new NbDummyAuthStrategyOptions();
