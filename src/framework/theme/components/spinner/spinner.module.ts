import { NgModule } from '@angular/core';
import { NbSpinnerComponent } from './spinner.component';
import { NbSharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    NbSharedModule,
  ],
  exports: [NbSpinnerComponent],
  declarations: [NbSpinnerComponent],
})
export class NbSpinnerModule {}
