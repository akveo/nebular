/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export class NbFileModel {
  id: string;
  isImage: boolean;
  file?: File;
  name?: string;
  url?: string;
  totalSize?: number;
  loaded?: number;
  uploaded?: boolean;
  progressPercent?: number;
}
