import React, { memo, useState } from 'react'
import { styled } from '@mui/material/styles'
import Link from 'react-storefront/link/Link'
import { Vbox } from 'react-storefront/Box'
import { Typography } from '@mui/material'
import Rating from 'react-storefront/Rating'
import ForwardThumbnail from 'react-storefront/ForwardThumbnail'
import Image from 'react-storefront/Image'
import clsx from 'clsx'
import ProductOptionSelector from 'react-storefront/option/ProductOptionSelector'

const PREFIX = 'ProductItem'

const classes = {
  root: `${PREFIX}-root`,
  thumbnail: `${PREFIX}-thumbnail`,
  link: `${PREFIX}-link`,
  price: `${PREFIX}-price`,
  reviews: `${PREFIX}-reviews`,
  reviewCount: `${PREFIX}-reviewCount`,
  info: `${PREFIX}-info`,
}

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    padding: `${theme.spacing(2)} 0`,
  },

  [`& .${classes.thumbnail}`]: {
    marginBottom: theme.spacing(1),
  },

  [`& .${classes.link}`]: {
    textDecoration: 'none',
    color: 'inherit',
  },

  [`& .${classes.price}`]: {
    marginTop: '5px',
  },

  [`& .${classes.reviews}`]: {
    marginTop: '5px',
  },

  [`& .${classes.reviewCount}`]: {
    marginLeft: '2px',
  },

  [`& .${classes.info}`]: {
    margin: '0',
  },
}))

function ProductItem({ product, index, className, colorSelector }) {
  const [store, updateStore] = useState(product)

  return (
    <Root id={`item-${index}`} className={clsx(className, classes.root)}>
      <Vbox alignItems="stretch">
        <ForwardThumbnail>
          <Link
            as={product.url}
            href="/p/[productId]"
            className={classes.link}
            prefetch="visible"
            pageData={{ product, color: store.color }}
          >
            <a>
              <Image
                className={classes.thumbnail}
                src={
                  (store.color && store.color.media.thumbnail.src) ||
                  (store.thumbnail && store.thumbnail.src)
                }
                alt={
                  (store.color && store.color.media.thumbnail.alt) ||
                  (store.thumbnail && store.thumbnail.alt)
                }
                optimize={{ maxWidth: 200 }}
                lazy={index >= 4 && index < 20 ? 'ssr' : false}
                aspectRatio={1}
              />
            </a>
          </Link>
        </ForwardThumbnail>
        <div className={classes.info}>
          <Typography variant="subtitle1" className={classes.name}>
            {product.name}
          </Typography>
          {colorSelector && (
            <ProductOptionSelector
              options={store.colors}
              value={store.color}
              onChange={value => updateStore({ ...store, color: value })}
              optionProps={{
                size: 'small',
                showLabel: false,
              }}
            />
          )}
          <Rating product={product} className={classes.rating} />
          <Typography className={classes.price}>{product.price}</Typography>
        </div>
      </Vbox>
    </Root>
  )
}

ProductItem.defaultProps = {
  colorSelector: true,
}

export default memo(ProductItem)
