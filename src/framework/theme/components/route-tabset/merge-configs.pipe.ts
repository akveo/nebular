import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mergeConfigs',
})
export class MergeConfigsPipe implements PipeTransform {
  transform<Config>(...configs: Config[]): Config {
    return Object.assign({}, ...configs);
  }
}
