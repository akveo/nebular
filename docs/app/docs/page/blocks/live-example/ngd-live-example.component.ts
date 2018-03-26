import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IframeCommunicatorService } from '../../../../components/example/iframe-communicator';

@Component({
  selector: 'ngd-live-example',
  styleUrls: ['./ngd-live-example.component.scss'],
  template: `
    <iframe #iframe *ngIf="id" [src]="url" [style.height.px]="iframeHeight"></iframe>
  `,
})
export class NgdLiveExampleComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;
  @Input() id: string;

  iframeHeight: number;

  get url(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`#/example/${this.id}`);
  }

  constructor(private sanitizer: DomSanitizer,
              private communicator: IframeCommunicatorService) {
  }

  ngOnInit(): void {
    this.communicator.receive(this.id)
      .subscribe(it => this.iframeHeight = it.height);
  }
}
