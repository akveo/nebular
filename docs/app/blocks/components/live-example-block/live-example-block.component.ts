import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { takeWhile } from 'rxjs/operators';
import { NgdIframeCommunicatorService } from '../../../@theme/services';
import { NgdExampleView } from '../../enum.example-view';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngd-live-example-block',
  styleUrls: ['./live-example-block.component.scss'],
  templateUrl: './live-example-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdLiveExampleBlockComponent implements OnInit, OnDestroy {

  @ViewChild('iframe') iframe: ElementRef;
  @Input() content: any;
  @Input() hasViewSwitch: boolean = false;
  @Output() changeView = new EventEmitter<NgdExampleView>();

  @HostBinding('class.theme-default')
  private get isDefault() {
    return this.currentTheme === 'default';
  }

  @HostBinding('class.theme-cosmic')
  private get isCosmic() {
    return this.currentTheme === 'cosmic';
  }

  iframeHeight: number;
  alive: boolean = true;

  themes: {label: string; value: string}[] = [
    { label: 'Default', value: 'default' },
    { label: 'Cosmic', value: 'cosmic' },
  ];

  currentTheme: string = 'default';
  loading = true;

  get url(): SafeUrl {
    return this.sanitizer
      .bypassSecurityTrustResourceUrl(`${environment.examplesUrl}#/example/${this.content.id}`);
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
    this.communicator.receive(this.content.id)
      .pipe(takeWhile(() => this.alive))
      .subscribe(it => {
        this.iframeHeight = it.height;
        this.loading = false;
        this.changeDetection.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  switchTheme(theme: string) {
    this.communicator.send({ id: this.content.id, theme }, this.iframeWindow);
  }

  switchToInlineVew() {
    this.changeView.emit(NgdExampleView.INLINE);
  }
}
