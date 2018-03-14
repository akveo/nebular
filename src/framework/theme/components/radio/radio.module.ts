import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbRadioComponent } from './radio.component';

@NgModule({
  imports: [
    NbSharedModule,
  ],
  declarations: [NbRadioComponent],
  exports: [NbRadioComponent],
})
export class NbRadioModule { }
