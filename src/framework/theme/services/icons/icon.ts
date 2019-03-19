import { NbIconPackParams } from './icon-pack';

export interface NbIconOptions {
  [name: string]: any;
}

export interface NbIcon {
  getAttributes(options?: NbIconOptions): any;
  render(options?: NbIconOptions): string;
}

export class NbFontIcon implements NbIcon {

  constructor(protected name, protected content: any, protected params: NbIconPackParams = {}) {}

  getAttributes(options?: NbIconOptions) {
    const name = this.params.iconPrefix ? `${this.params.iconPrefix}-${this.name}` : this.name;

    return {
      'class': this.params.packClass ? `${name} ${this.params.packClass}` : name,
    };
  }

  render(options?: NbIconOptions): string {
    return this.content;
  }
}

export class NbSvgIcon implements NbIcon {

  constructor(protected name, protected content: any, protected params: NbIconPackParams = {}) {}

  getAttributes(options?: NbIconOptions) {
    if (this.params.packClass) {
      return {
        'class': `${this.params.packClass}`,
      };

    }
    return {};
  }

  render(options?: NbIconOptions): string {
    return this.content;
  }
}
