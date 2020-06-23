import React from 'react'
import Link from 'react-storefront/link/Link'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useLazyState from 'react-storefront/hooks/useLazyState'
import LoadMask from 'react-storefront/LoadMask'
import Head from 'next/head'
import createLazyProps from 'react-storefront/props/createLazyProps'
import fetchFromAPI from 'react-storefront/props/fetchFromAPI'
import get from 'lodash/get'
import { TrackPageView } from 'react-storefront-analytics'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(5, 0, 0, 0),
  },
  heading: {
    textAlign: 'center',
    marginTop: 50,
  },
  link: {
    textDecoration: 'none',
  },
}))

export default function Index(lazyProps) {
  const classes = useStyles()
  const [state] = useLazyState(lazyProps)

  return (
    <>
      {state.loading ? null : (
        <Head>
          <title>{get(state, 'pageData.title')}</title>
        </Head>
      )}
      <Container maxWidth="lg">
        {state.loading ? (
          <LoadMask fullscreen />
        ) : (
          <>
            <TrackPageView />
            <Typography variant="h4" className={classes.heading}>
              Home
            </Typography>
            <div className={classes.main}>
              <Link as="/account" href="/account" className={classes.link}>
                Account
              </Link>
            </div>
          </>
        )}
      </Container>
    </>
  )
}

Index.getInitialProps = createLazyProps(fetchFromAPI)

export const config = { amp: 'hybrid' }
