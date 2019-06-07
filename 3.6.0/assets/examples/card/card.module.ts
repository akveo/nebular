import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbListModule } from '@nebular/theme';
import { CardRoutingModule } from './card-routing.module';
import { CardAccentsComponent } from './card-accents.component';
import { CardColorsComponent } from './card-colors.component';
import { CardFullComponent } from './card-full.component';
import { CardShowcaseComponent } from './card-showcase.component';
import { CardSizesComponent } from './card-sizes.component';
import { CardTestComponent } from './card-test.component';
import { CardWithoutBodyComponent } from './card-without-body.component';

@NgModule({
  declarations: [
    CardAccentsComponent,
    CardColorsComponent,
    CardFullComponent,
    CardShowcaseComponent,
    CardSizesComponent,
    CardTestComponent,
    CardWithoutBodyComponent,
  ],
  imports: [
    CommonModule,
    NbListModule,
    NbCardModule,
    CardRoutingModule,
  ],
})
export class CardModule {}
