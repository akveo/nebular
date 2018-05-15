import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {takeWhile} from 'rxjs/operators/takeWhile';
import { NgdIframeCommunicatorService } from '../../../@theme/services';

@Component({
  selector: 'ngd-live-example-block',
  styleUrls: ['./live-example-block.component.scss'],
  template: `
    <section class="live-example-header">
      <div class="block-title">{{title}}</div>
      <div class="example-block-actions">
        <button type="button" class="btn action-item action-button">
          <i class="icon feather-code"></i>
        </button>
        <button type="button" class="btn action-item action-button">
          <i class="icon feather-external-link"></i>
        </button>
        <div class="action-selector">
          <i class="icon feather-aperture"></i>
          <select class="action-item" [(ngModel)]="defaultTheme"  (change)="switchTheme($event.target.value)">
            <option *ngFor="let theme of themes" [value]="theme.value">{{theme.label}}</option>
          </select>
        </div>
      </div>
    </section>
    <iframe #iframe *ngIf="id" [src]="url" [style.height.px]="iframeHeight"></iframe>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdLiveExampleBlockComponent implements OnInit, OnDestroy {

  @ViewChild('iframe') iframe: ElementRef;
  @Input() id: string;
  @Input() title: string;

  iframeHeight: number;

  alive: boolean = true;

  themes: {label: string; value: string}[] = [
    { label: 'Default', value: 'default' },
    { label: 'Cosmic', value: 'cosmic' },
  ];

  defaultTheme: string = 'default';

  get url(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`#/example/${this.id}`);
  }

  get iframeWindow(): Window {
    return this.iframe.nativeElement.contentWindow;
  }

  constructor(private changeDetection: ChangeDetectorRef,
              private sanitizer: DomSanitizer,
              private communicator: NgdIframeCommunicatorService,
  ) {
  }

  ngOnInit(): void {
    this.communicator.receive(this.id)
      .pipe(takeWhile(() => this.alive))
      .subscribe(it => {
        this.iframeHeight = it.height;
        this.changeDetection.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  switchTheme(theme: string) {
    this.communicator.send({ id: this.id, theme }, this.iframeWindow);
  }
}
