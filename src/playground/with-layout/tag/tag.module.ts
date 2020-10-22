import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagShowcaseComponent } from './tag-showcase/tag-showcase.component';
import { TagRoutingModule } from './tag-routing.module';

import { NbTagModule } from '@nebular/theme';
import {TagStatusShowcaseComponent} from './tag-status-showcase/tag-status-showcase.component';



@NgModule({
  imports: [
    CommonModule,
    NbTagModule,
    TagRoutingModule,
  ],
  declarations: [
    TagShowcaseComponent,
    TagStatusShowcaseComponent,
  ],
})
export class TagModule { }
