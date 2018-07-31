import { Component, Input, HostBinding } from '@angular/core';
import { NewsPost } from './news.service';

@Component({
  selector: 'nb-news-post',
  template: `
    <article>
      <h2>{{post.title}}</h2>
      <p>{{post.text}}</p>
      <a [attr.href]="post.link">Read full article</a>
    </article>
  `,
})
export class NbNewsPostComponent {
  @Input()
  post: NewsPost;
}

@Component({
  selector: 'nb-news-post-placeholder',
  template: `
    <div class="title-placeholder"></div>
    <div class="text-placeholder"></div>
    <div class="link-placeholder"></div>
  `,
  styleUrls: [ './news-post-placeholder.component.scss' ],
})
export class NbNewsPostPlaceholderComponent {
  @HostBinding('attr.aria-label')
  label = 'Loading';
}
