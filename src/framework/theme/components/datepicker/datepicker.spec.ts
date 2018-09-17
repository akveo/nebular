/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NbDatepickerModule } from './datepicker.module';
import { NbOverlayContainerAdapter, NbOverlayModule } from '../cdk';
import { NbThemeModule } from '../../theme.module';
import { NbLayoutModule } from '../layout/layout.module';
import { NB_DOCUMENT } from '../../theme.options';
import { NbDatepickerComponent } from './datepicker.component';


@Component({
  selector: 'nb-datepicker-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <input [nbDatepicker]="datepicker">
        <nb-datepicker #datepicker></nb-datepicker>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbDatepickerTestComponent {
  @ViewChild(NbDatepickerComponent) datepicker: NbDatepickerComponent<Date>;
}

fdescribe('nb-datepicker', () => {
  let fixture: ComponentFixture<NbDatepickerTestComponent>;
  let overlayContainerService: NbOverlayContainerAdapter;
  let overlayContainer: HTMLElement;
  let document: Document;

  const datepicker = () => fixture.componentInstance.datepicker;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot({ name: 'default' }),
        NbOverlayModule.forRoot(),
        NbLayoutModule,
        NbDatepickerModule,
      ],
      declarations: [NbDatepickerTestComponent],
    });

    fixture = TestBed.createComponent(NbDatepickerTestComponent);
    overlayContainerService = TestBed.get(NbOverlayContainerAdapter);
    document = TestBed.get(NB_DOCUMENT);

    overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);

    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainerService.clearContainer();
  });

  it('should render calendar', () => {
    datepicker().show();
    const calendar = overlayContainer.querySelector('nb-calendar');
    expect(calendar).toBeTruthy();
  });
});
