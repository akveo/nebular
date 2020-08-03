import { NgModule } from '@angular/core';
import { NbAutocompleteModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { AutocompleteShowcaseComponent } from './autocomplete-showcase.component';
import { AutocompleteRoutingModule } from './autocomplete-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteFormComponent } from './autocomplete-form.component';
import { AutocompleteGroupComponent } from './autocomplete-group.component';
import { AutocompleteCustomDisplayComponent } from './autocomplete-custom-display.component';
import { AutocompleteActiveFirstComponent } from './autocomplete-active-first.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AutocompleteShowcaseComponent,
    AutocompleteFormComponent,
    AutocompleteGroupComponent,
    AutocompleteCustomDisplayComponent,
    AutocompleteActiveFirstComponent,
  ],
  exports: [
    AutocompleteShowcaseComponent,
    AutocompleteFormComponent,
    AutocompleteGroupComponent,
    AutocompleteCustomDisplayComponent,
    AutocompleteActiveFirstComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbAutocompleteModule,
    NbInputModule,
    AutocompleteRoutingModule,
    NbCardModule,
  ],
})
export class AutocompleteModule {}
