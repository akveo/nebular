import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NB_WINDOW } from '@nebular/theme';
import { takeWhile, filter, publish, refCount } from 'rxjs/operators';
import { NgdTocElement, NgdTocStateService } from '../../services';
import { delay } from 'rxjs/internal/operators';

@Directive({
  // tslint:disable-next-line
  selector: '[ngdFragment]',
})
export class NgdFragmentTargetDirective implements OnInit, OnDestroy, NgdTocElement {
  @Input() ngdFragment: string;
  @Input() ngdFragmentClass: string;
  @Input() ngdFragmentSync: boolean = true;

  private inView = false;
  private alive = true;
  private readonly marginFromTop = 120;

  get fragment(): string {
    return this.ngdFragment;
  }

  get element(): any {
    return this.el.nativeElement;
  }

  get y(): number {
    return this.element.getBoundingClientRect().y;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(NB_WINDOW) private window,
    private tocState: NgdTocStateService,
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.ngdFragmentSync && this.tocState.add(this);

    this.activatedRoute.fragment
      .pipe(publish(null), refCount(), takeWhile(() => this.alive), delay(10))
      .subscribe((fragment: string) => {
        if (fragment && this.fragment === fragment && !this.inView) {
          this.selectFragment();
        } else {
          this.deselectFragment();
        }
      });
  }

  selectFragment() {
    this.ngdFragmentClass && this.renderer.addClass(this.el.nativeElement, this.ngdFragmentClass);
    this.setInView(true);
    this.window.scrollTo(0, this.el.nativeElement.offsetTop - this.marginFromTop);
  }

  deselectFragment() {
    this.renderer.removeClass(this.el.nativeElement, this.ngdFragmentClass);
  }

  setInView(val: boolean) {
    this.inView = val;
  }

  ngOnDestroy() {
    this.alive = false;
    this.ngdFragmentSync && this.tocState.remove(this);
  }
}
