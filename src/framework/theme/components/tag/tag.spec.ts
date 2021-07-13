import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbTagComponent, NbTagModule, NbThemeModule } from '@nebular/theme';
import createSpy = jasmine.createSpy;

@Component({
    selector: 'nb-tag-test',
    template: `<nb-tag [text]="'test-tag'" [removable]="isRemovable" [selected]="selected"></nb-tag>`,
})

export class NbTagTestComponent {
    @ViewChild(NbTagComponent) nbTag: NbTagComponent;
    isRemovable: boolean = true;
    selected: boolean = false;
}

describe('Component: NbTagComponent', () => {
    let tag: NbTagComponent;
    let fixture: ComponentFixture<NbTagComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NbThemeModule.forRoot(), NbTagModule],
            declarations: [NbTagTestComponent],
        });

        fixture = TestBed.createComponent(NbTagComponent);
        tag = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(tag).toBeTruthy();
    })

    it('should return default selected property', () => {
        expect(fixture.nativeElement.classList).not.toContain('selected');
    });

    it('should return toggled selection value', () => {
        tag._toggleSelection();
        fixture.detectChanges();
        expect(fixture.nativeElement.classList).toContain('selected');
    });

    it('should be inactive by default', () => {
        expect(fixture.nativeElement.classList).not.toContain('active');
    });

    it('should be active', () => {
        tag.setActiveStyles();
        fixture.detectChanges();
        expect(fixture.nativeElement.classList).toContain('active');
    });

    it('should return applied inactive state', () => {
        tag.setInactiveStyles();
        fixture.detectChanges();
        expect(fixture.nativeElement.classList).not.toContain('active');
    });

});

describe('Component: NbTagComponent bindings', () => {
    let fixture: ComponentFixture<NbTagTestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NbThemeModule.forRoot(), NbTagModule],
            declarations: [NbTagTestComponent],
        });
        fixture = TestBed.createComponent(NbTagTestComponent);
        fixture.detectChanges();
    });

    it('should be created', () => {
        const tagEl = fixture.nativeElement.querySelector('nb-tag');
        expect(tagEl).toBeTruthy();
    });

    it('should emit remove event on delete keydown', () => {
        const removeSpy = createSpy('removeSpy');
        const tagEl = fixture.nativeElement.querySelector('nb-tag');
        fixture.componentInstance.nbTag.remove.subscribe(removeSpy);
        tagEl.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'delete' }));
        expect(removeSpy).toHaveBeenCalled();
    });

    it('should not emit remove event on delete keydown', () => {
        const removeSpy = createSpy('removeSpy');
        const tagEl = fixture.nativeElement.querySelector('nb-tag');
        fixture.componentInstance.nbTag.remove.subscribe(removeSpy);
        fixture.componentInstance.isRemovable = false;
        fixture.detectChanges();
        tagEl.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'delete' }));
        expect(removeSpy).not.toHaveBeenCalled();
    });

    it('should emit remove event on backspace keydown', () => {
        const removeSpy = createSpy('removeSpy');
        const tagEl = fixture.nativeElement.querySelector('nb-tag');
        fixture.componentInstance.nbTag.remove.subscribe(removeSpy);
        tagEl.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'backspace' }));
        expect(removeSpy).toHaveBeenCalled();
    });

    it('should not emit remove event on backspace keydown', () => {
        const removeSpy = createSpy('removeSpy');
        const tagEl = fixture.nativeElement.querySelector('nb-tag');
        fixture.componentInstance.nbTag.remove.subscribe(removeSpy);
        fixture.componentInstance.isRemovable = false;
        fixture.detectChanges();
        tagEl.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'backspace' }));
        expect(removeSpy).not.toHaveBeenCalled();
    });

    it('should emit selected change event', () => {
        const selectedSpy = createSpy('selected');
        fixture.componentInstance.nbTag.selectedChange.subscribe(selectedSpy);
        fixture.componentInstance.selected = true;
        fixture.detectChanges();
        expect(selectedSpy).toHaveBeenCalled();
    });

});
