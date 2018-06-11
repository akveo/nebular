import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbDynamicToAddComponent } from './dynamic.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbDynamicToAddComponent,
  ],
  declarations: [
    NbDynamicToAddComponent,
  ],
})
export class NbPlaygroundSharedModule {
}
