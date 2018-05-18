import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NB_WINDOW } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { filter, publish, refCount } from 'rxjs/operators';
import { NgdTocElement, NgdTocStateService } from '../../services';

@Directive({
  // tslint:disable-next-line
  selector: '[ngdFragment]',
})
export class NgdFragmentTargetDirective implements OnInit, OnDestroy, NgdTocElement {

  @Input() ngdFragment: string;

  private inView = false;
  private alive = true;
  private readonly marginFromTop = 120;

  get fragment(): string {
    return this.ngdFragment;
  }

  get element(): any {
    return this.elementRef.nativeElement;
  }

  get y(): number {
    return this.element.getBoundingClientRect().y;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(NB_WINDOW) private window,
    private tocState: NgdTocStateService,
    private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.tocState.add(this);

    this.activatedRoute.fragment
      .pipe(
        publish(null),
        refCount(),
        takeWhile(() => this.alive),
        filter(() => !this.inView),
      )
      .subscribe((fragment: string) => {
        if (fragment && this.fragment === fragment) {
          this.setInView(true);
          this.window.scrollTo(0, this.elementRef.nativeElement.offsetTop - this.marginFromTop);
        }
      });
  }

  setInView(val: boolean) {
    this.inView = val;
  }

  ngOnDestroy() {
    this.alive = false;
    this.tocState.remove(this);
  }
}
