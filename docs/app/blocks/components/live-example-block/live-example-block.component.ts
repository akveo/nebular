import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {takeWhile} from 'rxjs/operators/takeWhile';
import { NgdIframeCommunicatorService } from '../../../@theme/services';

@Component({
  selector: 'ngd-live-example-block',
  styleUrls: ['./live-example-block.component.scss'],
  template: `
    <p><nb-checkbox [(ngModel)]="isCosmic" (change)="switchTheme()">Switch theme</nb-checkbox></p>
    <iframe #iframe *ngIf="id" [src]="url" [style.height.px]="iframeHeight"></iframe>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdLiveExampleBlockComponent implements OnInit, OnDestroy {

  @ViewChild('iframe') iframe: ElementRef;
  @Input() id: string;

  iframeHeight: number;
  isCosmic: boolean;
  alive: boolean = true;

  get url(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`#/example/${this.id}`);
  }

  get iframeWindow(): Window {
    return this.iframe.nativeElement.contentWindow;
  }

  constructor(private sanitizer: DomSanitizer,
              private communicator: NgdIframeCommunicatorService) {
  }

  ngOnInit(): void {
    this.communicator.receive(this.id)
      .pipe(takeWhile(() => this.alive))
      .subscribe(it => this.iframeHeight = it.height);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  switchTheme() {
    const theme = this.isCosmic ? 'cosmic' : 'default';
    this.communicator.send({ id: this.id, theme }, this.iframeWindow);
  }
}
