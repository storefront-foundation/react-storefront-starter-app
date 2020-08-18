import React from 'react'
import Document, { Head, Main } from 'next/document'
import NextScript from 'react-storefront/NextScript'
import { ServerStyleSheets } from '@material-ui/core/styles'
import theme from '../components/theme'
import renderAmp from 'react-storefront-amp/renderAmp'
import { LazyStyles } from 'react-storefront/LazyHydrate'

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="preconnect" href="https://opt.moovweb.net" crossOrigin="true" />
          <LazyStyles />
        </Head>
        <body>
          <Main />
          <NextScript mode="defer" />
        </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  const isAmp = ctx.req.url.includes('amp=1')

  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.res.setHeader('service-worker-allowed', '/')

  ctx.renderPage = async () => {
    const document = originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    })

    return isAmp ? await renderAmp(document, sheets, ctx.req.url) : document
  }

  const initialProps = await Document.getInitialProps(ctx)

  function getStyles() {
    if (isAmp) {
      const index = initialProps.head.findIndex(item => item.key === 'amp-custom')
      const css = initialProps.head[index].props['amp-custom']
      // Remove unneeded style tag
      initialProps.head.splice(index, 1)
      return (
        <>
          {initialProps.styles}
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </>
      )
    } else {
      return (
        <>
          {initialProps.styles}
          {sheets.getStyleElement()}
        </>
      )
    }
  }

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: getStyles(),
  }
}

export default MyDocument
