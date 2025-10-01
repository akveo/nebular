import { Pipe, PipeTransform } from '@angular/core';

const defaultMimeIcon = { pack: 'eva', icon: 'file-text-outline' };

@Pipe({
  name: 'nbChatMimeToIcon',
  pure: true,
  standalone: false,
})
export class NbChatMimeToIconPipe implements PipeTransform {
  transform(map: Map<string, { pack: string; icon: string }>, mime: string): { pack: string; icon: string } {
    if (map.size === 0) return defaultMimeIcon;

    const keys = Array.from(map.keys());
    const key = keys.find((key) => mime.match(new RegExp(key)));
    const iconConfig = map.get(key);

    return iconConfig || defaultMimeIcon;
  }
}
