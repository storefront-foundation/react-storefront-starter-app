import React, { useContext, useState, useEffect, useRef } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import clsx from 'clsx'
import Head from 'next/head'
import useLazyState from 'react-storefront/hooks/useLazyState'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import CmsSlot from 'react-storefront/CmsSlot'
import MediaCarousel from 'react-storefront-amp/carousel/AmpMediaCarousel'
import PWAContext from 'react-storefront/PWAContext'
import { Container, Grid, Typography, Hidden, Button, Skeleton } from '@mui/material'
import Row from 'react-storefront/Row'
import { Hbox } from 'react-storefront/Box'
import Label from 'react-storefront/Label'
import Rating from 'react-storefront/Rating'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import HiddenInput from 'react-storefront-amp/HiddenInput'
import SessionContext from 'react-storefront/session/SessionContext'
import AddToCartConfirmation from '../../components/product/AddToCartConfirmation'
import SuggestedProducts from '../../components/product/SuggestedProducts'
import Lazy from 'react-storefront/Lazy'
import TabPanel from 'react-storefront-amp/AmpTabPanel'
import Text from 'react-storefront-amp/Text'
import DataBindingProvider from 'react-storefront-amp/bind/DataBindingProvider'
import QuantitySelector from 'react-storefront-amp/AmpQuantitySelector'
import ProductOptionSelector from 'react-storefront-amp/option/AmpProductOptionSelector'
import { TrackPageView } from 'react-storefront-analytics'
import { useAmp } from 'next/amp'
import fetchFromAPI from 'react-storefront/props/fetchFromAPI'
import { fetchLatest, StaleResponseError } from 'react-storefront/utils'
import qs from 'querystring'
import getAPIURL from 'react-storefront/api/getAPIURL'
import LazyHydrate from 'react-storefront/LazyHydrate'

const PREFIX = 'Product'

