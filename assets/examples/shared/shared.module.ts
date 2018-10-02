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
  entryComponents: [
    NbDynamicToAddComponent,
  ],
})
export class NbPlaygroundSharedModule {
}
