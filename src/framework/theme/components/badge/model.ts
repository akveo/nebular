/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbBadgePosition } from './badge.component';
import { NbComponentStatus } from '../component-status';


export interface NbBadge {
  text?: string;
  position?: NbBadgePosition;
  status?: NbComponentStatus;
  dotMode?: boolean;
}
