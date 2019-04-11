/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Chat message component.
 *
 * @styles
 *
 */
@Component({
  selector: 'nb-chat-message-file',
  templateUrl: './chat-message-file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageFileComponent {

  readyFiles: any[];

  /**
   * Message sender
   * @type {string}
   */
  @Input() message: string;

  /**
   * Message sender
   * @type {string}
   */
  @Input() sender: string;

  /**
   * Message send date
   * @type {Date}
   */
  @Input() date: Date;

  /**
   * Message file path
   * @type {Date}
   */
  @Input()
  set files(files: any[]) {
    this.readyFiles = (files || []).map((file: any) => {
      const isImage = this.isImage(file);
      return {
        ...file,
        urlStyle: isImage && this.domSanitizer.bypassSecurityTrustStyle(`url(${file.url})`),
        isImage: isImage,
      };
    });
    this.cd.detectChanges();
  }

  constructor(private cd: ChangeDetectorRef, private domSanitizer: DomSanitizer) {
  }


  isImage(file: any): boolean {
    return ['image/png', 'image/jpeg', 'image/gif'].includes(file.type);
  }
}
