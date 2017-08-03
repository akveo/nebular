import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[ngdSassValue]',
})
export class NgdSassPropValueDirective implements AfterViewInit {
  constructor(private el: ElementRef,
              private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.el.nativeElement.innerHTML =
    this.el.nativeElement.innerHTML.replace(/(#[a-f0-9]{6}|rgba.*?\))/ig , "$&" + "<div class='color-swatch' style='background:"+ "$&" +"'></div>");
    this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML.replace(/,/g, ', ');
  }
}
