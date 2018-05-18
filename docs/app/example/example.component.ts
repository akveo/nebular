import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { NB_DOCUMENT, NbThemeService } from '@nebular/theme';
import { NgdIframeCommunicatorService } from '../@theme/services';

@Component({
  selector: 'ngd-example',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./example.component.scss'],
})
export class NgdExampleComponent implements OnInit, AfterViewInit, OnDestroy {
  private id: string;
  private alive: boolean = true;

  constructor(private communicator: NgdIframeCommunicatorService,
              private themeService: NbThemeService,
              private router: Router,
              @Inject(NB_DOCUMENT) private document) {
  }

  ngOnInit() {
    this.setupId();
    this.subscribeOnThemeSwitch();
  }

  ngAfterViewInit() {
    this.sendHeight();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private setupId() {
    this.id = this.getId();
  }

  private subscribeOnThemeSwitch() {
    this.communicator.receive(this.id)
      .pipe(takeWhile(() => this.alive))
      .subscribe(payload => this.changeTheme(payload))
  }

  private changeTheme(payload) {
    this.themeService.changeTheme(payload.theme);
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
