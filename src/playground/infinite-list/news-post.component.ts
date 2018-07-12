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
  styles: [`
    :host {
      display: block;
    }

    [class$="placeholder"] {
      background: #f1f2f3;
    }

    .title-placeholder {
      height: 1.8rem;
      margin-bottom: 0.5rem;
      width: 80%;
    }
    .text-placeholder {
      height: 7rem;
      margin-bottom: 1rem;
    }
    .link-placeholder {
      height: 1.25rem;
      width: 5rem;
    }
  `],
})
export class NbNewsPostPlaceholderComponent {
  @HostBinding('attr.aria-label')
  label = 'Loading';
}
