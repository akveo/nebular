import { Component } from '@angular/core';

@Component({
  selector: 'nb-window-collapse-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g fill="#2A2A2A" fill-rule="evenodd">
        <path d="M7 17H2v-1h6v6H7v-5z"/>
        <path d="M9 15H4v-1h6v6H9v-5zM15 9h5v1h-6V4h1v5z"/>
        <path d="M17 7h5v1h-6V2h1v5z"/>
      </g>
    </svg>
  `,
  styleUrls: ['./window-icon.component.scss'],
})
export class NbWindowCollapseIconComponent {}

@Component({
  selector: 'nb-window-expand-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g fill="#2A2A2A" fill-rule="evenodd">
        <path d="M4 20h5v1H3v-6h1v5z"/>
        <path d="M6 18h5v1H5v-6h1v5zM18 6h-5V5h6v6h-1V6z"/>
        <path d="M20 4h-5V3h6v6h-1V4z"/>
      </g>
    </svg>
  `,
  styleUrls: ['./window-icon.component.scss'],
})
export class NbWindowExpandIconComponent {}

@Component({
  selector: 'nb-window-close-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
      <defs>
        <path id="a" d="M4.1 11.4h15.8v1.2H4.1z" transform="rotate(-45.001 12 12)"/>
      </defs>
      <clipPath id="b">
        <use overflow="visible" xlink:href="#a"/>
      </clipPath>
      <path fill="#2a2a2a" d="M1 1h22v22H1z" clip-path="url(#b)"/>
      <g>
        <defs>
          <path id="c" d="M11.4 4.1h1.2v15.8h-1.2z" transform="rotate(-45.001 12 12)"/>
        </defs>
        <clipPath id="d">
          <use overflow="visible" xlink:href="#c"/>
        </clipPath>
        <path fill="#2a2a2a" d="M1 1h22v22H1z" clip-path="url(#d)"/>
      </g>
    </svg>
  `,
  styleUrls: ['./window-icon.component.scss'],
})
export class NbWindowCloseIconComponent {}

@Component({
  selector: 'nb-window-minimize-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g fill="#2A2A2A" fill-rule="evenodd">
        <path d="M4 22v-1h15v1z"/>
      </g>
    </svg>
  `,
  styleUrls: ['./window-icon.component.scss'],
})
export class NbWindowMinimizeIconComponent {}
