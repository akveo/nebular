import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[ngdSassValue]',
})
export class NgdSassPropValueDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML
      .replace(/(#[a-f0-9]{6}|rgba.*?\))/ig , '$&<div class="color-swatch" style="background: $&"></div>');
    this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML.replace(/,/g, ', ');
  }
}
