import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators/takeWhile';

@Directive({
  // tslint:disable-next-line
  selector: '[id], a[name]',
})
export class NgdFragmentTargetDirective implements OnInit, OnDestroy {

  @Input() id: string;
  @Input() name: string;

  private alive = true;

  // I initialize the fragment-target directive.
  constructor(
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.activatedRoute.fragment
      .pipe(takeWhile(() => this.alive))
      .subscribe((fragment: string) => {
        if (fragment && [this.id, this.name].includes(fragment)) {

          this.elementRef.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
