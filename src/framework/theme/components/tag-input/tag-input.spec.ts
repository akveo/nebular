import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbThemeModule, NbTagInputModule, NbTagInputComponent } from '@nebular/theme'
import { By } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import createSpy = jasmine.createSpy;


describe('Component: NbTagInput', () => {

  let taginput: NbTagInputComponent;
  let fixture: ComponentFixture<NbTagInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot(), NbEvaIconsModule, NbIconModule, NbTagInputModule],
    });

    fixture = TestBed.createComponent(NbTagInputComponent);
    taginput = fixture.componentInstance;
  });

  it('Setting disabled to true disables taginput', fakeAsync(() => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.disabled = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginput.tagInputInput.form.controls.tag.disabled).toBeTruthy();
    expect(taginputinputElement.classes['tag-input-disabled']).toBeTruthy();
    expect(taginputinputtagElement.classes['tag-input-tag-disabled']).toBeTruthy();
  }));

  it('Setting allowDuplicate to true allows duplicate tags', () => {
    taginput.tags = ['Java', 'Python', 'C#', 'Python'];
    taginput.allowDuplicate = true;
    fixture.detectChanges();
    expect(taginput.tags).toEqual(['Java', 'Python', 'C#', 'Python']);
  });

  it('Setting allowDuplicate to false does not allow duplicate tags', () => {
    taginput.tags = ['Java', 'Python', 'C#', 'Python'];
    taginput.allowDuplicate = false;
    fixture.detectChanges();
    expect(taginput.tags).toEqual(['Java', 'Python', 'C#']);
  });

  it('Setting status to basic apply corresponding class to host element', () => {
    taginput.status = 'basic';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    expect(taginputinputElement.classes['status-basic']).toBeTruthy();
  });

  it('Setting status to primary apply corresponding class to host element', () => {
    taginput.status = 'primary';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    expect(taginputinputElement.classes['status-primary']).toBeTruthy();
  });

  it('Setting status to success apply corresponding class to host element', () => {
    taginput.status = 'success';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    expect(taginputinputElement.classes['status-success']).toBeTruthy();
  });

  it('Setting status to info apply corresponding class to host element', () => {
    taginput.status = 'info';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    expect(taginputinputElement.classes['status-info']).toBeTruthy();
  });

  it('Setting status to warning apply corresponding class to host element', () => {
    taginput.status = 'warning';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    expect(taginputinputElement.classes['status-warning']).toBeTruthy();
  });

  it('Setting status to danger apply corresponding class to host element', () => {
    taginput.status = 'danger';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    expect(taginputinputElement.classes['status-danger']).toBeTruthy();
  });

  it('Setting tag status to basic apply corresponding class to tag element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.tagStatus = 'basic';
    fixture.detectChanges();
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputtagElement.classes['status-basic']).toBeTruthy();
  });

  it('Setting tag status to primary apply corresponding class to tag element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.tagStatus = 'primary';
    fixture.detectChanges();
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputtagElement.classes['status-primary']).toBeTruthy();
  });

  it('Setting tag status to success apply corresponding class to tag element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.tagStatus = 'success';
    fixture.detectChanges();
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputtagElement.classes['status-success']).toBeTruthy();
  });

  it('Setting tag status to info apply corresponding class to tag element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.tagStatus = 'info';
    fixture.detectChanges();
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputtagElement.classes['status-info']).toBeTruthy();
  });

  it('Setting tag status to warning apply corresponding class to tag element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.tagStatus = 'warning';
    fixture.detectChanges();
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputtagElement.classes['status-warning']).toBeTruthy();
  });

  it('Setting tag status to danger apply corresponding class to tag element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.tagStatus = 'danger';
    fixture.detectChanges();
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputtagElement.classes['status-danger']).toBeTruthy();
  });

  it('Setting size to tiny apply corresponding class to host and tag elements', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.fieldSize = 'tiny';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputElement.classes['size-tiny']).toBeTruthy();
    expect(taginputinputtagElement.classes['size-tiny']).toBeTruthy();
  });

  it('Setting size to small apply corresponding class to host and tag elements', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.fieldSize = 'small';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputElement.classes['size-small']).toBeTruthy();
    expect(taginputinputtagElement.classes['size-small']).toBeTruthy();
  });

  it('Setting size to medium apply corresponding class to host and tag elements', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.fieldSize = 'medium';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputElement.classes['size-medium']).toBeTruthy();
    expect(taginputinputtagElement.classes['size-medium']).toBeTruthy();
  });

  it('Setting size to large apply corresponding class to host and tag elements', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.fieldSize = 'large';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputElement.classes['size-large']).toBeTruthy();
    expect(taginputinputtagElement.classes['size-large']).toBeTruthy();
  });

  it('Setting size to giant apply corresponding class to host and tag elements', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.fieldSize = 'giant';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputElement.classes['size-giant']).toBeTruthy();
    expect(taginputinputtagElement.classes['size-giant']).toBeTruthy();
  });

  it('Setting shape to rectangle apply corresponding class to host element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.shape = 'rectangle';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    expect(taginputinputElement.classes['shape-rectangle']).toBeTruthy();
  });

  it('Setting shape to semi-round apply corresponding class to host element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.shape = 'semi-round';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    expect(taginputinputElement.classes['shape-semi-round']).toBeTruthy();
  });

  it('Setting shape to round apply corresponding class to host element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.shape = 'round';
    fixture.detectChanges();
    const taginputinputElement = fixture.debugElement.query(By.css('nb-tag-input-input'));
    expect(taginputinputElement.classes['shape-round']).toBeTruthy();
  });

  it('Setting tag shape to rectangle apply corresponding class to tag element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.tagShape = 'rectangle';
    fixture.detectChanges();
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputtagElement.classes['shape-rectangle']).toBeTruthy();
  });

  it('Setting tag shape to semi-round apply corresponding class to tag element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.tagShape = 'semi-round';
    fixture.detectChanges();
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputtagElement.classes['shape-semi-round']).toBeTruthy();
  });

  it('Setting tag shape to round apply corresponding class to tag element', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    taginput.tagShape = 'round';
    fixture.detectChanges();
    const taginputinputtagElement = fixture.debugElement.queryAll(By.css('nb-tag-input-tag'))[0];
    expect(taginputinputtagElement.classes['shape-round']).toBeTruthy();
  });

  it('Setting maxTags to 5 limits the maximum tag number to 5', () => {
    taginput.tags = ['Java', 'Python', 'C#', 'Go', 'Kotlin', 'C++'];
    taginput.maxTags = 5;
    fixture.detectChanges();

    const taginputinputElement = taginput.tagInputInput.tagInputElementRef.nativeElement;
    expect(taginput.tags).toEqual(['Java', 'Python', 'C#', 'Go', 'Kotlin']);
    expect(taginputinputElement.attributes.hasOwnProperty('disabled'));
  });

  it('Setting validators for validating tags when adding', () => {
    taginput.validators = [Validators.maxLength(5)];
    fixture.detectChanges();

    taginput.tagInputInput.form.controls.tag.setValue('Javascript');
    fixture.detectChanges();
    expect(taginput.tagInputInput.form.valid).toBeFalsy();
    expect(taginput.tagInputInput.form.controls.tag.valid).toBeFalsy();
  });

  it('Should emit tagAdded when a tag is added', () => {
    fixture.detectChanges();
    const tagAddedSpy = createSpy('tagAddedSpy');
    taginput.tagAdded.subscribe(tagAddedSpy);

    taginput.tagInputInput.form.controls.tag.setValue('Java');
    fixture.detectChanges();
    const keyboardEvent = new KeyboardEvent('keydown', {
      code: 'Enter',
      key: 'Enter',
    });
    taginput.tagInputInput.tagInputElementRef.nativeElement.dispatchEvent(keyboardEvent);

    expect(tagAddedSpy).toHaveBeenCalledWith('Java');
  });

  it('Should emit tagRemoved when a tag is removed', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    fixture.detectChanges();

    const tagRemovedSpy = createSpy('tagRemovedSpy');
    taginput.tagRemoved.subscribe(tagRemovedSpy);

    const removeIcon = fixture.debugElement.queryAll(By.css('nb-icon[icon="close-outline"]'))[1];
    removeIcon.nativeElement.dispatchEvent(new Event('click'));

    expect(tagRemovedSpy).toHaveBeenCalledWith({ index: 1, tag: 'Python' });
  });

  it('Should emit tagUpdated when a tag is updated', () => {
    taginput.tags = ['Java', 'Python', 'C#'];
    fixture.detectChanges();

    const tagUpdatedSpy = createSpy('tagUpdatedSpy');
    taginput.tagUpdated.subscribe(tagUpdatedSpy);

    const tag = taginput.tagInputInput.tags.toArray()[1];
    tag.toggleEditMode();
    fixture.detectChanges();
    const keyboardEvent = new KeyboardEvent('keydown', {
      code: 'Enter',
      key: 'Enter',
    });
    tag.elementRef.nativeElement.dispatchEvent(keyboardEvent);

    expect(tagUpdatedSpy).toHaveBeenCalledWith({ index: 1, tag: 'Python' });
  });

  it('Should emit textChanged when the text is changed in the new tag input', () => {
    fixture.detectChanges();

    const textChangedSpy = createSpy('textChangedSpy');
    taginput.textChanged.subscribe(textChangedSpy);

    taginput.tagInputInput.form.controls.tag.setValue('a');
    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    taginput.tagInputInput.tagInputElementRef.nativeElement.dispatchEvent(inputEvent);

    expect(textChangedSpy).toHaveBeenCalledWith('a');
  });
});
