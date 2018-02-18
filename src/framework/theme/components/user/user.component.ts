/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, HostBinding, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { convertToBoolProperty } from '../helpers';

/**
 * Action dropdown menu
 */
export class NbUserMenuItem {
  /**
   * Menu title
   * @type string
   */
  title: string;
  /**
   * Menu link for [routerLink] directive
   * @type string
   */
  link?: string;
  /**
   * URL for absolute urls, used directly in href
   * @type string
   */
  url?: string;
  /**
   * Link target (_blank, _self, etc)
   * @type string
   */
  target?: string;
  /**
   * Icon class
   * @type string
   */
  icon?: string;
}

/**
 * Represents a component showing a user avatar (picture) with a user name on the right.
 *
 * Can be used as a user profile link or can bring a user context menu.
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
 * user-menu-fg:
 * user-menu-bg:
 * user-menu-active-fg:
 * user-menu-active-bg:
 * user-menu-border:
 */
@Component({
  selector: 'nb-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class NbUserComponent {

  // TODO: it makes sense use object instead of list of variables (or even enum)
  /*
    static readonly SIZE = {
     SMALL: 'small',
     MEDIUM: 'medium',
     LARGE: 'large',
    };
   */
  static readonly SIZE_SMALL = 'small';
  static readonly SIZE_MEDIUM = 'medium';
  static readonly SIZE_LARGE = 'large';
  static readonly SIZE_XLARGE = 'xlarge';

  private sizeValue: string;

  @HostBinding('class.inverse') inverseValue: boolean;

  @HostBinding('class.small')
  get small() {
    return this.sizeValue === NbUserComponent.SIZE_SMALL;
  }

  @HostBinding('class.medium')
  get medium() {
    return this.sizeValue === NbUserComponent.SIZE_MEDIUM;
  }

  @HostBinding('class.large')
  get large() {
    return this.sizeValue === NbUserComponent.SIZE_LARGE;
  }

  @HostBinding('class.xlarge')
  get xlarge() {
    return this.sizeValue === NbUserComponent.SIZE_XLARGE;
  }

  /**
   * Specifies a name to be shown on the right of a user picture
   * @type string
   */
  @Input() name: string = 'Anonymous';

  /**
   * Specifies a title (written in a smaller font) to be shown under the **name**
   * @type string
   */
  @Input() title: string;

  /**
   * Absolute path to a user picture. Or base64 image
   * User name initials (JD for John Doe) will be shown if no picture specified
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
   * List of menu items for a user context menu (shown when clicked)
   * @type NbUserMenuItem[]
   */
  @Input() menu: NbUserMenuItem[] = [];

  /**
   * Size of the component, small|medium|large
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
   * Makes colors inverse based on current theme
   * @type boolean
   */
  @Input()
  set inverse(val: boolean) {
    this.inverseValue = convertToBoolProperty(val);
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
   * 'top left', 'top right', 'bottom left', 'bottom right'
   * @type string
   */
  @Input() badgePosition: string;

  /**
   * Outputs when a context menu item is clicked
   * @type EventEmitter<NbUserMenuItem>
   */
  @Output() menuClick = new EventEmitter<NbUserMenuItem>();

  imageBackgroundStyle: SafeStyle;
  showNameValue: boolean = true;
  showTitleValue: boolean = true;
  showInitialsValue: boolean = true;
  isMenuShown: boolean = false;

  constructor(
    private el: ElementRef,
    private domSanitizer: DomSanitizer) { }

  itemClick(event: any, item: NbUserMenuItem): boolean {
    this.menuClick.emit(item);
    return false;
  }

  /**
   * Toggles a context menu
   */
  toggleMenu() {
    this.isMenuShown = !this.isMenuShown;
  }

  @HostListener('document:click', ['$event'])
  hideMenu(event: any) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isMenuShown = false;
    }
  }

  getInitials(): string {
    if (this.name) {
      const names = this.name.split(' ');

      return names.map(n => n.charAt(0)).splice(0, 2).join('').toUpperCase();
    }

    return '';
  }

  hasMenu(): boolean {
    return this.menu && this.menu.length > 0;
  }

}
