import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngd-overview-block',
  template: `
    <div class="block-container">
      <h2 class="class-name">
        <a [routerLink]="" fragment="{{source.name}}" ngdFragment></a>
        {{source?.name}}
      </h2>
      <ng-container class="description" *ngFor="let node of overview">
        <p *ngIf="node.type === 'text'" ngdDescription class="description">
          {{node.content}}
        </p>
        <p *ngIf="node.type === 'live-example'">
          <!-- TODO use live-example renderer here -->
        </p>
        <p *ngIf="node.type === 'inline-example'">
          <!-- TODO use inline-example renderer here -->
        </p>
      </ng-container>
    </div>
  `,
})
export class NgdOverviewBlockComponent implements OnInit {

  @Input('source')
  set setSource(source: any) {
    this.source = source;
    this.overview = source.overview;
  }

  source: any;
  overview: any[] = [];

  constructor() {
  }

  ngOnInit() {
  }
}
