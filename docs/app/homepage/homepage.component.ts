import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ngd-homepage',
  templateUrl: 'homepage.component.html',
  styleUrls: ['homepage.component.scss'],
})
export class NgdHomepageComponent implements AfterViewInit, OnInit {
  constructor(private renderer: Renderer2,
              private titleServise: Title) {
    this.renderer.setProperty(document.body, 'scrollTop', 0);
  }

  transparentHeader: boolean = true;

  ngOnInit() {
    this.titleServise.setTitle('NGA docs');
  }

  ngAfterViewInit() {
    Observable.fromEvent(window, 'scroll')
      .subscribe(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.transparentHeader = scrollTop === 0;
      });
  }
}
