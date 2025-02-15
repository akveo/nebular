/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { NB_WINDOW, NbDialogRef } from '@nebular/theme';

let formContainerUniqueId = 0;

@Component({
    template: `
    <nb-card>
      <nb-card-header>
        <span>{{ title }}</span>
        <button nbButton appearance="ghost" class="close-button" (click)="closeDialog()">
          <nb-icon icon="close" pack="eva"></nb-icon>
        </button>
      </nb-card-header>
      <nb-card-body [nbSpinner]="showSpinner">
        <div #formContainer [attr.id]="formContainerId"></div>
      </nb-card-body>
    </nb-card>
  `,
    styleUrls: ['./hubspot-form-dialog.component.scss'],
    standalone: false
})
export class NgdHubspotFormDialogComponent implements OnInit, AfterViewInit {

  protected readonly defaultConfig = {
    submitButtonClass: 'hs-submit-btn btn',
    css: '',
    cssClass: 'hs-custom-form',
  };

  showSpinner: boolean = false;

  formContainerId: string = `hubspot-form-container-id-${formContainerUniqueId++}`;
  title: string;
  formConfig;

  @ViewChild('formContainer') formContainer: ElementRef<HTMLDivElement>;

  constructor(
    protected ref: NbDialogRef<NgdHubspotFormDialogComponent>,
    protected cd: ChangeDetectorRef,
    @Inject(NB_WINDOW) protected window,
  ) {}

  ngOnInit() {
    this.showSpinner = this.couldEnableSpinner();
  }

  ngAfterViewInit() {
    const config = this.createConfig();

    if (this.showSpinner) {
      this.listenFormInit();
    }

    (window as unknown as { hbspt: any }).hbspt.forms.create(config);
  }

  closeDialog(): void {
    this.ref.close();
  }

  private createConfig() {
    const config = { ...this.defaultConfig, ...this.formConfig };
    if (!config.target) {
      config.target = '#' + this.formContainerId;
    }
    return config;
  }

  protected couldEnableSpinner(): boolean {
    return !!this.window.MutationObserver;
  }

  protected listenFormInit(): void {
    const observer = new MutationObserver(() => {
      this.showSpinner = false;
      this.cd.markForCheck();
      observer.disconnect();
    });

    observer.observe(this.formContainer.nativeElement, { childList: true });
  }
}
