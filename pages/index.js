import React from 'react'
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material'
import useLazyState from 'react-storefront/hooks/useLazyState'
import CmsSlot from 'react-storefront/CmsSlot'
import LoadMask from 'react-storefront/LoadMask'
import Head from 'next/head'
import createLazyProps from 'react-storefront/props/createLazyProps'
import fetchFromAPI from 'react-storefront/props/fetchFromAPI'

const PREFIX = 'index';

const classes = {
  main: `${PREFIX}-main`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.main}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0),
  }
}));

export default function Index(lazyProps) {

  const [state] = useLazyState(lazyProps)

  return (
    (<Root>
      {state.loading ? null : (
        <Head>
          <title>{state.pageData.title}</title>
        </Head>
      )}
      <Container maxWidth="lg">
        {state.loading ? (
          <LoadMask fullscreen />
        ) : (
          <div className={classes.main}>
            <Typography variant="h3" component="h1" gutterBottom color="primary">
              {state.pageData.slots.heading}
            </Typography>
            <CmsSlot>{state.pageData.slots.description}</CmsSlot>
          </div>
        )}
      </Container>
    </Root>)
  );
}

Index.getInitialProps = createLazyProps(options => {
  const { res } = options
  if (res) res.setHeader('Cache-Control', 'max-age=99999')
  return fetchFromAPI(options)
})
