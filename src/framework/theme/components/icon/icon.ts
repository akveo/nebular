import { NbFontIconPackParams, NbIconPackParams } from './icon-pack';

export interface NbIconOptions {
  [name: string]: any;
}

export interface NbIcon {
  getClasses(options?: NbIconOptions): string[];
  getContent(options?: NbIconOptions): string;
}

export class NbFontIcon implements NbIcon {

  constructor(protected name, protected content: any, protected params: NbFontIconPackParams = {}) {}

  getClasses(options?: NbIconOptions): string[] {
    const classes = [];

    if (this.params.packClass) {
      classes.push(this.params.packClass);
    }

    const name = this.params.iconClassPrefix ? `${this.params.iconClassPrefix}-${this.name}` : this.name;
    classes.push(name);
    return classes;
  }

  getContent(options?: NbIconOptions): string {
    return this.content;
  }
}

export class NbSvgIcon implements NbIcon {

  constructor(protected name, protected content: any, protected params: NbIconPackParams = {}) {}

  getClasses(options?: NbIconOptions): string[] {
    const classes = [];

    if (this.params.packClass) {
      classes.push(this.params.packClass);
    }
    return classes;
  }

  getContent(options?: NbIconOptions): string {
    return this.content;
  }
}
