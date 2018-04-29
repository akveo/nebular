import { Component, Input } from '@angular/core';
import { BlockHelperService } from '../../../utils/block-helper.service';

@Component({
  selector: 'ngd-tabbed-block',
  styleUrls: ['./ngd-tabbed-block.component.scss'],
  templateUrl: './ngd-tabbed-block.component.html',
})
export class NgdTabbedBlockComponent {

  @Input() source = [];

  constructor(public blockHelper: BlockHelperService) {
  }

  get hasOverview(): boolean {
    return this.source.some(source => this.blockHelper.hasOverview(source));
  }

  get hasTheme(): boolean {
    return this.source.some(source => {
      return this.blockHelper.hasTheme(source);
    })
  }

  get hasAPI(): boolean {
    return this.source.some(source => {
      return this.blockHelper.hasMethods(source) || this.blockHelper.hasProps(source);
    })
  }

  get hasExample(): boolean {
    return this.source.some(source => this.blockHelper.hasExamples(source));
  }
}
