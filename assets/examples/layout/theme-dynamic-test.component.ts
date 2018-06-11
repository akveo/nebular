import { Component, ComponentFactoryResolver } from '@angular/core';

import { NbThemeService } from '@nebular/theme';
import { NbDynamicToAddComponent } from '../shared/dynamic.component';

@Component({
  selector: 'nb-dynamic-test',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <a href="#" class="navbar-brand">Akveo</a>
        <button id="add-dynamic" (click)="addDynamicComponent()">Add Dynamic Copmonent</button>
        <button id="add-dynamic-by-factory" (click)="addDynamicByFactory()">Add Dynamic By Factory</button>
        <button id="clear-dynamic" (click)="clearDynamicComponents()">Clear Dynamic Copmonents</button>
      </nb-layout-header>

      <nb-sidebar right>
        Sidebar content
      </nb-sidebar>

      <nb-layout-column>
        <nb-card>
          <nb-card-header>Hello</nb-card-header>
          <nb-card-body>
            Some Test content
          </nb-card-body>
        </nb-card>
      </nb-layout-column>


      <nb-layout-footer fixed>
        &copy; Akveo 2017
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class NbThemeDynamicTestComponent {
  constructor(private themeService: NbThemeService, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  addDynamicComponent() {
    this.themeService.appendToLayoutTop(NbDynamicToAddComponent).subscribe(cRef => console.info(cRef));
  }

  addDynamicByFactory() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(NbDynamicToAddComponent);
    this.themeService.appendToLayoutTop(factory).subscribe(cRef => console.info(cRef));
  }

  clearDynamicComponents() {
    this.themeService.clearLayoutTop().subscribe(res => console.info(res));
  }
}
