import './globals.scss'
import GlobalHeader from './components/global-header/GlobalHeader'
import GlobalFooter from './components/global-footer/GlobalFooter'

export const metadata = {
  title: {
    template: '%s | PDMedCalc',
    default: 'PDMedCalc',
  },
  author: 'James Fisher',
  description: "A tool to convert Parkinson's Disease medications to a 'Levodopa equivalent dose' of dispersible madopar.",
  openGraph: {
    title: 'PDMedCalc',
    description: "A tool to convert Parkinson's Disease medications to a 'Levodopa equivalent dose' of dispersible madopar.",
    url: 'https://pdmedcalc-v2.pages.dev/',
    siteName: 'PDMedCalc',
    images: [
      {
        url: 'https://media.istockphoto.com/id/1165451954/vector/caduceus.jpg?s=1024x1024&w=is&k=20&c=QYLzxeYCwphOfFV65AI4lrC9BfQNlyPE0HwZ5ip0erc=', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
}
export default function RootLayout({ children }) {
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
  )
}
