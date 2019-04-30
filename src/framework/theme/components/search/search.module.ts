/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbIconModule } from '../icon/icon.module';
import { NbButtonModule } from '../button/button.module';

import { NbSearchComponent, NbSearchFieldComponent } from './search.component';
import { NbSearchService } from './search.service';


@NgModule({
  imports: [
    NbSharedModule,
    NbOverlayModule,
    NbIconModule,
    NbButtonModule,
  ],
  declarations: [
    NbSearchComponent,
    NbSearchFieldComponent,
  ],
  exports: [
    NbSearchComponent,
    NbSearchFieldComponent,
  ],
  providers: [
    NbSearchService,
  ],
  entryComponents: [
    NbSearchFieldComponent,
  ],
})
export class NbSearchModule {
}
