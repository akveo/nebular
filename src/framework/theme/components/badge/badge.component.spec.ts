import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbBadgeComponent, NbBadgeModule, NbBadgePosition, NbComponentStatus } from '@nebular/theme';

describe('NbBadgeComponent', () => {
  let fixture: ComponentFixture<NbBadgeComponent>;
  let badgeComponent: NbBadgeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NbBadgeModule ],
    });

    fixture = TestBed.createComponent(NbBadgeComponent);
    badgeComponent = fixture.componentInstance;
  });

  it(`should contain text set to 'text' input`, () => {
    const text = 'random badge text';
    badgeComponent.text = text;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toEqual(text);
  });

  it('should has primary status by default', () => {
    expect(badgeComponent.status).toEqual('primary');
  });

  it('should set status class', () => {
    const statuses: NbComponentStatus[] = [ 'primary', 'success', 'info', 'warning', 'danger' ];

    for (const status of statuses) {
      badgeComponent.status = status;
      fixture.detectChanges();

      expect(fixture.debugElement.classes[`status-${status}`]).toEqual(true);
    }
  });

  it(`should has 'top' class if position contains 'top'`, () => {
    const topPositions: NbBadgePosition[] = [ 'top end', 'top left', 'top right', 'top start' ];

    for (const position of topPositions) {
      badgeComponent.position = position;
      fixture.detectChanges();

      expect(badgeComponent.top).toEqual(true);
      expect(fixture.debugElement.classes['position-top']).toEqual(true);
    }
  });

  it(`should has 'right' class if position contains 'right'`, () => {
    const rightPositions: NbBadgePosition[] = [ 'top right', 'bottom right' ];

    for (const position of rightPositions) {
      badgeComponent.position = position;
      fixture.detectChanges();

      expect(badgeComponent.right).toEqual(true);
      expect(fixture.debugElement.classes['position-right']).toEqual(true);
    }
  });

  it(`should has 'bottom' class if position contains 'bottom'`, () => {
    const bottomPositions: NbBadgePosition[] = [ 'bottom end', 'bottom left', 'bottom right', 'bottom start' ];

    for (const position of bottomPositions) {
      badgeComponent.position = position;
      fixture.detectChanges();

      expect(badgeComponent.bottom).toEqual(true);
      expect(fixture.debugElement.classes['position-bottom']).toEqual(true);
    }
  });

  it(`should has 'left' class if position contains 'left'`, () => {
    const leftPositions: NbBadgePosition[] = [ 'top left', 'bottom left' ];

    for (const position of leftPositions) {
      badgeComponent.position = position;
      fixture.detectChanges();

      expect(badgeComponent.left).toEqual(true);
      expect(fixture.debugElement.classes['position-left']).toEqual(true);
    }
  });

  it(`should has 'start' class if position contains 'start'`, () => {
    const startPositions: NbBadgePosition[] = [ 'top start', 'bottom start' ];

    for (const position of startPositions) {
      badgeComponent.position = position;
      fixture.detectChanges();

      expect(badgeComponent.start).toEqual(true);
      expect(fixture.debugElement.classes['position-start']).toEqual(true);
    }
  });

  it(`should has 'end' class if position contains 'end'`, () => {
    const endPositions: NbBadgePosition[] = [ 'top end', 'bottom end' ];

    for (const position of endPositions) {
      badgeComponent.position = position;
      fixture.detectChanges();

      expect(badgeComponent.end).toEqual(true);
      expect(fixture.debugElement.classes['position-end']).toEqual(true);
    }
  });
});
