import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxAppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: NgxAppComponent,
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#NgxAuthModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAppRouting {
}
