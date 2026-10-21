import type { Metadata } from 'next';
import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/500.css';
import '@fontsource/vazirmatn/600.css';
import '@fontsource/vazirmatn/700.css';
import '@fontsource/vazirmatn/800.css';
import './globals.css';
import { Header, Footer } from '@/components/Shell';
import JourneyAnalytics from '@/components/JourneyAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://hamrah.me'),
  title: { default: 'HMB | همراهِ مسیر معامله‌گری شما', template: '%s | HMB' },
  description: 'آموزش، تمرین هدفمند و ژورنال معاملاتی؛ مسیری برای شناخت تصمیم‌ها و برداشتن قدم بعدی با بازخورد انسانی.',
  robots: { index: false, follow: false },
  icons: { icon: '/icon.svg' },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="fa" dir="rtl"><body><a className="skip-link" href="#main">رفتن به محتوای اصلی</a><Header/><main id="main">{children}</main><Footer/><JourneyAnalytics/></body></html>;
}
