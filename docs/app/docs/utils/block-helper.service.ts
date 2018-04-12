import { Injectable } from '@angular/core';

@Injectable()
export class BlockHelperService {
  hasTheme(component): boolean {
    return component.styles &&
      component.styles.length > 0;
  }

  hasProps(component): boolean {
    return component &&
      component.props &&
      component.props.length > 0;
  }

  hasMethods(component): boolean {
    return component &&
      component.methods &&
      component.methods.length > 0 &&
      component.methods.some(method => method.shortDescription || method.description);
  }

  hasOverview(component): boolean {
    return component && component.overview && component.overview.length;
  }
}
