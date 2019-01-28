import { NgModule } from '@angular/core';
import { BidiModule, Directionality } from '@angular/cdk/bidi';
import { NbDirectionality } from '@nebular/theme/components/cdk/bidi/bidi';

@NgModule({
  providers: [
    { provide: NbDirectionality, useExisting: Directionality },
  ],
})
export class NbBidiModule extends BidiModule {}
