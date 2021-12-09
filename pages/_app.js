import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import theme from '../components/theme'
import Header from '../components/Header'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
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
import Router from 'next/router'
import '../components/rum'
import PropTypes from 'prop-types'

installAmpOverrides()

const PREFIX = '_app'

const classes = {
  main: `${PREFIX}-main`,
}

const Main = styled('main')(() => ({
  [`&.${classes.main}`]: {
    paddingTop: 3,
  },
}))
export default function MyApp({ Component, pageProps }) {
  useJssStyles()
  const [appData] = useAppStore(pageProps || {})

  // Setting global clientDidNavigate which is used by RSF LazyHydrate
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      window.clientDidNavigate = true
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <PWA errorReporter={reportError}>
        <AmpProvider>
          <SessionProvider url="/api/session">
            <Analytics>
              <CssBaseline />
              <Header menu={appData && appData.menu} />
              <NavBar tabs={appData && appData.tabs} />
              <Main className={classes.main}>
                <Component {...pageProps} />
              </Main>
            </Analytics>
          </SessionProvider>
        </AmpProvider>
      </PWA>
    </ThemeProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}
