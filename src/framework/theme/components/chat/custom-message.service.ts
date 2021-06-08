import { Injectable, TemplateRef } from '@angular/core';

/**
 * Service for self register custom templates
 */
@Injectable()
export class NbCustomMessageService {

  protected readonly customMessages = new Map<string, TemplateRef<any>>();

  getMessageTemplate(type: string): TemplateRef<any> | undefined {
    return this.customMessages.get(type);
  }

  registerMessageTemplate(type: string, template: TemplateRef<any>): void {
    this.customMessages.set(type, template);
  }

  unregisterMessageTemplate(type: string): boolean {
    return this.customMessages.delete(type);
  }

}
