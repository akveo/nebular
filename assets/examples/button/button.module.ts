import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { ButtonRoutingModule } from './button-routing.module';
import { ButtonColorsComponent } from './button-colors.component';
import { ButtonFullWidthComponent } from './button-full-width.component';
import { ButtonHeroComponent } from './button-hero.component';
import { ButtonOutlineComponent } from './button-outline.component';
import { ButtonShapesComponent } from './button-shapes.component';
import { ButtonShowcaseComponent } from './button-showcase.component';
import { ButtonSizesComponent } from './button-sizes.component';
import { ButtonTypesComponent } from './button-types.component';

@NgModule({
  declarations: [
    ButtonColorsComponent,
    ButtonFullWidthComponent,
    ButtonHeroComponent,
    ButtonOutlineComponent,
    ButtonShapesComponent,
    ButtonShowcaseComponent,
    ButtonSizesComponent,
    ButtonTypesComponent,
  ],
  imports: [ NbCardModule, NbButtonModule, ButtonRoutingModule ],
})
export class ButtonModule {}
