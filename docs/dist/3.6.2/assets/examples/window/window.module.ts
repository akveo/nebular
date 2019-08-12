import { NgModule } from '@angular/core';
import { NbInputModule, NbWindowModule } from '@nebular/theme';
import { WindowRoutingModule } from './window-routing.module';
import { TemplateWindowComponent } from './template-window.component';
import { WindowShowcaseComponent } from './window-showcase.component';
import { WindowsBackdropComponent } from './windows-backdrop.component';
import { FormComponent } from './components/form.component';

@NgModule({
  declarations: [
    TemplateWindowComponent,
    WindowShowcaseComponent,
    WindowsBackdropComponent,
    FormComponent,
  ],
  imports: [
    NbWindowModule.forRoot(),
    WindowRoutingModule,
    NbInputModule,
  ],
  entryComponents: [ FormComponent ],
})
export class WindowModule {}
