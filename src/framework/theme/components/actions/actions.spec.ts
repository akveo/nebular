import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import {
  NbActionComponent,
  NbActionsComponent,
  NbActionsModule,
  NbBadgeComponent,
  NbBadgeModule,
  NbComponentSize,
  NbIconComponent,
  NbIconLibraries,
  NbThemeModule,
} from '@nebular/theme';

const ICON_NAME = 'chevron-left-outline';

@Component({
  template: `
    <nb-actions>
      <nb-action [icon]="icon" [link]="link">
        <ng-container *ngIf="projectContent">{{ projectedText }}</ng-container>
      </nb-action>
    </nb-actions>
  `,
  standalone: false,
})
export class NbActionsTestComponent {
  @Input()
  projectContent: boolean = false;
  projectedText = 'text.text.text.text.text';

  @Input()
  icon: string;
  @Input()
  link: string;

  @ViewChild(NbActionsComponent) actionsComponent: NbActionsComponent;
  @ViewChild(NbActionComponent) actionComponent: NbActionComponent;
}

describe('NbActionComponent link with icon', () => {
  let fixture: ComponentFixture<NbActionComponent>;
  let actionComponent: NbActionComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), NbThemeModule.forRoot(), NbBadgeModule, NbActionsModule],
    });
    const iconLibs: NbIconLibraries = TestBed.inject(NbIconLibraries);
    iconLibs.setDefaultPack('nebular-essentials');

    fixture = TestBed.createComponent(NbActionComponent);
    actionComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain router link if link input set', () => {
    fixture.componentRef.setInput('icon', ICON_NAME);
    fixture.componentRef.setInput('link', '.');
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.directive(RouterLink));
    expect(link).not.toBeNull();
  });

  it('should contain anchor with href if href input set', () => {
    fixture.componentRef.setInput('icon', ICON_NAME);
    fixture.componentRef.setInput('href', '/');
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a[href]'));
    expect(link).not.toBeNull();
    expect(link.properties.href).toEqual('/');
  });

  it('should not contain router link if href input set', () => {
    fixture.componentRef.setInput('icon', ICON_NAME);
    fixture.componentRef.setInput('href', '/');
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.directive(RouterLink));
    expect(link).toBeNull();
  });

  it('should contain empty link if neither link nor href inputs set', () => {
    fixture.componentRef.setInput('icon', ICON_NAME);
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a[href]'));
    expect(link).not.toBeNull();
    expect(link.attributes.href).toEqual('#');
  });

  it('should contain icon in routerLink anchor', () => {
    fixture.componentRef.setInput('icon', ICON_NAME);
    fixture.componentRef.setInput('link', '.');
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.directive(RouterLink)).query(By.directive(NbIconComponent));

    expect(icon).not.toBeNull();
    expect(icon.componentInstance.icon).toEqual(ICON_NAME);
  });

  it('should contain icon in href anchor', () => {
    fixture.componentRef.setInput('icon', ICON_NAME);
    fixture.componentRef.setInput('href', '/');
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('a[href]')).query(By.directive(NbIconComponent));

    expect(icon).not.toBeNull();
    expect(icon.componentInstance.icon).toEqual(ICON_NAME);
  });

  it('should contain icon in empty anchor', () => {
    fixture.componentRef.setInput('icon', ICON_NAME);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('a')).query(By.directive(NbIconComponent));

    expect(icon).not.toBeNull();
    expect(icon.componentInstance.icon).toEqual(ICON_NAME);
  });

  it('should set title in routerLink anchor', () => {
    fixture.componentRef.setInput('icon', ICON_NAME);
    fixture.componentRef.setInput('link', '.');
    const title = 'routerLink';
    fixture.componentRef.setInput('title', title);
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.directive(RouterLink));

    expect(link.properties.title).toEqual(title);
  });

  it('should set title in href anchor', () => {
    fixture.componentRef.setInput('icon', ICON_NAME);
    fixture.componentRef.setInput('href', '/');
    const title = 'hrefAnchor';
    fixture.componentRef.setInput('title', title);
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a'));

    expect(link.properties.title).toEqual(title);
  });

  it('should set title in empty anchor', () => {
    fixture.componentRef.setInput('icon', ICON_NAME);
    const title = 'emptyAnchor';
    fixture.componentRef.setInput('title', title);
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a'));

    expect(link.properties.title).toEqual(title);
  });

  it('should set class if disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(fixture.debugElement.classes.disabled).toEqual(true);
  });

  it('should contain badge if badgeText set', () => {
    const badgeText = '1';
    fixture.componentRef.setInput('badgeText', badgeText);
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.directive(NbBadgeComponent));
    expect(badge).not.toBeNull();
    expect(badge.componentInstance.text).toEqual('1');
  });

  it('should pass set badge position and status to badge component', () => {
    fixture.componentRef.setInput('badgeText', '1');
    fixture.componentRef.setInput('badgePosition', 'bottom right');
    fixture.componentRef.setInput('badgeStatus', 'info');
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.directive(NbBadgeComponent));
    const badgeComponent: NbBadgeComponent = badge.componentInstance;
    expect(badgeComponent.position).toEqual('bottom right');
    expect(badgeComponent.status).toEqual('info');
  });
});

describe('NbActionComponent content projection', () => {
  let fixture: ComponentFixture<NbActionsTestComponent>;
  let testComponent: NbActionsTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), NbThemeModule.forRoot(), NbActionsModule],
      declarations: [NbActionsTestComponent],
    });
    const iconLibs: NbIconLibraries = TestBed.inject(NbIconLibraries);
    iconLibs.setDefaultPack('nebular-essentials');

    fixture = TestBed.createComponent(NbActionsTestComponent);
    testComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should not contain anything if neither icon nor content passed', () => {
    const action = fixture.debugElement.query(By.directive(NbActionComponent));
    expect(action.nativeElement.textContent).toEqual('');
  });

  it('should contain projected content if passed', () => {
    fixture.componentRef.setInput('projectContent', true);
    fixture.detectChanges();

    const action = fixture.debugElement.query(By.directive(NbActionComponent));
    expect(action.nativeElement.textContent).toEqual(testComponent.projectedText);
  });

  it('should not render projected content if icon input set', () => {
    fixture.componentRef.setInput('icon', ICON_NAME);
    fixture.componentRef.setInput('link', '/');
    fixture.componentRef.setInput('projectContent', true);
    fixture.detectChanges();

    const action = fixture.debugElement.query(By.directive(NbActionComponent));
    const link = action.query(By.css('a'));
    const icon = action.query(By.directive(NbIconComponent));
    expect(link).not.toBeNull();
    expect(icon).not.toBeNull();
    expect(action.nativeElement.textContent).toEqual('');
  });
});

describe('NbActionsComponent', () => {
  let fixture: ComponentFixture<NbActionsComponent>;
  let actionsComponent: NbActionsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbActionsModule],
    });

    fixture = TestBed.createComponent(NbActionsComponent);
    actionsComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should has full width class if fullWidth input set', () => {
    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();

    expect(fixture.debugElement.classes['full-width']).toEqual(true);
  });

  it('should set size class corresponding to current size', () => {
    const sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];

    for (const size of sizes) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();

      expect(fixture.debugElement.classes[`size-${size}`]).toEqual(true);
    }
  });
});
