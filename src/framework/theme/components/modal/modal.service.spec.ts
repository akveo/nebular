import { Component, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NbOverlayModule } from '../cdk';
import { NbModalService } from './modal.service';
import { NbModalModule } from './modal.module';
import { NbThemeModule } from '../../theme.module';


@Component({ selector: 'nb-test-modal', template: '' })
class NbTestModalComponent {
}

@NgModule({
  declarations: [NbTestModalComponent],
  entryComponents: [NbTestModalComponent],
})
class NbTestModalModule {
}


describe('modal-service', () => {
  let modalService: NbModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NbTestModalModule,
        NbThemeModule.forRoot({ name: 'default' }),
        NbModalModule,
        NbOverlayModule.forRoot(),
      ],
    });

    modalService = TestBed.get(NbModalService);
  });

  beforeEach(() => {
    // set container
  });

  afterAll(() => {
    // clear container
  });

  it('should render modal', () => {
    const ref = modalService.show(NbTestModalComponent);
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

  it('should leave capability scroll content under modal if hasScroll is true', () => {
  });

  it('should disable scroll under modal if hasScroll is false', () => {
  });
});

describe('modal-ref', () => {
  it('should provide rendered modal component through content property', () => {
  });

  it('should hide modal', () => {
  });

  it('should fire backdropClick$ if backdrop was clicked', () => {
  });

  it('should not fire backdropClick$ if backdrop wasn\'t clicked', () => {
  });

  it('should close on backdrop click if closeOnBackdropClick is true', () => {
  });

  it('should not close on backdrop click if closeOnBackdropClick is false', () => {
  });

  it('should close on escape press if closeOnEsc is true', () => {
  });

  it('should not close on escape press if closeOnEsc is false', () => {
  });

  it('should automatically focus first focusable element of the modal if autoFocus is true', () => {
  });

  it('should blur focused element if autoFocus is true and no focusable element in the modal', () => {
  });

  it('should leave focus on the focused element if autoFocus is false', () => {
  });
});
