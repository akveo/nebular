import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nbMergeConfigs',
    standalone: false
})
export class NbMergeConfigsPipe implements PipeTransform {
  transform<Config>(...configs: Config[]): Config {
    return Object.assign({}, ...configs);
  }
}
