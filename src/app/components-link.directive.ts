import { OnInit, ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { ComponentsListService } from './components-list.service';

@Directive({
    selector: '[npgComponentLink]',
    standalone: false
})
export class ComponentLinkDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() npgComponentLink: string = '';

  @HostBinding('class.selected')
  selected = false;

  constructor(
    private componentsListService: ComponentsListService,
    private cd: ChangeDetectorRef,
    private elementRef: ElementRef<Element>,
  ) {}

  ngOnInit() {
    let isFirstEmission = true;
    this.componentsListService.selectedLink$
      .pipe(
        map((selectedLink: string) => this.npgComponentLink === selectedLink),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((isSelected) => {
        this.selected = isSelected;
        this.cd.markForCheck();

        if (isFirstEmission) {
          isFirstEmission = false;
        } else {
          this.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
