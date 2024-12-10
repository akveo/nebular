import { Component } from '@angular/core';
import { NbLayoutScrollService, NbLayoutRulerService } from '@nebular/theme';

enum LayoutMode {
  WINDOW = 'window',
  LAYOUT = 'layout',
}

@Component({
  selector: 'npg-scroll-window',
  templateUrl: './scroll-window.component.html',
})
export class ScrollWindowComponent {
  mode = LayoutMode.WINDOW;
  text = 'Hello World! '.repeat(1024 * 10);

  constructor(private scroll: NbLayoutScrollService, private ruler: NbLayoutRulerService) {
    this.scroll.onScroll().subscribe((event) => console.info('Scroll', event));
  }

  changeMode() {
    this.mode = this.mode === LayoutMode.WINDOW ? LayoutMode.LAYOUT : LayoutMode.WINDOW;
  }

  scrollTo(x: number, y: number) {
    this.scroll.scrollTo(x, y);

    this.ruler.getDimensions().subscribe((position) => console.info('Content Dimensions', position));

    this.scroll.getPosition().subscribe((size) => console.info('Scroll Position', size));
  }
}
