import { NbToastContainer, NbToastrContainerRegistry, NbToastrService } from './toastr.service';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition } from '../cdk/overlay/position-helper';
import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Component, ComponentFactoryResolver} from '@angular/core';
import { NbToast, NbToastrModule } from '@nebular/theme';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'nb-toastr-test',
  template: `
      <nb-layout>
          <nb-layout-column>
              <div class="test-div"></div>
          </nb-layout-column>
      </nb-layout>
  `,
})
export class  NbToastrTestComponent {
  constructor(private toastrService: NbToastrService) {}

  showToast(className: string) {
    this.toastrService.show('testing toastr', '', { toastClass: className });
  }
}

describe('toastr-component', () => {
  let fixture: ComponentFixture<NbToastrTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule,
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbToastrModule.forRoot(),
      ],
      declarations: [
        NbToastrTestComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NbToastrTestComponent);
  }));

  it('should add \'toastr-overlay-container\' class to overlay', () => {
    fixture.debugElement.componentInstance.showToast('toast-test-class');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cdk-global-overlay-wrapper').classList)
      .toContain('toastr-overlay-container');
  });

  it('should set class if provided', () => {
    fixture.debugElement.componentInstance.showToast('toast-test-class');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toast-test-class')).toBeTruthy();
  });
});

describe('toastr-service', () => {
  let toastr: NbToastrService;
  let containerStub;
  let containerRegistryStub;

  beforeEach(() => {
    containerStub = {
      attach() {
      },
    };
  });

  beforeEach(() => {
    containerRegistryStub = {
      get() {
        return containerStub;
      },
    };
  });

  beforeEach(() => {
    toastr = new NbToastrService(<any> {}, <any> containerRegistryStub);
  });

  it('should attach to toastr container', () => {
    const getContainerSpy = spyOn(containerRegistryStub, 'get');
    const attachSpy = spyOn(containerStub, 'attach');
    getContainerSpy.and.returnValue(containerStub);

    toastr.show('');

    expect(getContainerSpy).toHaveBeenCalled();
    expect(attachSpy).toHaveBeenCalled();
  });

  it('should merge user configurations with defaults', () => {
    const attachSpy = spyOn(containerStub, 'attach');

    toastr.show('', '', {
      position: NbGlobalLogicalPosition.BOTTOM_START,
      duration: 1234,
      preventDuplicates: true,
      toastClass: 'my-toast-class',
    });

    expect(attachSpy).toHaveBeenCalled();
    const [[{ config }]] = attachSpy.calls.allArgs();
    expect(config.position).toBe(NbGlobalLogicalPosition.BOTTOM_START, 'incorrect position');
    expect(config.status).toBe('primary', 'incorrect status');
    expect(config.duration).toBe(1234, 'incorrect duration');
    expect(config.destroyByClick).toBe(true, 'incorrect destroyByClick');
    expect(config.preventDuplicates).toBe(true, 'incorrect preventDuplicates');
    expect(config.hasIcon).toBe(true, 'incorrect hasIcon');
    expect(config.toastClass).toBe('my-toast-class', 'incorrect toastClass');
  });

  it('should call show with success status when success called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.success('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe('success');
  });

  it('should call show with info status when info called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.info('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe('info');
  });

  it('should call show with warning status when warning called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.warning('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe('warning');
  });

  it('should call show with primary status when primary called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.primary('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe('primary');
  });

  it('should call show with danger status when danger called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.danger('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe('danger');
  });

  it('should call show with default status when default called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.default('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe('basic');
  });
});

