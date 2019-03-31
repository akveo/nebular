/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { convertToBoolProperty } from '../helpers';
import { NbComponentSize } from '../component-size';

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
  @Input()
  get size(): NbComponentSize {
    return this._size;
  }
  set size(value: NbComponentSize) {
    this._size = value;
  }
  private _size: NbComponentSize = 'medium';

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

  @HostBinding('class.size-tiny')
  get tiny() {
    return this.size === 'tiny';
  }

  @HostBinding('class.size-small')
  get small() {
    return this.size === 'small';
  }

  @HostBinding('class.size-medium')
  get medium() {
    return this.size === 'medium';
  }

  @HostBinding('class.size-large')
  get large() {
    return this.size === 'large';
  }

  @HostBinding('class.size-giant')
  get giant() {
    return this.size === 'giant';
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
