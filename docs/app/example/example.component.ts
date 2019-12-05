import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of as observableOf, Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { NB_DOCUMENT, NbThemeService } from '@nebular/theme';
import { NgdAnalytics, NgdIframeCommunicatorService } from '../@theme/services';

@Component({
  selector: 'ngd-example',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./example.component.scss'],
})
export class NgdExampleComponent implements OnInit, AfterViewInit, OnDestroy {
  private id: string;
  private destroy$ = new Subject<void>();

  constructor(private communicator: NgdIframeCommunicatorService,
              private themeService: NbThemeService,
              private router: Router,
              private analytics: NgdAnalytics,
              @Inject(NB_DOCUMENT) private document) {
  }

  ngOnInit() {
    this.setupId();
    this.subscribeOnThemeSwitch();
    this.analytics.trackEvent('initExampleView', this.id);
  }

  ngAfterViewInit() {
    observableOf(null)
      .pipe(delay(500))
      .subscribe(() => this.sendHeight());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupId() {
    this.id = this.getId();
  }

  private subscribeOnThemeSwitch() {
    this.communicator.receive(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(payload => this.changeTheme(payload))
  }

  private changeTheme(payload) {
    this.themeService.changeTheme(payload.theme);
    this.sendHeight(); // theme change may cause change of height
  }

  private getId(): string {
    const splitted = this.router.url.split('/');
    // remove 'example' route prefix
    splitted.splice(0, 2);
    return splitted.join('/');
  }

  private sendHeight() {
    this.communicator.send({ id: this.id, height: this.document.body.clientHeight });
  }
}
