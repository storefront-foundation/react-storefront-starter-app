import React from 'react'
import { Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Head from 'next/head'
import fetchServerSideProps from 'react-storefront/props/fetchServerSideProps'
import get from 'lodash/get'
import LoginForm from '../components/LoginForm'
import { TrackPageView } from 'react-storefront-analytics'

const PREFIX = 'account'

const classes = {
  main: `${PREFIX}-main`,
  heading: `${PREFIX}-heading`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.main}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(5, 0, 0, 0),
  },

  [`& .${classes.heading}`]: {
    textAlign: 'center',
    marginTop: 50,
  },
}))

export default function Index(lazyProps) {
  return (
    <Root>
      <Head>
        <title>{get(lazyProps, 'pageData.title')}</title>
      </Head>
      <Container maxWidth="lg">
        <Typography variant="h4" className={classes.heading}>
          Account
        </Typography>
        <TrackPageView />
        <div className={classes.main}>
          <LoginForm />
        </div>
      </Container>
    </Root>
  )
}

export const getServerSideProps = fetchServerSideProps

export const config = { amp: 'hybrid' }
