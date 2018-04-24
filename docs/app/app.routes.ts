/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Routes } from '@angular/router';
import { NgdExampleRendererComponent } from './components/example/example-renderer.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#NgdHomeModule',
  },
  {
    path: 'docs',
    loadChildren: './documentation/documentation.module#NgdDocumentationModule',
  },
  {
    path: 'example',
    component: NgdExampleRendererComponent,
    children: [
      {
        path: '',
        loadChildren: '../../src/playground/playground.module#NbPlaygroundModule',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
