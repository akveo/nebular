import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { NbAdjustment, NbOverlayService, NbPortalDirective, NbPosition, NbPositionBuilderService } from '../cdk';
import { defer, merge, Observable } from 'rxjs';
import { NbOptionComponent } from './option.component';


@Component({
  selector: 'nb-select',
  template: `
    <input nbInput size="large" status="warning" shape="semi-round">

    <nb-card @select *nbPortal [style.width.px]="hostWidth">
      <nb-card-body>
        <ng-content select="nb-option, nb-option-group"></ng-content>
      </nb-card-body>
    </nb-card>
  `,
  animations: [
    trigger('select', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10%)' }),
        animate(100),
      ]),
      transition(':leave', [
        animate(100, style({ opacity: 0, transform: 'translateY(-10%)' })),
      ]),
    ]),
  ],
})

export class NbSelectComponent implements AfterViewInit {
  @Input() multi: boolean = false;
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent>;
  @ViewChild(NbPortalDirective) portal: NbPortalDirective;

  select: Observable<any> = defer(() => merge(...this.options.map(it => it.select)));

  constructor(protected overlay: NbOverlayService,
              protected hostRef: ElementRef,
              protected positionBuilder: NbPositionBuilderService) {
  }

  get hostWidth(): number {
    return this.hostRef.nativeElement.getBoundingClientRect().width;
  }

  ngAfterViewInit() {
    this.select.subscribe(() => {

    });
  }

  @HostListener('click')
  onClick() {
    const positionStrategy = this.positionBuilder
      .connectedTo(this.hostRef)
      .position(NbPosition.BOTTOM)
      .adjustment(NbAdjustment.NOOP);

    const ref = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    ref.attach(this.portal);
  }
}
