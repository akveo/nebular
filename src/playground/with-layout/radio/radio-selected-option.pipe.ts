import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedOption',
})
export class SelectedOptionPipe implements PipeTransform {
  transform(option: string): string {
    return option ? `Selected item is ${option}` : 'Item is not selected';
  }
}