const defaultClasses = {
  carousel: `${PREFIX}-carousel`,
  lightboxCarousel: `${PREFIX}-lightboxCarousel`,
  confirmation: `${PREFIX}-confirmation`,
  dockedSnack: `${PREFIX}-dockedSnack`,
  docked: `${PREFIX}-docked`,
  noShadow: `${PREFIX}-noShadow`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${defaultClasses.carousel}`]: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, -2),
      width: '100vw',
    },
  },

  [`& .${defaultClasses.lightboxCarousel}`]: {
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      width: '100%',
    },
  },

  [`& .${defaultClasses.confirmation}`]: {
    padding: '2px 0',
  },

  [`& .${defaultClasses.dockedSnack}`]: {
    [theme.breakpoints.down('sm')]: {
      left: '0',
      bottom: '0',
      right: '0',
    },
  },

  [`& .${defaultClasses.docked}`]: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.subtitle1.fontSize,
      padding: theme.spacing(2),
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 10,
      borderRadius: '0',
    },
  },

  [`& .${defaultClasses.noShadow}`]: {
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
    },
  },
}))

const fetchVariant = fetchLatest(fetch)

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false)
  useEffect(() => {
    if (didMount.current) {
      func()
    } else {
      didMount.current = true
    }
  }, deps)
}

const Product = React.memo(lazyProps => {
  const theme = useTheme()
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [addToCartInProgress, setAddToCartInProgress] = useState(false)
  const [errorBoxMessage, setErrorBoxMessage] = useState(null)
  const [state, updateState] = useLazyState(lazyProps, {
    pageData: { quantity: 1, carousel: { index: 0 } },
  })

  const product = get(state, 'pageData.product') || {}
  const color = get(state, 'pageData.color') || {}
  const size = get(state, 'pageData.size') || {}
  const hasColors = !isEmpty(product.colors)
  const hasSizes = !isEmpty(product.sizes)
  const quantity = get(state, 'pageData.quantity')
  const { actions } = useContext(SessionContext)
  const { loading } = state

  // This is provided when <ForwardThumbnail> is wrapped around product links
  const { thumbnail } = useContext(PWAContext)

  // Adds an item to the cart
  const handleSubmit = async event => {
    event.preventDefault() // prevent the page location from changing
    setAddToCartInProgress(true) // disable the add to cart button until the request is finished
    setErrorBoxMessage(null)

    try {
      if (!color.id && product.hasColors) {
        setErrorBoxMessage('Please select color')
        return
      }
      if (!size.id && product.hasSizes) {
        setErrorBoxMessage('Please select size')
        return
      }

      // send the data to the server
      try {
        await actions.addToCart({
          product,
          quantity,
          color: color.id,
          size: size.id,
        })
      } catch (error) {
        setErrorBoxMessage(error.message)
      }

      // open the confirmation dialog
      setConfirmationOpen(true)
    } finally {
      // re-enable the add to cart button
      setAddToCartInProgress(false)
    }
  }

  const header = (
    <Row>
      <Typography variant="h6" component="h1" gutterBottom>
        {product ? <Text bind="product.name" /> : <Skeleton style={{ height: '1em' }} />}
      </Typography>
      <Hbox>
        <Typography style={{ marginRight: theme.spacing(2) }}>
          <Text bind="product.priceText" />
        </Typography>
        <Rating value={product.rating} reviewCount={10} />
      </Hbox>
    </Row>
  )

  // Fetch variant data upon changing color or size options
  useDidMountEffect(() => {
    const query = qs.stringify({ color: color.id, size: size.id }, { addQueryPrefix: true })
    fetchVariant(`/api/p/${product.id}${query}`)
      .then(res => res.json())
      .then(data => {
        return updateState({ ...state, pageData: { ...state.pageData, ...data.pageData } })
      })
      .catch(e => {
        if (!StaleResponseError.is(e)) {
          throw e
        }
      })
  }, [color.id, size.id])

  const classes = { ...defaultClasses }

  return (
    <DataBindingProvider
      // If data is not already available in the model during SSR,
      // you can instruct the DataBindingProvider to fetch new state
      // when the `remote` URL changes.
      //
      // If no data will need to be fetched and is available in the page state
      // this property is not needed and should be removed
      remote={getAPIURL('/p/{product.id}?color={color.id}&size={size.id}')}
      store={state}
      updateStore={updateState}
      root="pageData"
    >
      {useAmp() && (
        <Head>
          <script
            async
            custom-element="amp-form"
            src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
          />
        </Head>
      )}
      {!loading && <TrackPageView />}
      <Root>
        <Breadcrumbs items={!loading && state.pageData.breadcrumbs} />
        <Container maxWidth="lg" style={{ paddingTop: theme.spacing(2) }}>
          <form
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit}
            method="post"
            action-xhr="/api/cart/add"
          >
            <Grid container spacing={4}>
              <HiddenInput name="id" bind="product.id" />
              <HiddenInput name="sku" bind="product.sku" />
              <HiddenInput name="isConfigurableProduct" bind="product.isConfigurableProduct" />
              <Grid item xs={12} sm={6} md={5}>
                <Hidden implementation="css" smUp>
                  {header}
                </Hidden>
                <LazyHydrate id="carousel" on="touch">
                  <MediaCarousel
                    className={classes.carousel}
                    lightboxClassName={classes.lightboxCarousel}
                    thumbnail={thumbnail.current}
                    height="100%"
                    bind={{
                      media: ['color.media', 'product.media'],
                    }}
                  />
                </LazyHydrate>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <LazyHydrate id="options">
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Hidden implementation="css" smDown>
                        <div style={{ paddingBottom: theme.spacing(1) }}>{header}</div>
                      </Hidden>
                      {product ? (
                        <>
                          {errorBoxMessage && (
                            <Hbox style={{ marginBottom: 10 }}>
                              <Typography color="error">{errorBoxMessage}</Typography>
                            </Hbox>
                          )}
                          {hasColors && (
                            <>
                              <Hbox style={{ marginBottom: 10 }}>
                                <Label>COLOR: </Label>
                                <Typography>
                                  <HiddenInput name="color" bind="color.id" />
                                  <Text bind="color.text" />
                                </Typography>
                              </Hbox>
                              <ProductOptionSelector
                                optionProps={{
                                  showLabel: false,
                                }}
                                strikeThroughDisabled
                                bind={{ value: 'color', options: 'product.colors' }}
                              />
                            </>
                          )}
                        </>
                      ) : (
                        <div>
                          <Skeleton
                            style={{ height: 14, marginBottom: theme.spacing(2) }}
                          ></Skeleton>
                          <Hbox>
                            <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                            <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                            <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                          </Hbox>
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      {product ? (
                        <>
                          {hasSizes && (
                            <>
                              <Hbox style={{ marginBottom: 10 }}>
                                <Label>SIZE: </Label>
                                <Typography>
                                  <HiddenInput name="size" bind="size.id" />
                                  <Text bind="size.text" />
                                </Typography>
                              </Hbox>
                              <ProductOptionSelector
                                strikeThroughDisabled
                                bind={{ value: 'size', options: 'product.sizes' }}
                              />
                            </>
                          )}
                        </>
                      ) : (
                        <div>
                          <Skeleton
                            style={{ height: 14, marginBottom: theme.spacing(2) }}
                          ></Skeleton>
                          <Hbox>
                            <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                            <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                            <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                          </Hbox>
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Hbox>
                        <Label>QTY:</Label>
                        <QuantitySelector bind="quantity" />
                      </Hbox>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        key="button"
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        data-th="add-to-cart"
                        className={clsx(classes.docked, classes.noShadow)}
                        disabled={addToCartInProgress}
                      >
                        Add to Cart
                      </Button>
                      <AddToCartConfirmation
                        open={confirmationOpen}
                        setOpen={setConfirmationOpen}
                        product={product}
                        color={color}
                        size={size}
                        quantity={quantity}
                        price={product.priceText}
                      />
                    </Grid>
                  </Grid>
                </LazyHydrate>
              </Grid>
            </Grid>
            <LazyHydrate id="info" on="fui">
              <>
                <Grid item xs={12}>
                  <TabPanel>
                    <CmsSlot label="Description">{product.description}</CmsSlot>
                    <CmsSlot label="Specs">{product.specs}</CmsSlot>
                  </TabPanel>
                </Grid>
                {!useAmp() && (
                  <Grid item xs={12}>
                    <Lazy style={{ minHeight: 285 }}>
                      <SuggestedProducts product={product} />
                    </Lazy>
                  </Grid>
                )}
              </>
            </LazyHydrate>
          </form>
        </Container>
      </Root>
    </DataBindingProvider>
  )
})

export async function getServerSideProps(opts) {
  return fetchFromAPI(opts)
}

export const config = { amp: 'hybrid' }
export default Product
