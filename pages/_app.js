import '../styles/globals.css'
import Script from 'next/script'
function MyApp({ Component, pageProps, test }) {
  return (
    <s>
      <Script src="https://www.google-analytics.com/analytics.js" />
      <Component {...pageProps} />
    </s>
  )
}

export default MyApp
