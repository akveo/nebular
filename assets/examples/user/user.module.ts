import { NgModule } from '@angular/core';
import { NbCardModule, NbUserModule } from '@nebular/theme';
import { UserRoutingModule } from './user-routing.module';
import { UserShowcaseComponent } from './user-showcase.component';
import { UserSizesComponent } from './user-sizes.component';
import { UserAvatarSettingsComponent } from './user-avatar-settings.component';
import { UserHideCaptionsComponent } from './user-hide-captions.component';

@NgModule({
  declarations: [
    UserShowcaseComponent,
    UserSizesComponent,
    UserAvatarSettingsComponent,
    UserHideCaptionsComponent,
  ],
  imports: [ NbUserModule, NbCardModule, UserRoutingModule ],
})
export class UserModule {}
