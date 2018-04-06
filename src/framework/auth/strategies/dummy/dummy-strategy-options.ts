/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbAuthStrategyOptions } from '../strategy-options';
import { NbAuthSimpleToken } from '../../services/';

export class NbDummyAuthStrategyOptions implements NbAuthStrategyOptions {
  name: 'dummy';
  token = {
    class: NbAuthSimpleToken,
  };
  delay?: number = 1000;
  alwaysFail?: boolean = false;
}

export const defaultOptions: NbDummyAuthStrategyOptions = new NbDummyAuthStrategyOptions();
