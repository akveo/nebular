import { ChangeDetectionStrategy, Component } from '@angular/core';

import { trees } from './trees-list';

@Component({
  templateUrl: './tag-appearance.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagAppearanceComponent {
  trees = trees;
}
