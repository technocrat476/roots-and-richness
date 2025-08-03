
import { products } from '@/data/products';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
}

const generateSitemap = (): string => {
  const baseUrl = 'https://rootsandrichness.in';
  const currentDate = new Date().toISOString().split('T')[0];

  const urls: SitemapUrl[] = [
    // Static pages with proper priorities
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/products`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/faq`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    // Policy pages
    {
      loc: `${baseUrl}/policies/privacy-policy`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: `${baseUrl}/policies/terms-and-conditions`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: `${baseUrl}/policies/shipping-policy`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.4
    },
    {
      loc: `${baseUrl}/policies/return-refund-policy`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.4
    }
  ];

  // Add product pages with image information
  products.forEach(product => {
    urls.push({
      loc: `${baseUrl}/products/${product.slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: product.featured ? 0.8 : 0.7,
      images: product.images.map(image => ({
        loc: image,
        title: `${product.name} - Premium wood-pressed oil from Roots and Richness`,
        caption: product.shortDescription
      }))
    });
  });

  // Generate XML with image sitemap support
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
    ${url.images ? url.images.map(img => `<image:image>
      <image:loc>${img.loc}</image:loc>
      ${img.title ? `<image:title>${img.title}</image:title>` : ''}
      ${img.caption ? `<image:caption>${img.caption}</image:caption>` : ''}
    </image:image>`).join('\n    ') : ''}
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
};

export default generateSitemap;
