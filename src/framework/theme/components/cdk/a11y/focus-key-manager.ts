import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';

export type NbFocusableOption = FocusableOption;
export class NbFocusKeyManager<T> extends FocusKeyManager<T> {}
