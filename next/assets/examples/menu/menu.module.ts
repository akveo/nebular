import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbMenuModule } from '@nebular/theme';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuChildrenComponent } from './menu-children.component';
import { MenuShowcaseComponent } from './menu-showcase.component';
import { MenuAutoCollapseComponent } from './menu-autocollapse.component';
import { MenuLinkParamsComponent } from './menu-link-params.component';
import {
  MenuServiceItem1Component,
  MenuServiceItem2Component,
  MenuServiceItem3Component,
  MenuServiceItem31Component,
  MenuServiceItem32Component,
  MenuServiceItem33Component,
  MenuServiceItem331Component,
  MenuServiceItem332Component,
} from './menu-service-children';
import { MenuServiceComponent } from './menu-service.component';

@NgModule({
  declarations: [
    MenuChildrenComponent,
    MenuShowcaseComponent,
    MenuAutoCollapseComponent,
    MenuLinkParamsComponent,
    MenuServiceItem1Component,
    MenuServiceItem2Component,
    MenuServiceItem3Component,
    MenuServiceItem31Component,
    MenuServiceItem32Component,
    MenuServiceItem33Component,
    MenuServiceItem331Component,
    MenuServiceItem332Component,
    MenuServiceComponent,
  ],
  imports: [
    NbMenuModule.forRoot(),
    NbCardModule,
    MenuRoutingModule,
    NbButtonModule,
  ],
})
export class MenuModule {}
