import { Component } from '@angular/core';

@Component({
  selector: 'app-tag-status-component',
  template: `
    <div class="tags-pad">
      <nb-tag text="basic" status="basic"></nb-tag>
      <nb-tag text="primary" status="primary"></nb-tag>
      <nb-tag text="success" status="success"></nb-tag>
      <nb-tag text="danger" status="danger"></nb-tag>
      <nb-tag text="warning" status="warning"></nb-tag>
      <nb-tag text="info" status="info"></nb-tag>
      <div class="control-pad">
        <nb-tag text="control" status="control"></nb-tag>
      </div>
    </div>

    <div class="tags-pad">
      <nb-tag appearance="outline" text="basic" status="basic"></nb-tag>
      <nb-tag appearance="outline" text="primary" status="primary"></nb-tag>
      <nb-tag appearance="outline" text="success" status="success"></nb-tag>
      <nb-tag appearance="outline" text="danger" status="danger"></nb-tag>
      <nb-tag appearance="outline" text="warning" status="warning"></nb-tag>
      <nb-tag appearance="outline" text="info" status="info"></nb-tag>
      <div class="control-pad">
        <nb-tag appearance="outline" text="control" status="control"></nb-tag>
      </div>
    </div>
  `,
  styleUrls: ['./tag-status-showcase.component.scss'],
})
export class TagStatusShowcaseComponent {}
