import { Pipe, PipeTransform } from '@angular/core';

const defaultMimeIcon = { pack: 'eva', icon: 'file-text-outline' };

@Pipe({
  name: 'nbChatMimeToIcon',
  pure: true,
})
export class NbChatMimeToIconPipe implements PipeTransform {
  transform(map: Map<string, { pack: string; icon: string }>, mime: string): { pack: string; icon: string } {
    if (map.size === 0) return defaultMimeIcon;

    const icon = map.get(mime);

    return icon || defaultMimeIcon;
  }
}
