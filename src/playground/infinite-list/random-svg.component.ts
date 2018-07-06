import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-random-svg',
  template: `
    <svg
      preserveAspectRatio="xMidYMid slice"
      [attr.viewBox]="viewbox"
      [style.background]="currentColor">
      <text *ngIf="isLoading" x="35.5%" y="40.5%">Loading</text>
      <ng-container *ngIf="!isLoading">
        <line
          *ngFor="let line of lines"
          [attr.stroke]="line.strokeColor"
          [attr.stroke-width]="line.strokeWidth"
          [attr.opacity]="line.opacity"
          [attr.x1]="line.x1" [attr.y1]="line.y1"
          [attr.x2]="line.x2" [attr.y2]="line.y2"/>
        <circle
          *ngFor="let circle of circles"
          [attr.cx]="circle.cx"
          [attr.cy]="circle.cy"
          [attr.r]="circle.r"
          [attr.opacity]="circle.opacity"
          [attr.fill]="circle.fill"/>
        <polygon
          *ngFor="let polygon of polygons"
          [attr.fill]="polygon.fill"
          [attr.points]="polygon.points"
          [attr.opacity]="polygon.opacity"/>
      </ng-container>
    </svg>
  `,
  styles: [ `
    :host {
      display: block;
    }
  `],
})
export class NbRandomSvgComponent {

  goldenRatio = 0.618033988749895;
  hexWidth = 2;

  @Input()
  width = 200;

  @Input()
  height = 100;

  color: string;

  lines = [];
  circles = [];
  polygons = [];

  @Input()
  minCountForShape = 2;

  @Input()
  maxCountForShape = 10;

  @Input() isLoading;

  constructor() {
    const { width, height } = this;

    this.color = this.randomColor();

    let count = this.randomNumber(this.minCountForShape, this.maxCountForShape);
    for (let i = 0; i < count; i++) {
      this.lines.push({
        strokeColor: this.randomColor(),
        strokeWidth: this.randomNumber(1, 5),
        opacity: this.randomNumber(),
        x1: this.randomNumber(width / 10, width),
        y1: this.randomNumber(height / 10, height),
        x2: this.randomNumber(width / 10, width),
        y2: this.randomNumber(height / 10, height),
      });
    }
    count = 0;
    count = this.randomNumber(this.minCountForShape, this.maxCountForShape);
    for (let i = 0; i < count; i++) {
      this.circles.push({
        cx: this.randomNumber(0, width),
        cy: this.randomNumber(0, height),
        r: this.randomNumber(1, Math.min(width, height) / 2),
        opacity: this.randomNumber(0.1, 0.5),
        fill: this.randomColor(),
      });
    }
    count = 0;
    count = this.randomNumber(this.minCountForShape, this.maxCountForShape);
    for (let i = 0; i < count; i++) {
      this.polygons.push({
        fill: this.randomColor(),
        points: this.randomPoints(width, height).join(' '),
        opacity: this.randomNumber(0.1, 0.3),
      });
    }
  }

  get currentColor() {
    return this.isLoading ? 'lightgray' : this.color;
  }

  get viewbox() {
    return `0 0 ${this.width} ${this.height}`;
  }

  randomNumber(min: number = 0, max: number = 1): number {
    return Math.random() * (max - min) + min;
  }

  randomPoints(width: number, height: number): string[] {
    const points = [];

    for (let i = 0; i < 3; i++) {
      points.push(`${this.randomNumber(0, width)},${this.randomNumber(0, height)}`);
    }

    return points;
  }

  randomColor() {
    return this.rgbToHex(this.getRgb());
  }

  getRgb() {
    let hue = Math.random();
    hue += this.goldenRatio;
    hue %= 1;

    const saturation = 0.5;
    const value = 0.95;

    return this.hsvToRgb(hue, saturation, value);
  }

  padHex(str) {
    if (str.length > this.hexWidth) {
      return str;
    }
    return new Array(this.hexWidth - str.length + 1).join('0') + str;
  }

  rgbToHex(rgb) {
    const parts = rgb
      .map(val => this.padHex(val.toString(16)))
      .join('');

    return `#${parts}`;
  }

  hsvToRgb(h, s, v) {
    const hi = Math.floor(h * 6);
    const f = h * 6 - hi;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r = 255;
    let g = 255;
    let b = 255;

    switch (hi) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
  }
}
