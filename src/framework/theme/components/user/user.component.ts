/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { convertToBoolProperty } from '../helpers';
import { NbComponentSize } from '../component-size';
import { NbComponentShape } from '../component-shape';
import { NbComponentStatus } from '../component-status';
import { NbBadgePosition } from '../badge/badge.component';

/**
 * Represents a component showing a user avatar (picture) with a user name on the right.
 * @stacked-example(Showcase, user/user-showcase.component)
 *
 * ```ts
 *   <nb-user name="John Doe" title="Engineer"></nb-user>
 * ```
 *
 * ### Installation
 *
 * Import `NbUserModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbUserModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Available in multiple sizes:
 * @stacked-example(Multiple Sizes, user/user-sizes.component)
 *
 *
 * You can hide unnecessary captions (name, title or both):
 * @stacked-example(Hide captions in user component, user/user-hide-captions.component)
 *
 *
 * You can set custom avatar background-color, user image (as link or BASE64 string) and disable user initials:
 * @stacked-example(Avatar image settings, user/user-avatar-settings.component)
 *
 * Component shape could be controlled with `shape` input.
 * @stacked-example(Shapes, user/user-shape.component)
 *
 * @styles
 *
 * user-picture-box-background-color:
 * user-picture-box-border-color:
 * user-picture-box-border-width:
 * user-initials-text-color:
 * user-initials-text-font-family:
 * user-initials-text-font-weight:
 * user-name-text-color:
 * user-name-text-font-family:
 * user-name-text-font-weight:
 * user-title-text-color:
 * user-title-text-font-family:
 * user-title-text-font-weight:
 * user-rectangle-border-radius:
 * user-semi-round-border-radius:
 * user-round-border-radius:
 * user-tiny-height:
 * user-tiny-width:
 * user-tiny-initials-text-font-size:
 * user-tiny-initials-text-line-height:
 * user-tiny-name-text-font-size:
 * user-tiny-name-text-line-height:
 * user-tiny-title-text-font-size:
 * user-tiny-title-text-line-height:
 * user-small-height:
 * user-small-width:
 * user-small-initials-text-font-size:
 * user-small-initials-text-line-height:
 * user-small-name-text-font-size:
 * user-small-name-text-line-height:
 * user-small-title-text-font-size:
 * user-small-title-text-line-height:
 * user-medium-height:
 * user-medium-width:
 * user-medium-initials-text-font-size:
 * user-medium-initials-text-line-height:
 * user-medium-name-text-font-size:
 * user-medium-name-text-line-height:
 * user-medium-title-text-font-size:
 * user-medium-title-text-line-height:
 * user-large-height:
 * user-large-width:
 * user-large-initials-text-font-size:
 * user-large-initials-text-line-height:
 * user-large-name-text-font-size:
 * user-large-name-text-line-height:
 * user-large-title-text-font-size:
 * user-large-title-text-line-height:
 * user-giant-height:
 * user-giant-width:
 * user-giant-initials-text-font-size:
 * user-giant-initials-text-line-height:
 * user-giant-name-text-font-size:
 * user-giant-name-text-line-height:
 * user-giant-title-text-font-size:
 * user-giant-title-text-line-height:
 */
@Component({
  selector: 'nb-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class NbUserComponent {

  imageBackgroundStyle: SafeStyle;

  /**
   * Specifies a name to be shown on the right of a user picture
   * @type string
   */
  @Input() name: string = 'Anonymous';

  /**
   * Specifies a title to be shown under the **name**
   * @type string
   */
  @Input() title: string;

  /**
   * Absolute path to a user picture or base64 image.
   * User name initials will be shown if no picture specified (JD for John Doe).
   * @type string
   */
  @Input()
  set picture(value: string) {
    this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  /**
   * Color of the area shown when no picture specified
   * @type string
   */
  @Input() color: string;

  /**
   * Size of the component.
   * Possible values: `tiny`, `small`, `medium` (default), `large`, 'giant'.
   */
  @Input() size: NbComponentSize = 'medium';

  /**
   * Shape of the picture box.
   * Possible values: `rectangle`, `semi-round`, `round`.
   */
  @Input() shape: NbComponentShape = 'round';

  /**
   * Whether to show a user name or not
   */
  @Input()
  get showName(): boolean {
    return this._showName;
  }
  set showName(val: boolean) {
    this._showName = convertToBoolProperty(val);
  }
  private _showName: boolean = true;

  /**
   * Whether to show a user title or not
   * @type boolean
   */
  @Input()
  get showTitle(): boolean {
    return this._showTitle;
  }
  set showTitle(val: boolean) {
    this._showTitle = convertToBoolProperty(val);
  }
  private _showTitle: boolean = true;

  /**
   * Whether to show a user initials (if no picture specified) or not
   * @type boolean
   */
  @Input()
  get showInitials(): boolean {
    return this._showInitials;
  }
  set showInitials(val: boolean) {
    this._showInitials = convertToBoolProperty(val);
  }
  private _showInitials: boolean = true;

  /**
   * Whether to show only a picture or also show the name and title
   * @type boolean
   */
  @Input()
  get onlyPicture(): boolean {
    return !this.showName && !this.showTitle;
  }
  set onlyPicture(val: boolean) {
    this.showName = this.showTitle = !convertToBoolProperty(val);
  }

  /**
   * Badge text to display
   * @type string
   */
  @Input() badgeText: string;

  /**
   * Badge status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   * @param {string} val
   */
  @Input() badgeStatus: NbComponentStatus;

  /**
   * Badge position.
   * Can be set to any class or to one of predefined positions:
   * 'top left', 'top right', 'bottom left', 'bottom right',
   * 'top start', 'top end', 'bottom start', 'bottom end'
   * @type string
   */
  @Input() badgePosition: NbBadgePosition;

  @HostBinding('class.size-tiny')
  get tiny(): boolean {
    return this.size === 'tiny';
  }

  @HostBinding('class.size-small')
  get small(): boolean {
    return this.size === 'small';
  }

  @HostBinding('class.size-medium')
  get medium(): boolean {
    return this.size === 'medium';
  }

  @HostBinding('class.size-large')
  get large(): boolean {
    return this.size === 'large';
  }

  @HostBinding('class.size-giant')
  get giant(): boolean {
    return this.size === 'giant';
  }

  @HostBinding('class.shape-rectangle')
  get rectangle(): boolean {
    return this.shape === 'rectangle';
  }

  @HostBinding('class.shape-semi-round')
  get semiRound(): boolean {
    return this.shape === 'semi-round';
  }

  @HostBinding('class.shape-round')
  get round(): boolean {
    return this.shape === 'round';
  }

  constructor(private domSanitizer: DomSanitizer) { }

  getInitials(): string {
    if (this.name) {
      const names = this.name.split(' ');

      return names.map(n => n.charAt(0)).splice(0, 2).join('').toUpperCase();
    }

    return '';
  }
}
