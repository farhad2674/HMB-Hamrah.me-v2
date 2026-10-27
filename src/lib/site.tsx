import type { Metadata } from 'next';

export const SITE_URL = 'https://hamrah.me';
export const SITE_NAME = 'همراه';
export const isPublicSite = process.env.HMB_PUBLIC_SITE === '1';

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const url = new URL(path, SITE_URL).toString();
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'fa_IR',
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [{ url: image || `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: imageAlt || `${title} — همراه` }],
    },
    robots: noIndex || !isPublicSite ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'HMB',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: 'آموزش ترید فارکس، تمرین هدفمند، ژورنال معاملاتی و کوچینگ برای ساختن یک فرایند تصمیم‌گیری قابل مرور.',
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: 'HMB',
  inLanguage: 'fa-IR',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}
