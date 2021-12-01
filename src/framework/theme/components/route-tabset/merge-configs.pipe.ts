import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nbMergeConfigs',
})
export class NbMergeConfigsPipe implements PipeTransform {
  transform<Config>(...configs: Config[]): Config {
    return Object.assign({}, ...configs);
  }
}
