/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export interface Schema {
  project: string;
  theme: 'default' | 'dark' | 'cosmic' | 'corporate';
  customization: boolean;
  layout: boolean;
  animations: boolean;
}
