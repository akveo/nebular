/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TestBed } from '@angular/core/testing';

import { isUrlPathContain, isUrlPathEqual } from './url-matching-helpers';
import { Component } from '@angular/core';
import { NbMenuModule } from './menu.module';
import { NbLayoutDirection, NbLayoutDirectionService } from '../../services/direction.service'
import { NbMenuItem } from './menu.service';
import { NbThemeModule } from '../../theme.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: '<nb-menu [items]="items"></nb-menu>',
})

class NbMenuArrowTestComponent {
  items: NbMenuItem[] = [
    {
      title: 'Home',
      children: [
        {
          title: 'Inner 1',
        },
        {
          title: 'Inner 2'
        },
      ]
    },
  ]
}

let fixture;

describe('menu helpers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NbThemeModule.forRoot(),
        NbMenuModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule
      ],
      declarations: [NbMenuArrowTestComponent],
    });

    fixture = TestBed.createComponent(NbMenuArrowTestComponent);
    fixture.detectChanges();
  });

  it('should change arrow direction when document direction changes', () => {
    const service: NbLayoutDirectionService = TestBed.get(NbLayoutDirectionService);
    service.setDirection(NbLayoutDirection.RTL);
    fixture.detectChanges();
    const chevron = fixture.nativeElement.querySelector('.chevron');
    expect(chevron.classList).toContain('nb-chevron-left');
    service.setDirection(NbLayoutDirection.LTR);
    fixture.detectChanges();
    expect(chevron.classList).toContain('nb-chevron-right');
  });

  describe('menu URL helpers', () => {

    it('isUrlPathContain should work by url segments', () => {
      expect(isUrlPathContain('/a/ba', '/a/b')).toBeFalsy();
      expect(isUrlPathContain('/a/b/c', '/a/b')).toBeTruthy();
    });

    it('isUrlPathContain should work for url with fragments', () => {
      expect(isUrlPathContain('/a/b#fragment', '/a/b')).toBeTruthy();
    });

    it('isUrlPathContain should work for url with query strings', () => {
      expect(isUrlPathContain('/a/b?a=1;b=2&c=3', '/a/b')).toBeTruthy();
    });

    it('isUrlPathEqual should work for identical paths', () => {
      expect(isUrlPathEqual('/a/b/c', '/a/b')).toBeFalsy();
      expect(isUrlPathEqual('/a/b/c', '/a/b/c')).toBeTruthy();
    });

    it('isUrlPathEqual should work for url with fragments', () => {
      expect(isUrlPathEqual('/a/b/c#fragment', '/a/b/c')).toBeTruthy();
    });

    it('isUrlPathEqual should work for url with query strings', () => {
      expect(isUrlPathEqual('/a/b/c?a=1;b=2&c=3', '/a/b/c')).toBeTruthy();
    });

  })
});


