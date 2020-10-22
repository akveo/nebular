import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbTagComponent} from './tag.component';
import {NbIconModule} from '../icon/icon.module';



@NgModule({
  imports: [
    CommonModule,
    NbIconModule,
  ],
  declarations: [
    NbTagComponent,
  ],
  exports: [
    NbTagComponent,
  ],
})
export class NbTagModule { }
