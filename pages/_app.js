import Head from 'next/head'
import React from 'react'
import theme from '../components/theme'
import Header from '../components/Header'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import PWA from 'react-storefront/PWA'
import NavBar from '../components/NavBar'
import reportError from '../components/reportError'
import useJssStyles from 'react-storefront/hooks/useJssStyles'
import SessionProvider from 'react-storefront/session/SessionProvider'
import useAppStore from 'react-storefront/hooks/useAppStore'

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
    <ThemeProvider theme={theme}>
      <PWA errorReporter={reportError}>
        <Head>
          {/* <meta
          key="viewport"
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        /> */}
        </Head>
        <SessionProvider url="/api/session">
          <StyledEngineProvider injectFirst>
            <CssBaseline />
            <Header menu={appData && appData.menu} />
            <NavBar tabs={appData && appData.tabs} />
            <main className={classes.main}>
              <Component {...pageProps} />
            </main>
          </StyledEngineProvider>
        </SessionProvider>
      </PWA>
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}
