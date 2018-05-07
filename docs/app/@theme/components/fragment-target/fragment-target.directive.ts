import {Directive, ElementRef, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NB_WINDOW } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';

@Directive({
  // tslint:disable-next-line
  selector: '[id], a[name]',
})
export class NgdFragmentTargetDirective implements OnInit, OnDestroy {

  @Input() id: string;
  @Input() name: string;

  private alive = true;
  private readonly marginFromTop = 120;

  // I initialize the fragment-target directive.
  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(NB_WINDOW) private window,
    private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.activatedRoute.fragment
      .pipe(takeWhile(() => this.alive))
      .subscribe((fragment: string) => {
        if (fragment && [this.id, this.name].includes(fragment)) {
          this.window.scrollTo(0, this.elementRef.nativeElement.offsetTop - this.marginFromTop);
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
