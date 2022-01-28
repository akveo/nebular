/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbPaginationComponent } from './pagination.component';

describe('Component: NbPagination', () => {
  let component: NbPaginationComponent;
  let fixture: ComponentFixture<NbPaginationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NbPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NbPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
