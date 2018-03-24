import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'ngd-live-example',
  styleUrls: ['./ngd-live-example.component.scss'],
  template: `
    <iframe *ngIf="id" [src]="url" frameborder="0"></iframe>
  `,
})
export class NgdLiveExampleComponent {

  @Input() id: string;

  constructor(private sanitizer: DomSanitizer) {
  }

  get url(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`#/example/${this.id}`);
  }
}
