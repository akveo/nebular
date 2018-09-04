import { NbToastrService } from './toastr.service';
import { NbGlobalLogicalPosition } from '../cdk';
import { NbToastStatus } from './model';


describe('toastr-service', () => {
  let toastr: NbToastrService;
  let containerStub;
  let containerRegistryStub;

  beforeEach(() => {
    containerStub = {
      attach() {
      },
    };
    containerRegistryStub = {
      get() {
        return containerStub;
      },
    };
    toastr = new NbToastrService({}, <any> containerRegistryStub);
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
    const [message, title, { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.SUCCESS);
  });

  it('should call show with info status when info called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.info('');

    expect(toastrSpy).toHaveBeenCalled();
    const [message, title, { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.INFO);
  });

  it('should call show with warning status when warning called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.warning('');

    expect(toastrSpy).toHaveBeenCalled();
    const [message, title, { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.WARNING);
  });

  it('should call show with primary status when primary called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.primary('');

    expect(toastrSpy).toHaveBeenCalled();
    const [message, title, { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.PRIMARY);
  });

  it('should call show with danger status when danger called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.danger('');

    expect(toastrSpy).toHaveBeenCalled();
    const [message, title, { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.DANGER);
  });

  it('should call show with default status when default called', () => {
    const toastrSpy = spyOn(toastr, 'show');

    toastr.default('');

    expect(toastrSpy).toHaveBeenCalled();
    const [message, title, { status }] = toastrSpy.calls.allArgs()[0];
    expect(status).toBe(NbToastStatus.DEFAULT);
  });
});

