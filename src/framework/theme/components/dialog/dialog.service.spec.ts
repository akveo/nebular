import { Component, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NbOverlayModule } from '../cdk';
import { NbDialogService } from './dialog.service';
import { NbDialogModule } from './dialog.module';
import { NbThemeModule } from '../../theme.module';


@Component({ selector: 'nb-test-dialog', template: '' })
class NbTestDialogComponent {
}

@NgModule({
  declarations: [NbTestDialogComponent],
  entryComponents: [NbTestDialogComponent],
})
class NbTestDialogModule {
}


describe('dialog-service', () => {
  let dialogService: NbDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NbTestDialogModule,
        NbThemeModule.forRoot({ name: 'default' }),
        NbDialogModule,
        NbOverlayModule.forRoot(),
      ],
    });

    dialogService = TestBed.get(NbDialogService);
  });

  beforeEach(() => {
    // set container
  });

  afterAll(() => {
    // clear container
  });

  it('should render dialog', () => {
    const ref = dialogService.open(NbTestDialogComponent);
    expect(ref.content).toBeTruthy();
  });

  it('should apply config defaults', () => {
  });

  it('should render with backdrop if hasBackdrop is true', () => {
  });

  it('should render without backdrop if hasBackdrop is false', () => {
  });

  it('should assign backdropClass if provided', () => {
  });

  it('should leave capability scroll content under dialog if hasScroll is true', () => {
  });

  it('should disable scroll under dialog if hasScroll is false', () => {
  });
});

describe('dialog-ref', () => {
  it('should provide rendered dialog component through content property', () => {
  });

  it('should close dialog', () => {
  });

  it('should fire onBackdropClick if backdrop was clicked', () => {
  });

  it('should not fire onBackdropClick if backdrop wasn\'t clicked', () => {
  });

  it('should close on backdrop click if closeOnBackdropClick is true', () => {
  });

  it('should not close on backdrop click if closeOnBackdropClick is false', () => {
  });

  it('should close on escape press if closeOnEsc is true', () => {
  });

  it('should not close on escape press if closeOnEsc is false', () => {
  });

  it('should automatically focus first focusable element of the dialog if autoFocus is true', () => {
  });

  it('should blur focused element if autoFocus is true and no focusable element in the dialog', () => {
  });

  it('should leave focus on the focused element if autoFocus is false', () => {
  });
});