describe('toastr-container-registry', () => {
  let toastrContainerRegistry: NbToastrContainerRegistry;
  let overlayStub: any;
  let positionBuilder: any;
  let positionHelper: any;
  let containerStub: any;
  let documentStub: any;

  beforeEach(() => {
    containerStub = {

      attach() {
        return {
          location: {
            nativeElement: 'element',
          },
        }
      },
      dispose() {},
      hostElement: {
        classList: {
          add() {},
        },
      },
    };

    overlayStub = {
      create() {
        return containerStub;
      },
    };

    positionBuilder = {
      global() {
        return {
          position() {
          },
        }
      },
    };

    positionHelper = {
      toLogicalPosition(position) {
        return position;
      },
    };

    documentStub = {
      _contains: true,

      body: {
        contains: () => {
          return documentStub._contains;
        },
      },
    }
  });

  beforeEach(() => {
    const cfr = TestBed.configureTestingModule({
      imports: [NbToastrModule.forRoot()],
    }).get(ComponentFactoryResolver);

    toastrContainerRegistry = new NbToastrContainerRegistry(
      overlayStub,
      positionBuilder,
      positionHelper,
      cfr,
      documentStub,
    );
  });

  it('should create new container if not exists for requested position', () => {
    const overlayCreateSpy = spyOn(overlayStub, 'create').and.returnValue(containerStub);

    toastrContainerRegistry.get(NbGlobalLogicalPosition.BOTTOM_START);

    expect(overlayCreateSpy).toHaveBeenCalled();
  });

  it('should return existing container if same position called twice', () => {
    const overlayCreateSpy = spyOn(overlayStub, 'create').and.returnValue(containerStub);

    toastrContainerRegistry.get(NbGlobalLogicalPosition.BOTTOM_START);
    toastrContainerRegistry.get(NbGlobalLogicalPosition.BOTTOM_START);

    expect(overlayCreateSpy).toHaveBeenCalledTimes(1);
  });


  it('should re-create when unattached from document', () => {
    const overlayCreateSpy = spyOn(overlayStub, 'create').and.returnValue(containerStub);

    toastrContainerRegistry.get(NbGlobalLogicalPosition.BOTTOM_START);
    documentStub._contains = false;
    toastrContainerRegistry.get(NbGlobalLogicalPosition.BOTTOM_START);

    expect(overlayCreateSpy).toHaveBeenCalledTimes(2);
  });

  it('should return the same position for top-end and top-right when ltr', () => {
    spyOn(positionHelper, 'toLogicalPosition')
      .and.returnValue(NbGlobalLogicalPosition.TOP_END);

    const topEnd = toastrContainerRegistry.get(NbGlobalLogicalPosition.TOP_END);
    const topRight = toastrContainerRegistry.get(NbGlobalPhysicalPosition.TOP_RIGHT);

    expect(topEnd).toBe(topRight);
  });

  it('should dispose overlay before replacing with new one', () => {
    toastrContainerRegistry.get(NbGlobalLogicalPosition.TOP_END);

    const overlayDisposeSpy = spyOn(containerStub, 'dispose');
    documentStub._contains = false;
    toastrContainerRegistry.get(NbGlobalLogicalPosition.TOP_END);

    expect(overlayDisposeSpy).toHaveBeenCalledTimes(1);
  });
});

describe('toastr-container', () => {
  let toastrContainer: NbToastContainer;
  let containerRefStub: any;
  let positionHelperStub: any;

  beforeEach(() => {
    positionHelperStub = {
      isTopPosition() {
        return true;
      },
    };

    containerRefStub = {
      instance: {
        toasts: [],
      },
      changeDetectorRef: {
        detectChanges() {},
      },
    };
  });

  beforeEach(() => {
    toastrContainer = new NbToastContainer(<any> {}, containerRefStub, positionHelperStub);
  });

  it('should prevent duplicates if previous toast is the same', () => {
    const toast1 = {
      title: 'toast1',
      message: 'message',
      config: { status: 'dander', preventDuplicates: true, duplicatesBehaviour: 'previous' },
    };

    const toast2 = Object.assign({}, toast1, {title: 'toast2'});

    toastrContainer.attach(<NbToast> toast1);
    toastrContainer.attach(<NbToast> toast2);
    const duplicateToast = toastrContainer.attach(<NbToast> toast2);

    expect(duplicateToast).toBeUndefined();
  });

  it('should prevent duplicates if existing toast is the same', () => {
    const toast1 = {
      title: 'toast1',
      message: 'message',
      config: { status: 'dander', preventDuplicates: true, duplicatesBehaviour: 'all' },
    };

    const toast2 = Object.assign({}, toast1, {title: 'toast2'});

    toastrContainer.attach(<NbToast> toast1);
    toastrContainer.attach(<NbToast> toast2);
    const duplicateToast = toastrContainer.attach(<NbToast> toast1);

    expect(duplicateToast).toBeUndefined();
  });

  describe('if limit set', () => {

    const toast1 = {
      title: 'toast1',
      config: { limit: 3 },
    };

    const toast2 = Object.assign({}, toast1, {title: 'toast2'});
    const toast3 = Object.assign({}, toast1, {title: 'toast3'});
    const toast4 = Object.assign({}, toast1, {title: 'toast4'});

    function attachToasts() {
      toastrContainer.attach(<NbToast> toast1);
      toastrContainer.attach(<NbToast> toast2);
      toastrContainer.attach(<NbToast> toast3);
      toastrContainer.attach(<NbToast> toast4);
    }

    it('should remove the first toast in container in top position', () => {
      attachToasts();
      expect(containerRefStub.instance.content.length).toEqual(3);
      expect(containerRefStub.instance.content[0]).toEqual(toast4);
      expect(containerRefStub.instance.content[1]).toEqual(toast3);
      expect(containerRefStub.instance.content[2]).toEqual(toast2);
    });
    it('should remove the last toast in container in bottom position', () => {
      positionHelperStub = {
        isTopPosition() {
          return false;
        },
      };

      toastrContainer = new NbToastContainer(<any> {}, containerRefStub, positionHelperStub);

      attachToasts();
      expect(containerRefStub.instance.content.length).toEqual(3);
      expect(containerRefStub.instance.content[0]).toEqual(toast2);
      expect(containerRefStub.instance.content[1]).toEqual(toast3);
      expect(containerRefStub.instance.content[2]).toEqual(toast4);
    });
  });
});
