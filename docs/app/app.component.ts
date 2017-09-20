/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import 'style-loader!./styles/styles.scss';
import { Subscription } from 'rxjs/Subscription';
import { DocsService } from './docs/docs.service';
import { Analytics } from './docs/utils/analytics.service';

@Component({
  selector: 'ngd-app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NgdAppComponent implements AfterViewInit, OnDestroy, OnInit {

  private fragmentSubscription: Subscription;


  constructor(private service: DocsService,
              private router: Router,
              private route: ActivatedRoute,
              private elementRef: ElementRef,
              private analytics: Analytics,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }

  // TODO: refactor this
  ngAfterViewInit() {
    this.fragmentSubscription = this.route.fragment
      .merge(this.service.onFragmentClick())
      .delay(1)
      .subscribe(fr => this.processFragment(fr));
  }

  processFragment(fr) {
    if (fr) {
      const el = this.elementRef.nativeElement.querySelector(`#${fr}`);
      if (el) {
        el.scrollIntoView();
        if (new RegExp(/themes/i).test(this.router.url)) {
          window.scrollBy(0, -235);//header + theme-header
          this.renderer.addClass(el, 'highlighted-row');//TODO: move to theme block
          setTimeout(() => this.renderer.removeClass(el, 'highlighted-row'), 1000);
        } else {
          window.scrollBy(0, -80);
        }
      }
    } else {
      window.scrollTo(0, 0);
    }
  }

  ngOnDestroy() {
    this.fragmentSubscription.unsubscribe();
  }
}
