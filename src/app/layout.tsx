import type { Metadata } from 'next';
import './globals.scss';
import GlobalHeader from './components/global-header/GlobalHeader';
import GlobalFooter from './components/global-footer/GlobalFooter';

export const metadata: Metadata = {
  title: {
    template: '%s | PDMedCalc',
    default: 'PDMedCalc',
  },
  authors: [{ name: 'James Fisher' }],
  description: "A tool to convert Parkinson's Disease medications to a 'Levodopa equivalent dose' of dispersible madopar.",
  openGraph: {
    title: 'PDMedCalc',
    description: "A tool to convert Parkinson's Disease medications to a 'Levodopa equivalent dose' of dispersible madopar.",
    url: 'https://pdmedcalc-v2.pages.dev/',
    siteName: 'PDMedCalc',
    images: [{ url: 'https://pdmedcalc-v2.pages.dev/og.png' }],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDMedCalc',
    description: "A tool to convert Parkinson's Disease medications to a 'Levodopa equivalent dose' of dispersible madopar.",
    images: ['https://pdmedcalc-v2.pages.dev/og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cfToken = "{'token': '400b8009b1ae4619ae2ff2e5cd84d109'}";
  return (
    <html lang="en">
      <body>
        <GlobalHeader />
        {children}
        <GlobalFooter />
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon={cfToken}></script>
      </body>
    </html>
  );
}
