/**
 * This component is an example of how we can fetch user-specific data for a product.
 * In general, it's a best practice to separate cacheable elements that are shown to all
 * users from areas of the page which contained information that should only be displayed
 * to a single user, such as recently viewed products and recommendations.  This separation
 * allows us to deliver most of the content from the CDN's cache and gives us the fastest
 * possible page load time.
 */

import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import fetch from 'react-storefront/fetch'
import ProductItem from './ProductItem'
import { Typography } from '@mui/material'
import LoadMask from 'react-storefront/LoadMask'

const PREFIX = 'RSFSuggestedProducts'

const classes = {
  products: `${PREFIX}-products`,
  wrap: `${PREFIX}-wrap`,
  product: `${PREFIX}-product`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.products}`]: {
    minHeight: 250,
    position: 'relative',
    margin: theme.spacing(0, -2),
    overflowX: 'auto',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100vw',
    },
  },

  [`& .${classes.wrap}`]: {
    padding: theme.spacing(0, 0, 0, 2),
    display: 'flex',
    flexDirection: 'row',
    width: 'max-content',
  },

  [`& .${classes.product}`]: {
    margin: theme.spacing(0, 2, 0, 0),
    minWidth: 150,
  },
}))

export {}

export default function SuggestedProducts({ product }) {
  const [suggestedProducts, setSuggestedProducts] = useState(null)

  // Fetch suggested products when the product page is mounted
  useEffect(() => {
    fetch(`/api/p/${encodeURIComponent(product.id)}/suggestions`)
      .then(res => res.json())
      .then(result => setSuggestedProducts(result))
  }, [])

  return (
    <Root>
      <Typography variant="h6" component="h3">
        Suggested Products
      </Typography>
      <div className={classes.products}>
        <LoadMask show={!suggestedProducts} />
        <div className={classes.wrap}>
          {suggestedProducts &&
            suggestedProducts.map((product, i) => (
              <ProductItem
                product={product}
                index={i}
                key={i}
                colorSelector={false}
                className={classes.product}
              />
            ))}
        </div>
      </div>
    </Root>
  )
}

SuggestedProducts.propTypes = {
  /**
   * The product being displayed.
   */
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
}
