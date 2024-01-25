import './globals.scss'
import GlobalHeader from './components/global-header/GlobalHeader'
import GlobalFooter from './components/global-footer/GlobalFooter'

export const metadata = {
  title: {
    template: '%s | PDMedcalc',
    default: 'PDMedcalc',
  },
  author: 'James Fisher',
  description: "PD Medcalc is a tool that converts a patient's usual Parkinson's Disease medications to a 'Levodopa equivalent dose' of dispersible madopar and rotigotine patch.",
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
