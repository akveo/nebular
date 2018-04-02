/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-header>Button Colors</nb-card-header>
          <nb-card-body>
            <button nbButton>Hello Button</button>

            <button nbButton status="primary">Hello Button</button>
            <button nbButton status="success">Hello Button</button>
            <button nbButton status="info">Hello Button</button>
            <button nbButton status="warning">Hello Button</button>
            <button nbButton status="danger">Hello Button</button>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-header>Button Sizes</nb-card-header>
          <nb-card-body>
            <button nbButton size="xsmall">Hello Button</button>
            <button nbButton size="small">Hello Button</button>
            <button nbButton size="medium">Hello Button</button>
            <button nbButton size="large">Hello Button</button>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-header>Button Hero</nb-card-header>
          <nb-card-body>
            <button nbButton hero status="primary">Hello Button</button>
            <button nbButton hero status="success">Hello Button</button>
            <button nbButton hero status="info">Hello Button</button>
            <button nbButton hero status="warning">Hello Button</button>
            <button nbButton hero status="danger">Hello Button</button>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-header>Button Outline</nb-card-header>
          <nb-card-body>
            <button nbButton outline status="primary">Hello Button</button>
            <button nbButton outline status="success">Hello Button</button>
            <button nbButton outline status="info">Hello Button</button>
            <button nbButton outline status="warning">Hello Button</button>
            <button nbButton outline status="danger">Hello Button</button>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-header>Button Shapes</nb-card-header>
          <nb-card-body>
            <button nbButton outline shape="rectangle" status="primary">Hello Button</button>
            <button nbButton hero shape="round" status="success">Hello Button</button>
            <button nbButton shape="semi-round" status="info">Hello Button</button>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-header>Link Colors</nb-card-header>
          <nb-card-body>
            <a href="#" nbButton status="primary">Hello Button</a>
            <a href="#" nbButton status="success">Hello Button</a>
            <a href="#" nbButton status="info">Hello Button</a>
            <a href="#" nbButton status="warning">Hello Button</a>
            <a href="#" nbButton status="danger">Hello Button</a>
          </nb-card-body>
        </nb-card>

      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbButtonExampleComponent {

}
