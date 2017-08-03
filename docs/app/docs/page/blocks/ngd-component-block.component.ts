import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ngd-component-block',
    template: `
      <ngd-description-block [blockData]="blockData"></ngd-description-block>
      <ngd-examples-block *ngIf="blockData.examples?.length > 0" [blockData]="blockData"></ngd-examples-block>
      <ngd-props-block *ngIf="blockData.props?.length > 0" [blockData]="blockData"></ngd-props-block>
      <ngd-methods-block *ngIf="blockData.methods?.length > 0" [blockData]="blockData"></ngd-methods-block>            
      <ngd-styles-block *ngIf="blockData.styles?.length > 0" [blockData]="blockData"></ngd-styles-block>
`
})
export class NgdComponentBlockComponent implements OnInit {

  @Input() blockData: any;

  ngOnInit() { }

}
