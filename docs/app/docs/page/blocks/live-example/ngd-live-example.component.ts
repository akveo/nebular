import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IframeCommunicatorService } from '../../../../components/example/iframe-communicator';
import {takeWhile} from 'rxjs/operators/takeWhile';

@Component({
  selector: 'ngd-live-example',
  styleUrls: ['./ngd-live-example.component.scss'],
  template: `
    <p><nb-checkbox [(ngModel)]="isCosmic" (change)="switchTheme()">Switch theme</nb-checkbox></p>
    <iframe #iframe *ngIf="id" [src]="url" [style.height.px]="iframeHeight"></iframe>
  `,
})
export class NgdLiveExampleComponent implements OnInit, OnDestroy {
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
              private communicator: IframeCommunicatorService) {
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
