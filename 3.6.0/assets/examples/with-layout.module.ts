import { NgModule } from '@angular/core';
import { NbLayoutModule } from '@nebular/theme';
import { WithLayoutRoutingModule } from './with-layout-routing.module';
import { PlaygroundLayoutComponent } from './playground-layout.component';

@NgModule({
  declarations: [
    PlaygroundLayoutComponent,
  ],
  imports: [ NbLayoutModule, WithLayoutRoutingModule ],
})
export class WithLayoutModule {}
