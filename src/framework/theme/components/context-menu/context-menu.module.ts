import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbContextMenuDirective } from './context-menu.directive';
import { NbContextMenuComponent } from './context-menu.component';
import { NbMenuModule } from '../menu/menu.module';

@NgModule({
  imports: [CommonModule, NbMenuModule],
  exports: [NbContextMenuDirective],
  declarations: [NbContextMenuDirective, NbContextMenuComponent],
  entryComponents: [NbContextMenuComponent],
})
export class NbContextMenuModule {
}
