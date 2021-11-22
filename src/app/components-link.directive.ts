import { ChangeDetectorRef, Directive, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { ComponentsListService } from './components-list.service';

@Directive({
  selector: '[npgComponentLink]',
})
export class ComponentLinkDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() npgComponentLink: string = '';

  @HostBinding('class.selected')
  selected = false;

  constructor(private componentsListService: ComponentsListService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.componentsListService.selectedLink$
      .pipe(
        map((selectedLink: string) => this.npgComponentLink === selectedLink),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((isSelected) => {
        this.selected = isSelected;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
