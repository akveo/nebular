import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbWindowModule } from '@nebular/theme';

import { WindowRoutingModule } from './window-routing.module';
import { TemplateWindowComponent } from './template-window.component';
import { WindowShowcaseComponent } from './window-showcase.component';
import { WindowsBackdropComponent } from './windows-backdrop.component';
import { FormComponent } from './components/form.component';
import { WindowControlsComponent } from './window-controls.component';

@NgModule({
  declarations: [
    TemplateWindowComponent,
    WindowShowcaseComponent,
    WindowsBackdropComponent,
    FormComponent,
    WindowControlsComponent,
  ],
  imports: [
    NbWindowModule.forRoot(),
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbCardModule,
    WindowRoutingModule,
  ],
  entryComponents: [ FormComponent ],
})
export class WindowModule {}
