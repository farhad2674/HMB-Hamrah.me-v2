import type { Metadata } from 'next';
import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/500.css';
import '@fontsource/vazirmatn/600.css';
import '@fontsource/vazirmatn/700.css';
import './globals.css';
import './pro.css';
import './brand.css';
import './subpages.css';
import './workspaces.css';
import './motion.css';
import './artwork.css';
import { Header, Footer } from '@/components/Shell';
import JourneyAnalytics from '@/components/JourneyAnalytics';
import MotionObserver from '@/components/MotionObserver';
import { isPublicSite, JsonLd, organizationSchema, websiteSchema } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL('https://hamrah.me'),
  title: { default: 'همراه | آموزش فارکس، ژورنال و کوچینگ معامله‌گری', template: '%s | همراه' },
  description: 'هر تصمیم، پشتوانه‌ای می‌خواهد. آموزش فارکس، تمرین هدفمند، ژورنال معاملاتی و کوچینگ؛ مسیرهای یادگیری همراه را بررسی کنید.',
  applicationName: 'همراه',
  category: 'education',
  alternates: { canonical: 'https://hamrah.me/' },
  openGraph: { type:'website',locale:'fa_IR',siteName:'همراه',url:'https://hamrah.me/',title:'همراه | آموزش فارکس، ژورنال و کوچینگ معامله‌گری',description:'فارکس را از مفاهیم پایه تا ساخت پلن معاملاتی یاد بگیرید؛ با تمرین در محیط آزمایشی، ژورنال و بازخورد.',images:[{url:'/opengraph-image',width:1200,height:630,alt:'همراه؛ آموزش فارکس با تمرین و ژورنال معاملاتی'}] },
  twitter: { card:'summary_large_image',title:'همراه | آموزش فارکس، ژورنال و کوچینگ معامله‌گری',description:'آموزش فارکس از پایه، همراه با تمرین، ژورنال معاملاتی و بازخورد.',images:['/opengraph-image'] },
  robots: isPublicSite ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: '/icon.svg' },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="fa" dir="rtl"><body><JsonLd data={[organizationSchema,websiteSchema]}/><a className="skip-link" href="#main">رفتن به محتوای اصلی</a><Header/><div className="reading-progress" aria-hidden="true"><span/></div><main id="main">{children}</main><Footer/><JourneyAnalytics/><MotionObserver/></body></html>;
}
