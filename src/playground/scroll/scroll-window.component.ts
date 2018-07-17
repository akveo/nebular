import { Component } from '@angular/core';
import { NbLayoutScrollService, NbRulerService } from '@nebular/theme';

enum LayoutMode {
  WINDOW = 'window',
  LAYOUT = 'layout',
}

@Component({
  selector: 'nb-scroll-window',
  templateUrl: './scroll-window.component.html',
})
export class NbScrollWindowComponent {

  mode = LayoutMode.WINDOW;
  text = 'Hello World! '.repeat(1024 * 10);

  constructor(private scroll: NbLayoutScrollService, private ruler: NbRulerService) {
    this.scroll.onScroll()
      .subscribe((event) => console.info('Scroll', event));
  }

  changeMode() {
    this.mode = this.mode === LayoutMode.WINDOW ? LayoutMode.LAYOUT : LayoutMode.WINDOW;
  }

  scrollTo(x: number, y: number) {
    this.scroll.scrollTo(x, y);

    this.ruler.getContainerScrollPosition()
      .subscribe(position => console.info('Scroll Position', position));

    this.ruler.getScrollContainerSize()
      .subscribe(size => console.info('Container Size', size));
  }
}
