import { Rule } from '@angular-devkit/schematics';
import { Path } from '@angular-devkit/core';
export declare function newComponent(options: any): Rule;
export declare function parseName(path: string, name: string): {
    name: string;
    path: Path;
};
