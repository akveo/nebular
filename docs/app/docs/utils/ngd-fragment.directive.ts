import {
  Directive, Input, HostListener,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { convertToBoolProperty } from '../../../../src/framework/theme/components/helpers';
import { DocsService } from '../docs.service';

@Directive({
  selector: '[ngdFragment]',
  host: {
    '[class.fragment]': '!remote && !table',
    '[attr.id]': '!remote ? fragment : null',
    '[class.table-fragment]': 'table',
  },
})
export class NgdFragmentDirective {

  table: boolean = false;
  remote: boolean = false;

  @Input() fragment: string;

  @Input()
  set remoteLink(val: boolean) {
    this.remote = convertToBoolProperty(val);
  }

  @Input()
  set tableCell(val: boolean) {
    this.table = convertToBoolProperty(val);
  }
  constructor(private route: ActivatedRoute,
              private docsService: DocsService) { }

  @HostListener('click') onClick() {
    if (this.route.snapshot.fragment === this.fragment) {
      this.docsService.emitFragment(this.fragment);
    }
  }
}
