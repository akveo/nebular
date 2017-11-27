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
import { Subject } from 'rxjs/Rx';
import { NbSpinnerService } from '@nebular/theme';

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
      subTitle: 'IOT Admin Dashboard',
      img: 'assets/images/theme-cosmic.png',
      url: 'http://akveo.com/ngx-admin?utm_source=nebular_documentation&utm_medium=demo_slider',
    },
    {
      title: 'React Native UI Kitten',
      subTitle: 'Documentation Website',
      img: 'assets/images/react-kitten.png',
      url: 'https://akveo.github.io/react-native-ui-kitten',
    },
  ];
  swiperConfig: any = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1,
    spaceBetween: 15,
    loop: false, // breaks the layout on smaller devices
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
  currentSectionId: string = 'home';
  highlightMenu$ = new Subject();

  constructor(private renderer: Renderer2,
              private spinnerService: NbSpinnerService,
              private titleService: Title) {
    this.renderer.setProperty(document.body, 'scrollTop', 0);

    this.highlightMenu();
    this.spinnerService.registerLoader(Promise.all([
      this.loadImage('assets/images/theme-cosmic.png'),
      this.loadImage('assets/images/theme-default.png'),
      this.loadImage('assets/images/hero-img-static.png'),
      this.loadImage('assets/images/hero-img/1-2.png'),
      this.loadImage('assets/images/hero-img/3-4.png'),
      this.loadImage('assets/images/hero-img/5-6.png'),
      this.loadImage('assets/images/hero-img/7.png'),
      this.loadImage('assets/images/hero-img/8.png'),
      this.loadImage('assets/images/hero-img/9.png'),
    ]).then(() => {
      setTimeout(() => this.animated = true, 500);
    }));
  }

  ngOnInit() {
    this.titleService.setTitle('Nebular - full-featured framework based on Angular.');
  }

  ngAfterViewInit() {
    this.createImageComparison();
    setTimeout(() => this.highlightMenu$.next(0));
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    this.calculateBgTopOffcet();
    this.highlightMenu$.next(1);
  }

  private createImageComparison(): any {
    const comparison = new ImageComparison({
      container: this.comparisonContainer.nativeElement,
      startPosition: 70,
      data: this.comparisonImages.map((element: any) => {
        return {
          image: element.nativeElement,
        }
      }),
    });

    comparison._setImageSize();
  }

  private highlightMenu() {
    this.highlightMenu$
      .debounceTime(30)
      .subscribe(() => {
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
          });
        this.currentSectionId = closestSection.id;
      });
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

  private loadImage(src): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = function () {
        resolve(src);
      };
    });
  }
}
