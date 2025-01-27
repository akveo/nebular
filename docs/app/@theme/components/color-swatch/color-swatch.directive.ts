import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[ngdColorSwatch]',
  standalone: false,
})
export class NgdColorSwatchDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML.replace(
      /(#[a-f0-9]{6}|rgba.*?\))/gi,
      '$&<span class="color-swatch" style="background: $&"></span>',
    );
    this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML.replace(/,/g, ', ');
  }
}
