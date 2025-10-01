import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { NB_DOCUMENT, NB_WINDOW } from '@nebular/theme';

@Component({
  selector: 'ngd-akveo-services-banner',
  template: `
    <span #wrapper class="hs-cta-wrapper" id="hs-cta-wrapper-{{ ctaId }}">
      <span class="hs-cta-node hs-cta-{{ ctaId }}" id="hs-cta-{{ ctaId }}">
        <a href="https://cta-redirect.hubspot.com/cta/redirect/2452262/{{ ctaId }}" target="_blank">
          <img
            class="hs-cta-img"
            id="hs-cta-img-{{ ctaId }}"
            [height]="height"
            [width]="width"
            src="https://no-cache.hubspot.com/cta/default/2452262/{{ ctaId }}.png"
            alt="Services on Angular"
          />
        </a>
      </span>
    </span>
  `,
  styleUrls: ['akveo-services-banner.component.scss'],
  standalone: false,
})
export class AkveoServicesBannerComponent implements OnInit {
  @Input() ctaId: string;

  @Input() width: string;

  @Input() height: string;

  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;

  constructor(@Inject(NB_DOCUMENT) private document, @Inject(NB_WINDOW) private window) {}

  ngOnInit() {
    if (this.window?.hbspt?.cta?.load) {
      this.loadCta();
    } else {
      this.loadHubSpotCtaScript();
    }
  }

  private loadCta() {
    this.window.hbspt.cta.load(2452262, this.ctaId, {});
  }

  private loadHubSpotCtaScript() {
    this.wrapper.nativeElement.appendChild(
      this.document
        .createRange()
        .createContextualFragment(`<script type="text/javascript" src="https://js.hscta.net/cta/current.js"></script>`),
    );
    this.wrapper.nativeElement.querySelector('script').onload = this.loadCta.bind(this);
  }
}
