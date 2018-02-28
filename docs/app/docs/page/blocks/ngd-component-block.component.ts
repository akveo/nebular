import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-component-block',
  template: `
    <ngd-description-block *ngIf="hasDescription" [source]="source"></ngd-description-block>
    <ngd-examples-block *ngIf="hasExamples" [source]="source"></ngd-examples-block>
    <ngd-props-block *ngIf="hasProps" [source]="source"></ngd-props-block>
    <ngd-methods-block *ngIf="hasMethods" [source]="source"></ngd-methods-block>
    <ngd-styles-block *ngIf="hasStyles" [source]="source"></ngd-styles-block>
  `,
})
export class NgdComponentBlockComponent {

  @Input() source: any;

  get hasDescription(): boolean {
    return this.source && (
      this.source.name ||
      this.source.shortDescription ||
      this.source.description
    );
  }

  get hasExamples(): boolean {
    return this.source &&
      this.source.examples &&
      this.source.examples.length > 0;
  }

  get hasProps(): boolean {
    return this.source &&
      this.source.props &&
      this.source.props.length > 0;
  }

  get hasMethods(): boolean {
    return this.source &&
      this.source.methods &&
      this.source.methods.length > 0 &&
      this.source.methods.some(method => method.shortDescription || method.description);
  }

  get hasStyles(): boolean {
    return this.source &&
      this.source.styles &&
      this.source.styles.length > 0;
  }
}
