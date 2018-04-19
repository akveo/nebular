/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  NbThemeModule,
  NbSidebarModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbTabsetModule,
} from '@nebular/theme';
import { NgdAppComponent } from './app.component';
import { routes } from './app.routes';
import { NgdHomepageComponent } from './homepage/homepage.component';
import { DocsService } from './docs/docs.service';
import { NgdDocsComponent } from './docs/docs.component';
import { NgdPageComponent } from './docs/page/page.component';
import { NgdMarkdownComponent } from './docs/page/blocks/markdown/ngd-markdown-block.component';
import { NgdPropsBlockComponent } from './docs/page/blocks/basic-blocks/ngd-props-block.component';
import { NgdMethodsBlockComponent } from './docs/page/blocks/basic-blocks/ngd-methods-block.component';
import { NgdDescriptionDirective } from './docs/utils/ngd-description.directive';
import { NgdBlockComponent } from './docs/page/blocks/ngd-block.component';
import { NgdTabbedBlockComponent } from './docs/page/blocks/tabbed-block/ngd-tabbed-block.component';
import { NgdLiveExampleComponent } from './docs/page/blocks/live-example/ngd-live-example.component';

import { NgdHeaderComponent } from './components/header/ngd-header.component';
import { NgdFooterComponent } from './components/footer/ngd-footer.component';
import { NgdStylesBlockComponent } from './docs/page/blocks/basic-blocks/ngd-styles-block.component';
import { NgdOverviewBlockComponent } from './docs/page/blocks/basic-blocks/ngd-overview-block.component';
import { NgdComponentBlockComponent } from './docs/page/blocks/ngd-component-block.component';
import { NgdFragmentDirective } from './docs/utils/ngd-fragment.directive';
import { NgdThemeComponent } from './docs/page/blocks/ngd-theme-block.component';
import { NgdSassPropValueDirective } from './docs/utils/ngd-color-swatch.directive';
import { SwiperModule } from 'angular2-useful-swiper';
import { Analytics } from './docs/utils/analytics.service';
import { BlockHelperService } from './docs/utils/block-helper.service';
import { NgdExampleRendererComponent } from './components/example/example-renderer.component';
import { IframeCommunicatorService } from './components/example/iframe-communicator';
import { NgdCodeBlockComponent } from './docs/page/blocks/basic-blocks/ngd-code-block.component';
import { NgdInlineExampleComponent } from './docs/page/blocks/inline-example/ngd-inline-example.component';
import { NgdTabbedExampleComponent } from './docs/page/blocks/inline-example/ngd-tabbed-example.component';
import { NgdExampleComponent } from './docs/page/blocks/inline-example/ngd-example.component';
import { CodeLoaderService } from './docs/utils/code-loader.service';
import { NgdMarkdownFileComponent } from './docs/page/blocks/markdown/ngd-markdown-file.component';
import { NgdHighlightService } from './docs/utils/highlight.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NbThemeModule,
    NbSidebarModule,
    NbCardModule,
    SwiperModule,
    NbLayoutModule,
    NbTabsetModule,
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: 'docs' }),
    NbSidebarModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  declarations: [
    NgdAppComponent,
    NgdHomepageComponent,
    NgdDocsComponent,
    NgdPageComponent,
    NgdMarkdownComponent,
    NgdPropsBlockComponent,
    NgdMethodsBlockComponent,
    NgdDescriptionDirective,
    NgdHeaderComponent,
    NgdFooterComponent,
    NgdStylesBlockComponent,
    NgdComponentBlockComponent,
    NgdFragmentDirective,
    NgdThemeComponent,
    NgdBlockComponent,
    NgdTabbedBlockComponent,
    NgdOverviewBlockComponent,
    NgdLiveExampleComponent,
    NgdSassPropValueDirective,
    NgdExampleRendererComponent,
    NgdInlineExampleComponent,
    NgdCodeBlockComponent,
    NgdTabbedExampleComponent,
    NgdExampleComponent,
    NgdMarkdownFileComponent,
  ],
  providers: [
    IframeCommunicatorService,
    NgdHighlightService,
    CodeLoaderService,
    BlockHelperService,
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
