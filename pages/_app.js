import React from 'react'
import theme from '../components/theme'
import Header from '../components/Header'
import { CssBaseline } from '@material-ui/core'
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles'
import PWA from 'react-storefront/PWA'
import NavBar from '../components/NavBar'
import reportError from '../components/reportError'
import useJssStyles from 'react-storefront/hooks/useJssStyles'
import installAmpOverrides from 'react-storefront-amp/installAmpOverrides'
import Analytics from '../components/Analytics'
import SessionProvider from 'react-storefront/session/SessionProvider'
import AmpProvider from 'react-storefront-amp/AmpProvider'
import useAppStore from 'react-storefront/hooks/useAppStore'
import 'typeface-roboto'

installAmpOverrides()

const styles = theme => ({
  main: {
    paddingTop: 3,
  },
})

const useStyles = makeStyles(styles)

export default function MyApp({ Component, pageProps }) {
  useJssStyles()
  const classes = useStyles()
  const [appData] = useAppStore(pageProps || {})

  return (
    <PWA errorReporter={reportError}>
      <AmpProvider>
        <SessionProvider url="/api/session">
          <MuiThemeProvider theme={theme}>
            <Analytics>
              <CssBaseline />
              <Header menu={appData && appData.menu} />
              <NavBar tabs={appData && appData.tabs} />
              <main className={classes.main}>
                <Component {...pageProps} />
              </main>
            </Analytics>
          </MuiThemeProvider>
        </SessionProvider>
      </AmpProvider>
    </PWA>
  )
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  // Preconnecting to the optimizer host
  ctx.res.setHeader('link', '<https://opt.moovweb.net>; rel=preconnect')

  return { pageProps }
}
