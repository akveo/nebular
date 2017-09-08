import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Title } from '@angular/platform-browser';

import * as ImageComparison from 'image-comparison';
import 'style-loader!image-comparison/src/ImageComparison.css';

@Component({
  selector: 'ngd-homepage',
  templateUrl: 'homepage.component.html',
  styleUrls: ['homepage.component.scss'],
})
export class NgdHomepageComponent implements AfterViewInit, OnInit {

  private static BG_IMAGE_HEIGHT = 6720;

  @ViewChild('comparisonContainer') comparisonContainer: ElementRef;
  @ViewChildren('section') sections: QueryList<any>;
  @ViewChildren('comparisonImage') comparisonImages: QueryList<any>;

  slides = [
    {
      title: 'Nebular Dashboard',
      subTitle: 'IOT Admin dashboard',
      img: 'assets/images/theme-cosmic.png',
    },
    {
      title: 'Nebular Dashboard',
      subTitle: 'IOT Admin dashboard',
      img: 'assets/images/theme-default.png',
    },
  ];
  swiperConfig: any = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1,
    spaceBetween: 15,
  };
  leftMenu = [
    {
      title: 'Home',
      hash: 'home',
      active: false,
    },
    {
      title: 'UI Kit',
      hash: 'ui-kit',
      active: false,
    },
    {
      title: 'Theme System',
      hash: 'theme-system',
      active: false,
    },
    {
      title: 'Auth Module',
      hash: 'auth-module',
      active: false,
    },
    {
      title: 'Show Cases',
      hash: 'built-with',
      active: false,
    },
    {
      title: 'Support us',
      hash: 'support-us',
      active: false,
    },
    {
      title: 'Contact us',
      hash: 'contact-us',
      active: false,
    },
  ];

  bgTop = '';
  animated: boolean = false;

  constructor(private renderer: Renderer2,
              private titleService: Title) {
    this.renderer.setProperty(document.body, 'scrollTop', 0);
  }

  ngOnInit() {
    this.titleService.setTitle('Nebular - full featured front-end framework based on Angular.');
    setTimeout(() => this.animated = true, 500);
  }

  ngAfterViewInit() {
    this.createImageComparison();
    setTimeout(() => this.highlightMenu());
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.highlightMenu();
    this.calculateBgTopOffcet();
  }

  private createImageComparison(): any {
    return new ImageComparison({
      container: this.comparisonContainer.nativeElement,
      startPosition: 70,
      data: this.comparisonImages.map((element: any) => {
        return {
          image: element.nativeElement,
        }
      }),
    });
  }

  private highlightMenu() {
    let closestSection = this.sections.first.nativeElement;
    this.sections
      .map(section => section.nativeElement)
      .forEach((section) => {
        this.renderer.removeClass(section, 'current');
        if (Math.abs(section.getBoundingClientRect().top) < Math.abs(closestSection.getBoundingClientRect().top)) {
          closestSection = section;
        }
      });

    this.renderer.addClass(closestSection, 'current');
    this.leftMenu = this.leftMenu
      .map((item: any) => {
        item.active = item.hash === closestSection.id;
        return item;
      })
  }

  private calculateBgTopOffcet() {
    let bgScrollTop = window.pageYOffset / this.getScrollSpeedRatio();
    if (bgScrollTop > NgdHomepageComponent.BG_IMAGE_HEIGHT) {
      bgScrollTop = NgdHomepageComponent.BG_IMAGE_HEIGHT;
    }
    this.bgTop = -(bgScrollTop).toFixed(0) + 'px';
  }

  private getScrollSpeedRatio(): number {
    const body = document.body;
    const html = document.documentElement;
    const documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    return documentHeight / (NgdHomepageComponent.BG_IMAGE_HEIGHT - html.clientHeight);
  }
}
