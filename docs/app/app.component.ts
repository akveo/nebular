/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'ngd-app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NgdAppComponent {

  // private fragmentSubscription: Subscription;
  //
  //
  // constructor(@Inject(NB_WINDOW) private window,
  //             private docsService: DocsService,
  //             private router: Router,
  //             private route: ActivatedRoute,
  //             private elementRef: ElementRef,
  //             private analytics: Analytics) {
  // }
  //
  // ngOnInit(): void {
  //   this.analytics.trackPageViews();
  // }

  // // TODO: refactor this
  // ngAfterViewInit() {
  //   // this.fragmentSubscription = this.route.fragment
  //   //   .merge(this.docsService.onFragmentClick())
  //   //   .delay(1)
  //   //   .subscribe(fr => this.processFragment(fr));
  // }

  // processFragment(fr) {
  //   if (fr) {
  //     const el = this.elementRef.nativeElement.querySelector(`#${fr}`);
  //     if (el) {
  //       el.scrollIntoView();
  //       if (new RegExp(/themes/i).test(this.router.url)) {
  //         this.window.scrollBy(0, -235); // header + theme-header
  //       } else {
  //         this.window.scrollBy(0, -80);
  //       }
  //     }
  //   } else {
  //     this.window.scrollTo(0, 0);
  //   }
  // }

  // ngOnDestroy() {
  //   // this.fragmentSubscription.unsubscribe();
  // }
}
