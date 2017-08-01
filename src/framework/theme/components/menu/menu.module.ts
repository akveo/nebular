/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { List } from 'immutable';

import { NbSharedModule } from '../shared/shared.module';

import { NbMenuComponent, NbMenuItemComponent } from './menu.component';
import { NbMenuService, NbMenuInternalService, NbMenuOptions, nbMenuOptionsToken } from './menu.service';

const nbMenuComponents = [NbMenuComponent, NbMenuItemComponent];

const NB_MENU_PROVIDERS = [NbMenuService, NbMenuInternalService];

@NgModule({
  imports: [NbSharedModule],
  declarations: [...nbMenuComponents],
  exports: [...nbMenuComponents],
})
export class NbMenuModule {
  static forRoot(nbMenuOptions?: NbMenuOptions): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NbMenuModule,
      providers: [...NB_MENU_PROVIDERS, { provide: nbMenuOptionsToken, useValue: nbMenuOptions }],
    };
  }
}
