import { NgModule } from '@angular/core';
import { WithoutLayoutRoutingModule } from './without-layout-routing.module';
import { PlaygroundBaseComponent } from './playground-base.component';

@NgModule({
  declarations: [
    PlaygroundBaseComponent,
  ],
  imports: [ WithoutLayoutRoutingModule ],
})
export class WithoutLayoutModule {}
