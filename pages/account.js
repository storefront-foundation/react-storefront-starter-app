import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useLazyState from 'react-storefront/hooks/useLazyState'
import Head from 'next/head'
import createLazyProps from 'react-storefront/props/createLazyProps'
import fetchFromAPI from 'react-storefront/props/fetchFromAPI'
import get from 'lodash/get'
import LoginForm from '../components/LoginForm'
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
        <Typography variant="h4" className={classes.heading}>
          Account
        </Typography>
        <TrackPageView />
        <div className={classes.main}>
          <LoginForm />
        </div>
      </Container>
    </>
  )
}

Index.getInitialProps = createLazyProps(fetchFromAPI)

export const config = { amp: 'hybrid' }
