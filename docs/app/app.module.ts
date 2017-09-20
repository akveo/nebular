/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  NbThemeModule,
  NbSidebarModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
} from '@nebular/theme';
import { NgdAppComponent } from './app.component';
import { routes } from './app.routes';
import { NgdHomepageComponent } from './homepage/homepage.component';
import { DocsService } from './docs/docs.service';
import { NgdDocsComponent } from './docs/docs.component';
import { NgdPageComponent } from './docs/page/page.component';
import { NgdMarkdownComponent } from './docs/page/blocks/ngd-markdown-block.component';
import { NgdDescriptionBlockComponent } from './docs/page/blocks/basic-blocks/ngd-description-block.component';
import { NgdExamplesBlockComponent } from './docs/page/blocks/basic-blocks/ngd-examples-block.component';
import { NgdPropsBlockComponent } from './docs/page/blocks/basic-blocks/ngd-props-block.component';
import { NgdMethodsBlockComponent } from './docs/page/blocks/basic-blocks/ngd-methods-block.component';
import { NgdDescriptionDirective } from './docs/utils/ngd-description.directive';

import { NgdHighlighterComponent } from './docs/utils/code-highlighter.component';
import { NgdHeaderComponent } from './components/header/ngd-header.component';
import { NgdFooterComponent } from './components/footer/ngd-footer.component';
import { NgdStylesBlockComponent } from './docs/page/blocks/basic-blocks/ngd-styles-block.component';
import { NgdComponentBlockComponent } from './docs/page/blocks/ngd-component-block.component';
import { NgdFragmentDirective } from './docs/utils/ngd-fragment.directive';
import { NgdThemeComponent } from './docs/page/blocks/ngd-theme-block.component';
import { NgdSassPropValueDirective } from './docs/utils/ngd-color-swatch.directive';
import { SwiperModule } from 'angular2-useful-swiper';
import { Analytics } from './docs/utils/analytics.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NbThemeModule,
    NbSidebarModule,
    NbCardModule,
    SwiperModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  declarations: [
    NgdAppComponent,
    NgdHomepageComponent,
    NgdDocsComponent,
    NgdPageComponent,
    NgdMarkdownComponent,
    NgdDescriptionBlockComponent,
    NgdExamplesBlockComponent,
    NgdPropsBlockComponent,
    NgdMethodsBlockComponent,
    NgdDescriptionDirective,
    NgdHighlighterComponent,
    NgdHeaderComponent,
    NgdFooterComponent,
    NgdStylesBlockComponent,
    NgdComponentBlockComponent,
    NgdFragmentDirective,
    NgdThemeComponent,
    NgdSassPropValueDirective,
  ],
  providers: [
    DocsService,
    Analytics,
    Title,
  ],
  entryComponents: [
  ],
  bootstrap: [NgdAppComponent],
})
export class AppModule {
}
