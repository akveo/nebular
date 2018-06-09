import { ComponentFactoryResolver, ComponentRef, Injectable, TemplateRef, Type } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';
import { NbPortalComponent } from '../portal/portal.component';
import { NbThemeService } from '../../services/theme.service';

export type NbPortalContent = string | TemplateRef<any> | Type<any>;

export class NbPortal {
  content: NbPortalContent;
  context?: Object;
}

@Injectable()
export class NbPortalOutlet {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private themeService: NbThemeService) {
  }

  create(portal: NbPortal): Observable<any> {
    const factory = this.componentFactoryResolver.resolveComponentFactory(NbPortalComponent);
    return this.themeService.appendToLayoutTop(factory)
      .pipe(
        map((ref: ComponentRef<NbPortalComponent>) => this.patchContainer(ref, portal)),
        tap((ref: ComponentRef<NbPortalComponent>) => this.performChangeDetection(ref)),
      )
  }

  private patchContainer(ref: ComponentRef<any>, { content, context }: NbPortal): ComponentRef<any> {
    ref.instance.content = content;
    ref.instance.context = context;
    return ref;
  }

  private performChangeDetection(ref: ComponentRef<any>) {
    /*
     * Have to call detectChanges because on this phase {@link NbPortalComponent} isn't inserted in the DOM
     * and haven't got calculated size.
     * But we should have size on this step to calculate popover position correctly.
     * */
    ref.changeDetectorRef.markForCheck();
    ref.changeDetectorRef.detectChanges();
  }
}
