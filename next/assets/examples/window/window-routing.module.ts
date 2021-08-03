import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { TemplateWindowComponent } from './template-window.component';
import { WindowShowcaseComponent } from './window-showcase.component';
import { WindowsBackdropComponent } from './windows-backdrop.component';
import { WindowControlsComponent } from './window-controls.component';

const routes: Route[] = [
  {
    path: 'template-window.component',
    component: TemplateWindowComponent,
  },
  {
    path: 'window-showcase.component',
    component: WindowShowcaseComponent,
  },
  {
    path: 'windows-backdrop.component',
    component: WindowsBackdropComponent,
  },
  {
    path: 'window-controls.component',
    component: WindowControlsComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class WindowRoutingModule {}
