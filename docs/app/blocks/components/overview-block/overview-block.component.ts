import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-overview-block',
  template: `
    <ng-container class="description" *ngFor="let node of overview">
      <ngd-md-block *ngIf="node.type === 'text'" [source]="node.content" [title]="source.name"></ngd-md-block>
      <ngd-live-example-block *ngIf="node.type === 'live-example'" [id]="node.content">
      </ngd-live-example-block>
      <ngd-inline-example-block *ngIf="node.type === 'inline-example'" [content]="node.content">
      </ngd-inline-example-block>
      <ngd-stacked-example-block *ngIf="node.type === 'example'" [content]="node.content">
      </ngd-stacked-example-block>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
