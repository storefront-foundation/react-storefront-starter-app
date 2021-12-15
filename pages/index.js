import React from 'react'
import { styled } from '@mui/material/styles'
import { Container, Typography } from '@mui/material'
import CmsSlot from 'react-storefront/CmsSlot'
import Head from 'next/head'
import fetchServerSideProps from 'react-storefront/props/fetchServerSideProps'
import { TrackPageView } from 'react-storefront-analytics'

const PREFIX = 'index'

const classes = {
  main: `${PREFIX}-main`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.main}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0),
  },
}))

export default function Index(lazyProps) {
  return (
    <Root>
      <Head>
        <title>{lazyProps.pageData.title}</title>
      </Head>
      <Container maxWidth="lg">
        <TrackPageView />
        <div className={classes.main}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            {lazyProps.pageData.slots.heading}
          </Typography>
          <CmsSlot>{lazyProps.pageData.slots.description}</CmsSlot>
        </div>
      </Container>
    </Root>
  )
}

export const config = { amp: 'hybrid' }
export const getServerSideProps = fetchServerSideProps
