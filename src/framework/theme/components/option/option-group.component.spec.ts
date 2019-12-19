import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NbLayoutModule,
  NbOptionComponent,
  NbOptionGroupComponent,
  NbSelectModule,
  NbSelectComponent,
  NbThemeModule,
} from '@nebular/theme';

@Component({
  template: `
    <nb-layout>
      <nb-layout-column>

        <nb-select [disabled]="selectDisabled">
          <nb-option-group [disabled]="optionGroupDisabled" [title]="optionGroupTitle">
            <nb-option *ngIf="showOption" [value]="1" [disabled]="optionDisabled">1</nb-option>
          </nb-option-group>
        </nb-select>

      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbOptionGroupTestComponent {
  selectDisabled = false;
  optionGroupDisabled = false;
  optionDisabled = false;
  showOption = true;
  optionGroupTitle = '';

  @ViewChild(NbSelectComponent, { static: false }) selectComponent: NbSelectComponent<number>;
  @ViewChild(NbOptionGroupComponent, { static: false }) optionGroupComponent: NbOptionGroupComponent;
  @ViewChild(NbOptionComponent, { static: false }) optionComponent: NbOptionComponent<number>;
}

describe('NbOptionGroupComponent', () => {
  let fixture: ComponentFixture<NbOptionGroupTestComponent>;
  let testComponent: NbOptionGroupTestComponent;
  let selectComponent: NbSelectComponent<number>;
  let optionGroupComponent: NbOptionGroupComponent;
  let optionComponent: NbOptionComponent<number>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbSelectModule,
      ],
      declarations: [ NbOptionGroupTestComponent ],
    });

    fixture = TestBed.createComponent(NbOptionGroupTestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
    flush();

    selectComponent = testComponent.selectComponent;
    optionGroupComponent = testComponent.optionGroupComponent;
    optionComponent = testComponent.optionComponent;
  }));

  it('should contain passed title', () => {
    const title = 'random option group title';
    selectComponent.show();
    testComponent.optionGroupTitle = title;
    fixture.detectChanges();

    const groupTitle = fixture.debugElement.query(By.directive(NbOptionGroupComponent))
      .query(By.css('.option-group-title'));

    expect(groupTitle.nativeElement.textContent).toEqual(title);
  });

  it('should have disabled attribute if disabled', () => {
    selectComponent.show();
    testComponent.optionGroupDisabled = true;
    fixture.detectChanges();

    const optionGroup = fixture.debugElement.query(By.directive(NbOptionGroupComponent));
    expect(optionGroup.attributes.disabled).toEqual('');
  });

  it('should remove disabled attribute if disabled set to false', () => {
    selectComponent.show();
    testComponent.optionGroupDisabled = true;
    fixture.detectChanges();

    testComponent.optionGroupDisabled = false;
    fixture.detectChanges();

    const optionGroup = fixture.debugElement.query(By.directive(NbOptionGroupComponent));
    expect(optionGroup.attributes.disabled).toEqual(null);
  });

  it('should disable group options if group disabled', () => {
    const setDisabledSpy = spyOn(optionComponent, 'setDisabledByGroupState');

    optionGroupComponent.disabled = true;
    fixture.detectChanges();

    expect(setDisabledSpy).toHaveBeenCalledTimes(1);
    expect(setDisabledSpy).toHaveBeenCalledWith(true);
  });

  it('should enable group options if group enabled', () => {
    testComponent.optionDisabled = true;
    fixture.detectChanges();

    expect(optionComponent.disabled).toEqual(true);

    const setDisabledSpy = spyOn(optionComponent, 'setDisabledByGroupState');
    optionGroupComponent.disabled = false;

    expect(setDisabledSpy).toHaveBeenCalledTimes(1);
    expect(setDisabledSpy).toHaveBeenCalledWith(false);
  });

  it('should update options state when options change', fakeAsync(() => {
    testComponent.optionGroupDisabled = true;
    testComponent.showOption = false;
    fixture.detectChanges();
    flush();

    testComponent.showOption = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();

    expect(optionComponent.disabledAttribute).toEqual('');
  }));

  it('should update options state after content initialisation', fakeAsync(() => {
    fixture = TestBed.createComponent(NbOptionGroupTestComponent);
    testComponent = fixture.componentInstance;
    testComponent.optionDisabled = true;
    fixture.detectChanges();
    flush();

    expect(testComponent.optionComponent.disabledAttribute).toEqual('');
  }));
});
