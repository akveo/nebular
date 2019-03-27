/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { NbUserSize } from './user-size';
import { convertToBoolProperty } from '../helpers';

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
 *
 * @styles
 *
 * user-font-size:
 * user-line-height:
 * user-bg:
 * user-fg:
 * user-fg-highlight:
 * user-font-family-secondary:
 * user-size-small:
 * user-size-medium:
 * user-size-large:
 * user-size-xlarge:
 */
@Component({
  selector: 'nb-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class NbUserComponent {

  private sizeValue: NbUserSize = NbUserSize.MEDIUM;

  @HostBinding('class.size-small')
  get small() {
    return this.sizeValue === NbUserSize.SMALL;
  }

  @HostBinding('class.size-medium')
  get medium() {
    return this.sizeValue === NbUserSize.MEDIUM;
  }

  @HostBinding('class.size-large')
  get large() {
    return this.sizeValue === NbUserSize.LARGE;
  }

  @HostBinding('class.size-xlarge')
  get xlarge() {
    return this.sizeValue === NbUserSize.XLARGE;
  }

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
  @Input() set picture(value: string) {
    this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  /**
   * Color of the area shown when no picture specified
   * @type string
   */
  @Input() color: string;

  /**
   * Size of the component, small|medium|large|xlarge
   * @type string
   */
  @Input()
  set size(val: string) {
    this.sizeValue = val;
  }

  /**
   * Whether to show a user name or not
   * @type boolean
   */
  @Input()
  set showName(val: boolean) {
    this.showNameValue = convertToBoolProperty(val);
  }

  /**
   * Whether to show a user title or not
   * @type boolean
   */
  @Input()
  set showTitle(val: boolean) {
    this.showTitleValue = convertToBoolProperty(val);
  }

  /**
   * Whether to show a user initials (if no picture specified) or not
   * @type boolean
   */
  @Input()
  set showInitials(val: boolean) {
    this.showInitialsValue = convertToBoolProperty(val);
  }

  /**
   * Whether to show only a picture or also show the name and title
   * @type boolean
   */
  @Input()
  set onlyPicture(val: boolean) {
    this.showNameValue = this.showTitleValue = !convertToBoolProperty(val);
  }

  /**
   * Badge text to display
   * @type string
   */
  @Input() badgeText: string;

  /**
   * Badge status (adds specific styles):
   * 'primary', 'info', 'success', 'warning', 'danger'
   * @param {string} val
   */
  @Input() badgeStatus: string;

  /**
   * Badge position.
   * Can be set to any class or to one of predefined positions:
   * 'top left', 'top right', 'bottom left', 'bottom right',
   * 'top start', 'top end', 'bottom start', 'bottom end'
   * @type string
   */
  @Input() badgePosition: string;

  imageBackgroundStyle: SafeStyle;
  showNameValue: boolean = true;
  showTitleValue: boolean = true;
  showInitialsValue: boolean = true;

  constructor(private domSanitizer: DomSanitizer) { }

  getInitials(): string {
    if (this.name) {
      const names = this.name.split(' ');

      return names.map(n => n.charAt(0)).splice(0, 2).join('').toUpperCase();
    }

    return '';
  }
}
