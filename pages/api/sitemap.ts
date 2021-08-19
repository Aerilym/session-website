import { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync } from 'fs';
import { METADATA } from '@/constants';
import { fetchBlogEntries, fetchPages } from '@/services/cms';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const baseUrl = {
    development: 'http://localhost:3000',
    test: 'http://localhost:3000',
    production: METADATA.HOST_URL,
  }[process.env.NODE_ENV];

  const staticPages = readdirSync('pages')
    .filter((page) => {
      return ![
        '.DS_Store',
        '_app.tsx',
        '_document.tsx',
        '_error.tsx',
        '404.tsx',
        '[slug].tsx',
        'sitemap.xml.tsx',
        'api',
      ].includes(page);
    })
    .map((pagePath) => {
      if (pagePath.includes('index')) {
        pagePath = '';
      } else {
        pagePath = pagePath.split('.tsx')[0];
      }
      return `${baseUrl}/${pagePath}`;
    });

  const { entries: _dynamicPages, total: totalPages } = await fetchPages();
  const dynamicPages = _dynamicPages.map((page) => {
    return `${baseUrl}/${page.slug}`;
  });

  const { entries: _blogPages, total: totalBlogPages } =
    await fetchBlogEntries();
  const blogPages = _blogPages.map((page) => {
    return {
      url: `${baseUrl}/blog/${page.slug}`,
      published: page.publishedDateISO,
    };
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[...staticPages, ...dynamicPages]
        .map((url) => {
          return `
          <url>
            <loc>${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>
        `;
        })
        .join('')}
      ${blogPages
        .map((post) => {
          return `
            <url>
              <loc>${post.url}</loc>
              <lastmod>${post.published}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
