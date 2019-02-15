import { NbToastrContainerRegistry, NbToastrService } from './toastr.service';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition } from '../cdk';
import { NbToastStatus } from './model';
import { TestBed } from '@angular/core/testing';
import { ComponentFactoryResolver } from '@angular/core';
import { NbToastrModule } from '@nebular/theme';


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
    });

    expect(attachSpy).toHaveBeenCalled();
    const [[{ config }]] = attachSpy.calls.allArgs();
    expect(config.position).toBe(NbGlobalLogicalPosition.BOTTOM_START, 'incorrect position');
    expect(config.status).toBe(NbToastStatus.PRIMARY, 'incorrect status');
    expect(config.duration).toBe(1234, 'incorrect duration');
    expect(config.destroyByClick).toBe(true, 'incorrect destroyByClick');
    expect(config.preventDuplicates).toBe(true, 'incorrect preventDuplicates');
    expect(config.hasIcon).toBe(true, 'incorrect hasIcon');
  });

  it('should call show with success status when success called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.success('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.SUCCESS);
  });

  it('should call show with info status when info called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.info('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.INFO);
  });

  it('should call show with warning status when warning called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.warning('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.WARNING);
  });

  it('should call show with primary status when primary called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.primary('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.PRIMARY);
  });

  it('should call show with danger status when danger called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.danger('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.DANGER);
  });

  it('should call show with default status when default called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.default('');

    expect(toastrSpy).toHaveBeenCalled();
    const [, , { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.DEFAULT);
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

      contains: () => {
        return documentStub._contains;
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
});
