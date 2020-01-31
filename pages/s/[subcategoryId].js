import React from 'react'
import { Typography, Grid, Container, Hidden } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ResponsiveTiles from 'react-storefront/ResponsiveTiles'
import ProductItem from '../../components/product/ProductItem'
import ShowMore from 'react-storefront/plp/ShowMore'
import Head from 'next/head'
import BackToTop from 'react-storefront/BackToTop'
import { Skeleton } from '@material-ui/lab'
import { Hbox } from 'react-storefront/Box'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import LoadMask from 'react-storefront/LoadMask'
import useSearchResultsStore from 'react-storefront/plp/useSearchResultsStore'
import Filter from 'react-storefront/plp/Filter'
import SearchResultsProvider from 'react-storefront/plp/SearchResultsProvider'
import ProductOptionSelector from 'react-storefront/option/ProductOptionSelector'
import FilterButton from 'react-storefront/plp/FilterButton'
import SortButton from 'react-storefront/plp/SortButton'
import Fill from 'react-storefront/Fill'
import fetchFromAPI from 'react-storefront/props/fetchFromAPI'
import createLazyProps from 'react-storefront/props/createLazyProps'

const useStyles = makeStyles(theme => ({
  sideBar: {
    margin: theme.spacing(0, 4, 0, 0),
    width: 275,
  },
  sortButton: {
    [theme.breakpoints.down('xs')]: {
      flex: 1,
    },
  },
  total: {
    marginTop: theme.spacing(1),
  },
}))

const Subcategory = lazyProps => {
  const [store, updateStore] = useSearchResultsStore(lazyProps)
  const classes = useStyles()
  const theme = useTheme()
  let { pageData, loading } = store

  return (
    <>
      <Breadcrumbs items={!loading && pageData.breadcrumbs} />
      <SearchResultsProvider store={store} updateStore={updateStore}>
        <Container maxWidth="lg" style={{ paddingTop: theme.spacing(2) }}>
          <Head>{loading ? null : <title>{pageData.title}</title>}</Head>
          <BackToTop />
          <Hbox align="flex-start">
            <Hidden implementation="css" xsDown>
              <div className={classes.sideBar}>
                <Hidden xsDown>
                  {/* Display the filters for desktop screen sizes */}
                  <Filter classes={{ root: classes.sideBar }} expandAll submitOnChange />
                </Hidden>
              </div>
            </Hidden>
            <Grid container style={{ position: 'relative' }}>
              <LoadMask show={store.reloading} transparent align="top" />
              <Grid item xs={12}>
                {!loading ? (
                  <Typography component="h1" variant="h6" gutterBottom>
                    {pageData.name}
                  </Typography>
                ) : (
                  <Skeleton height={32} style={{ marginBottom: theme.spacing(1) }} />
                )}
              </Grid>
              <Grid item xs={6} style={{ paddingRight: theme.spacing(1) }}>
                <Hidden implementation="css" smUp>
                  {/* Display a button that opens the filter drawer on mobile screen sizes */}
                  <FilterButton style={{ width: '100%' }} />
                </Hidden>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* The sort button is automatically responsive.  It will show as a dropdown on desktop, and open a drawer on mobile */}
                <SortButton className={classes.sortButton} />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {loading ? (
                  <Skeleton
                    width={90}
                    height={14}
                    style={{ marginBottom: 4 }}
                    className={classes.total}
                  />
                ) : (
                  <Typography variant="caption" className={classes.total}>
                    <span>
                      {pageData.total} total {pageData.total === 1 ? 'item' : 'items'}
                    </span>
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {!loading ? (
                  <ResponsiveTiles autoScrollToNewTiles>
                    {pageData.products.map((product, i) => (
                      <ProductItem key={product.id} product={product} index={i} />
                    ))}
                  </ResponsiveTiles>
                ) : (
                  <ResponsiveTiles>
                    {(() => {
                      const tiles = []
                      for (let i = 0; i < 10; i++) {
                        tiles.push(
                          <div
                            key={i}
                            style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
                          >
                            <Fill height="100%" style={{ marginBottom: theme.spacing(1) }}>
                              <Skeleton variant="rect" />
                            </Fill>
                            <Skeleton height={26} />
                            <ProductOptionSelector
                              skeleton={4}
                              variant="swatch"
                              size="small"
                              optionProps={{
                                size: 'small',
                                showLabel: false,
                              }}
                            />
                            <Skeleton height={18} />
                            <Skeleton height={24} style={{ marginTop: '5px' }} />
                          </div>
                        )
                      }
                      return tiles
                    })()}
                  </ResponsiveTiles>
                )}
              </Grid>
              <Grid item xs={12}>
                {!loading && <ShowMore variant="button" style={{ paddingBottom: 200 }} />}
              </Grid>
            </Grid>
          </Hbox>
        </Container>
      </SearchResultsProvider>
    </>
  )
}

Subcategory.getInitialProps = createLazyProps(opts => {
  const { res } = opts
  if (res) res.setHeader('Cache-Control', 'max-age=99999')
  return fetchFromAPI(opts)
})

export default Subcategory
