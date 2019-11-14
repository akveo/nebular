import { NgModule } from '@angular/core';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { NbPlatform } from './platform-service';

@NgModule({
  providers: [
    { provide: NbPlatform, useExisting: Platform },
  ],
})
export class NbPlatformModule extends PlatformModule {}
