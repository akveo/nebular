import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

@NgModule({ exports: [PortalModule] })
export class NbPortalModule extends PortalModule {
}
