import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { UserShowcaseComponent } from './user-showcase.component';
import { UserSizesComponent } from './user-sizes.component';
import { UserAvatarSettingsComponent } from './user-avatar-settings.component';
import { UserHideCaptionsComponent } from './user-hide-captions.component';

const routes: Route[] = [
  {
    path: 'user-showcase.component',
    component: UserShowcaseComponent,
  },
  {
    path: 'user-sizes.component',
    component: UserSizesComponent,
  },
  {
    path: 'user-avatar-settings.component',
    component: UserAvatarSettingsComponent,
  },
  {
    path: 'user-hide-captions.component',
    component: UserHideCaptionsComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class UserRoutingModule {}
