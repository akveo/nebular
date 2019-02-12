import { NgModule } from '@angular/core';
import { BidiModule, Directionality } from '@angular/cdk/bidi';
import { NbDirectionality } from './bidi';

@NgModule({
  providers: [
    { provide: NbDirectionality, useExisting: Directionality },
  ],
})
export class NbBidiModule extends BidiModule {}
