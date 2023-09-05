import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'npg-news-post-placeholder',
  template: `
    <div class="title-placeholder"></div>
    <div class="text-placeholder"></div>
    <div class="link-placeholder"></div>
  `,
  styleUrls: ['../news-post-placeholder.component.scss'],
})
export class NewsPostPlaceholderComponent {
  @HostBinding('attr.aria-label')
  label = 'Loading';
}
