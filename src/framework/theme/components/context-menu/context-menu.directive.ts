import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NbPopoverDirective } from '../popover/popover.directive';
import { NbMenuItem } from '../menu/menu.service';
import { NbThemeService } from '../../services/theme.service';
import { NbContextMenuComponent } from './context-menu.component';
import { NbPopoverAdjustment, NbPopoverPlacement } from '../popover/helpers/model';

@Directive({ selector: '[nbContextMenu]' })
export class NbContextMenuDirective extends NbPopoverDirective implements OnInit {

  @Input('nbContextMenu')
  items: NbMenuItem[];

  @Input('nbContextMenuPlacement')
  placement: NbPopoverPlacement = NbPopoverPlacement.BOTTOM;

  @Input('nbContextMenuAdjustment')
  adjustment: NbPopoverAdjustment = NbPopoverAdjustment.CLOCKWISE;

  constructor(hostRef: ElementRef, themeService: NbThemeService) {
    super(hostRef, themeService);

    this.content = NbContextMenuComponent;
  }

  ngOnInit() {
    super.ngOnInit();
    this.context = { items: this.items };
  }
}
