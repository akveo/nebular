import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-component-block',
  template: `
    <ngd-description-block *ngIf="hasDescription" [block]="block"></ngd-description-block>
    <ngd-examples-block *ngIf="hasExamples" [block]="block"></ngd-examples-block>
    <ngd-props-block *ngIf="hasProps" [block]="block"></ngd-props-block>
    <ngd-methods-block *ngIf="hasMethods" [block]="block"></ngd-methods-block>
    <ngd-styles-block *ngIf="hasStyles" [block]="block"></ngd-styles-block>
  `,
})
export class NgdComponentBlockComponent {

  @Input() block: any;

  get hasDescription(): boolean {
    return this.block && (
      this.block.name ||
      this.block.shortDescription ||
      this.block.description
    );
  }

  get hasExamples(): boolean {
    return this.block &&
      this.block.examples &&
      this.block.examples.length > 0;
  }

  get hasProps(): boolean {
    return this.block &&
      this.block.props &&
      this.block.props.length > 0;
  }

  get hasMethods(): boolean {
    return this.block &&
      this.block.methods &&
      this.block.methods.length > 0 &&
      this.block.methods.some(method => method.shortDescription || method.description);
  }

  get hasStyles(): boolean {
    return this.block &&
      this.block.styles &&
      this.block.styles.length > 0;
  }
}
