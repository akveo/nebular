import { Component, Input } from '@angular/core';
import { NewsPost } from '../news.service';

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
export class NewsPostComponent {
  @Input()
  post: NewsPost;
}
