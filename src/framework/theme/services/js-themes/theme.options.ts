export interface NbJSThemeOptions {
  name: string;
  base?: string;
  variables?: NbJSThemeVariable;
}

export interface NbJSThemeVariable {
  [key: string]: string | string[] | NbJSThemeVariable;
}
