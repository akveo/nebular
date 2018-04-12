import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-overview-block',
  template: `
    <div class="block-container">
      <h2 class="class-name">
        <a [routerLink]="" fragment="{{ source.name }}" ngdFragment></a>
        {{source?.name}}
      </h2>
      <ng-container class="description" *ngFor="let node of overview">
        <ngd-markdown-block *ngIf="node.type === 'text'" [source]="node.content"></ngd-markdown-block>
        <ngd-live-example *ngIf="node.type === 'live-example'" [id]="node.content">
        </ngd-live-example>
        <ngd-inline-example *ngIf="node.type === 'inline-example'" [content]="node.content">
        </ngd-inline-example>
      </ng-container>
    </div>
  `,
})
export class NgdOverviewBlockComponent {

  source: any;
  overview: any[] = [];

  @Input('source')
  set setSource(source: any) {
    this.source = source;
    this.overview = source.overview;
  }
}
