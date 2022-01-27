import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationShowcaseComponent } from './pagination-showcase.component';

describe('PaginationShowcaseComponent', () => {
  let component: PaginationShowcaseComponent;
  let fixture: ComponentFixture<PaginationShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationShowcaseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
