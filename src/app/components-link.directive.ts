import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentsListSearchService } from './components-list.service';

@Directive({
  selector: '[npgComponentLink]',
})
export class ComponentLinkDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @Input() npgComponentLink: string | any[] = '';

  constructor(
    private componentsListSearchService: ComponentsListSearchService,
    private renderer: Renderer2,
    private hostElement: ElementRef,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.componentsListSearchService.flatFilteredComponentLinkList$,
      this.componentsListSearchService.activeElementIndex$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([flatArray, index]) => {
        const componentLink = flatArray[index]?.link;
        if (this.npgComponentLink === componentLink) {
          this.renderer.addClass(this.hostElement.nativeElement, 'selected');
        } else {
          this.renderer.removeClass(this.hostElement.nativeElement, 'selected');
        }
        this.componentsListSearchService.selectedElement$.next(componentLink);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
