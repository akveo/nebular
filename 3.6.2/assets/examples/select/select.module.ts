import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbSelectModule } from '@nebular/theme';
import { SelectRoutingModule } from './select-routing.module';
import { SelectCleanComponent } from './select-clean.component';
import { SelectDisabledComponent } from './select-disabled.component';
import { SelectFormComponent } from './select-form.component';
import { SelectGroupsComponent } from './select-groups.component';
import { SelectHeroComponent } from './select-hero.component';
import { SelectLabelShowcaseComponent } from './select-label.component';
import { SelectMultipleComponent } from './select-multiple.component';
import { SelectOutlineComponent } from './select-outline.component';
import { SelectPlaceholderComponent } from './select-placeholder.component';
import { SelectShapeComponent } from './select-shapes.component';
import { SelectShowcaseComponent } from './select-showcase.component';
import { SelectSizesComponent } from './select-sizes.component';
import { SelectStatusComponent } from './select-status.component';

@NgModule({
  declarations: [
    SelectCleanComponent,
    SelectDisabledComponent,
    SelectFormComponent,
    SelectGroupsComponent,
    SelectHeroComponent,
    SelectLabelShowcaseComponent,
    SelectMultipleComponent,
    SelectOutlineComponent,
    SelectPlaceholderComponent,
    SelectShapeComponent,
    SelectShowcaseComponent,
    SelectSizesComponent,
    SelectStatusComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbSelectModule,
    SelectRoutingModule,
  ],
})
export class SelectModule {}
