import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IframeCommunicatorService } from './iframe-communicator';
import { Router } from '@angular/router';
import { NbDocument } from '@nebular/theme';

@Component({
  selector: 'ngd-example-renderer',
  template: '<router-outlet></router-outlet>',
})
export class NgdExampleRendererComponent implements OnInit, AfterViewInit {
  private id: string;

  constructor(private communicator: IframeCommunicatorService,
              private router: Router,
              private document: NbDocument) {
  }

  ngOnInit() {
    this.id = this.getId();
  }

  ngAfterViewInit() {
    this.sendHeight();
  }

  private getId(): string {
    return this.router.url.split('/').pop();
  }

  private sendHeight() {
    this.communicator.send({ id: this.id, height: this.document.body.clientHeight });
  }
}
