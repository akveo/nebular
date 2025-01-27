/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ElementRef, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NbThemeModule, NbIconModule, NbIconLibraries, NbIconComponent } from '@nebular/theme';

@Component({
  template: ` <nb-icon #iconEl [icon]="icon"></nb-icon> `,
  standalone: false,
})
class IconTestComponent {
  @Input() icon;
}

describe('Component: NbIcon', () => {
  let iconTestComponent: IconTestComponent;
  let fixture: ComponentFixture<IconTestComponent>;
  let iconElement: ElementRef;
  let iconsLibrary: NbIconLibraries;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), NbIconModule],
      providers: [NbIconLibraries],
      declarations: [IconTestComponent],
    });

    fixture = bed.createComponent(IconTestComponent);
    iconsLibrary = bed.inject(NbIconLibraries);

    iconsLibrary.registerSvgPack('svg-pack', { home: '<svg><rect></rect></svg>' }, { packClass: 'custom-pack' });
    iconsLibrary.setDefaultPack('svg-pack');

    iconTestComponent = fixture.componentInstance;
    iconElement = fixture.debugElement.query(By.directive(NbIconComponent));
  });

  it('should render icon', () => {
    iconTestComponent.icon = 'home';
    fixture.detectChanges();

    const svg = iconElement.nativeElement.querySelector('svg');

    expect(iconElement.nativeElement.classList.contains('custom-pack')).toBeTruthy();
    expect(svg.innerHTML).toContain('<rect></rect>');
  });
});
