import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import 'prismjs/components/prism-jsx.js';
import * as marked from 'marked';

@Directive({
    selector: '[ngdDescription]',
})
export class NgdDescriptionDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    let md = marked.setOptions({});
    this.el.nativeElement.innerHTML = md.parse(this.el.nativeElement.innerHTML.trim());
  }
}
