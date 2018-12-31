import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { AzureCallbackComponent } from './azure-callback.component';
import { AzureLoginComponent } from './azure-login.component';

const routes: Route[] = [
  {
    path: '',
    component: AzureLoginComponent,
  },
  {
    path: 'callback',
    component: AzureCallbackComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AzureRoutingModule {}
