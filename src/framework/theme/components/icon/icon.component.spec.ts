/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbIconModule } from './icon.module';
import { NbIconLibraries } from './icon-libraries';


@Component({
  template: `
    <nb-icon #iconEl [icon]="icon"></nb-icon>
  `,
})
class IconTestComponent {
  @ViewChild('iconEl', { read: ElementRef }) iconElement;

  @Input() icon;
}

describe('Component: NbIcon', () => {

  let iconTestComponent: IconTestComponent;
  let fixture: ComponentFixture<IconTestComponent>;
  let iconElement: ElementRef;
  let iconsLibrary: NbIconLibraries;

  beforeEach(() => {

    const bed = TestBed.configureTestingModule({
      imports: [ NbIconModule ],
      providers: [ NbIconLibraries ],
      declarations: [ IconTestComponent ],
    });

    fixture = bed.createComponent(IconTestComponent);
    iconsLibrary = bed.get(NbIconLibraries);

    iconsLibrary
      .registerSvgPack('svg-pack', { home: '<svg><rect></rect></svg>' }, { packClass: 'custom-pack' });
    iconsLibrary.setDefaultPack('svg-pack');

    iconTestComponent = fixture.componentInstance;
    iconElement = iconTestComponent.iconElement;
  });

  it('should render icon', () => {
    iconTestComponent.icon = 'home';
    fixture.detectChanges();
    const svg = iconElement.nativeElement.querySelector('svg');

    expect(iconElement.nativeElement.classList.contains('custom-pack')).toBeTruthy();
    expect(svg.innerHTML).toContain('<rect></rect>');
  });
});
