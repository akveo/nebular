import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbTagComponent } from './tag.component';

describe('TagComponent', () => {
  let component: NbTagComponent;
  let fixture: ComponentFixture<NbTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbTagComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
