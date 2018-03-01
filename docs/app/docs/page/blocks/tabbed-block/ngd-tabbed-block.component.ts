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
}
