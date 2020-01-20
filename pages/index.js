import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useLazyStore from 'react-storefront/hooks/useLazyStore'
import CmsSlot from 'react-storefront/CmsSlot'
import fetchProps from 'react-storefront/props/fetchProps'
import LoadMask from 'react-storefront/LoadMask'
import Head from 'next/head'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0),
  },
}))

export default function Index(lazyProps) {
  const classes = useStyles()
  const [store] = useLazyStore(lazyProps)

  return (
    <>
      {store.loading ? null : (
        <Head>
          <title>{store.pageData.title}</title>
        </Head>
      )}
      <Container maxWidth="lg">
        {store.loading ? (
          <LoadMask fullscreen />
        ) : (
          <div className={classes.main}>
            <Typography variant="h3" component="h1" gutterBottom color="primary">
              {store.pageData.slots.heading}
            </Typography>
            <CmsSlot>{store.pageData.slots.description}</CmsSlot>
          </div>
        )}
      </Container>
    </>
  )
}

Index.getInitialProps = fetchProps(({ res }) => {
  if (res) res.setHeader('Cache-Control', 'max-age=99999')
  return `/api`
})

export const config = { amp: 'hybrid' }
