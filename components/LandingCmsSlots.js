import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CmsSlot from 'react-storefront/CmsSlot'

const useStyles = makeStyles((/* theme */) => ({
  cmsBlock: {
    '& img': {
      maxWidth: '100vw',
    },
    '& .block-promo': {
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
      display: 'block',
      width: '100%',
      color: '#333 !important',
      marginBottom: 8,
      '& img': {
        maxWidth: 'initial',
      },
      '& .content': {
        display: 'block',
        padding: '25px 35px 35px',
        zIndex: 1,
        overflow: 'hidden',
        position: 'absolute',
        boxSizing: 'border-box',
        top: 20,
        right: 0,
        width: '65%',
        backgroundColor: 'rgba(255,255,255,0.9)',
      },
      '& .button.more': {
        backgroundImage: 'none',
        background: '#8700FF',
        color: '#fff',
        border: '1px solid #8700FF',
        cursor: 'pointer',
        display: 'inline-block',
        fontWeight: 700,
        boxSizing: 'border-box',
        verticalAlign: 'middle',
        borderRadius: 3,
        textDecoration: 'none',
        padding: 8,
        marginTop: 4,
      },
      '& .icon.more': {
        display: 'block',
        textDecoration: 'none',
        fontWeight: 700,
        marginTop: 10,
        '&::after': {
          content: '"→"',
          display: 'inline-block',
          marginLeft: 5,
        },
      },
    },
    '& .content-heading': {
      textAlign: 'center',
    },
    '& .products-grid': {
      '& .product-items': {
        padding: 0,
        margin: '0 8px',
      },
      '& .product-item': {
        width: 'calc((100% - 2%)/2)',
        display: 'inline-block',
        textAlign: 'center',
        '& img': {
          maxWidth: '100%',
        },
        '& .action': {
          display: 'block',
          fontWeight: 400,
          textDecoration: 'none',
          marginTop: 5,
          '&.tocart': {
            lineHeight: 1,
            whiteSpace: 'nowrap',
            backgroundImage: 'none',
            background: '#8700FF',
            borderRadius: 0,
            border: '1px solid #8700FF',
            color: '#fff',
            cursor: 'pointer',
            display: 'inline-block',
            fontWeight: 600,
            padding: '7px 15px',
            boxSizing: 'border-box',
            verticalAlign: 'middle',
          },
        },
        '& .rating-result': {
          border: '1px solid #3f51b5',
          margin: 2,
          '& > span': {
            display: 'block',
            background: '#3f51b5',
            '& span': {
              color: '#fff',
            },
          },
        },
      },
    },
  },
}))

const LandingCmsSlots = ({ cmsBlocks }) => {
  const classes = useStyles()

  return (
    <>
      {cmsBlocks.map(cmsBlock => (
        <CmsSlot key={cmsBlock.identifier} className={classes.cmsBlock}>
          {cmsBlock.content}
        </CmsSlot>
      ))}
    </>
  )
}

export default LandingCmsSlots
