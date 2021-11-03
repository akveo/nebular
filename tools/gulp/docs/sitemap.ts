/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { task } from 'gulp';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { structure as DOCS } from '../../../docs/structure';
import { DOCS_DIST, DOCS_SITE_URL } from '../config';
import { flattenLeafs, routesTree } from './docs-utils';

task('create-sitemap', (done) => {
  const docsPages = flattenLeafs('docs', routesTree(DOCS));
  createSitemap(docsPages);

  done();
});

function createSitemap(docsPages) {
  const sitemap = getSitemap(docsPages);
  writeFileSync(join(DOCS_DIST, 'sitemap.xml'), sitemap);
}

function getSitemap(docsPages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${DOCS_SITE_URL}</loc>
      </url>
      ${getUrlTags(docsPages)}
     </urlset>`;
}

function getUrlTags(docsPages) {
  return docsPages
    .map((pageUrl) => {
      return `
     <url>
       <loc>${DOCS_SITE_URL}${pageUrl}</loc>
     </url>`;
    })
    .join('');
}
