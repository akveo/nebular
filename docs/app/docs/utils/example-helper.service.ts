import { Injectable } from '@angular/core';

@Injectable()
export class ExampleHelperService {

  private extensions = ['ts', 'html', 'scss'];

  public isFull(path: string): boolean {
    return !this.extensions.some(extension => path.endsWith(extension));
  }

  public fullExampleFiles(path: string): string[] {
    return this.extensions.map(extension => `${path}.${extension}`);
  }
}
