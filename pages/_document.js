import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../components/theme'
import renderAmp from 'react-storefront-amp/renderAmp'
import minifyStyles from 'react-storefront/utils/minifyStyles'
import { LazyStyles } from 'react-storefront/LazyHydrate'
import createEmotionCache from '../components/createEmotionCache'
import createEmotionServer from '@emotion/server/create-instance'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
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
      </Html>
    )
  }

  static async getInitialProps(ctx) {
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
    // const sheets = new ServerStyleSheets()

    const originalRenderPage = ctx.renderPage
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    ctx.res.setHeader('service-worker-allowed', '/')

    ctx.renderPage = async () => {
      const document = originalRenderPage({
        enhanceApp: App => props => <App emotionCache={cache} {...props} />,
      })

      return isAmp ? await renderAmp(document, /*sheets*/ null, ctx.req.url) : document
    }

    const initialProps = await Document.getInitialProps(ctx)

    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))

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
        const result = [...React.Children.toArray(initialProps.styles), ...emotionStyleTags]
        return minifyStyles(result)
      }
    }

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: getStyles(),
    }
  }
}

export default MyDocument
