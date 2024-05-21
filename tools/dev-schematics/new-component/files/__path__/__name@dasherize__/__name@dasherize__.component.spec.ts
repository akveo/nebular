/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(className) %>Component } from './<%= dasherize(name) %>.component';

describe('<%= classify(className) %>Component', () => {
  let component: <%= classify(className) %>Component;
  let fixture: ComponentFixture<<%= classify(className) %>Component>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ <%= classify(className) %>Component ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(<%= classify(className) %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
