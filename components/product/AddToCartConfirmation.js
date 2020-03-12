import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from '@material-ui/core'
import get from 'lodash/get'
import { Close as CloseIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'react-storefront/Image'
import Link from 'react-storefront/link/Link'
import { Hbox } from 'react-storefront/Box'

const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    height: 150,
    width: 150,
    [theme.breakpoints.down('xs')]: {
      width: 100,
      height: 100,
    },
  },
  price: {
    fontWeight: theme.typography.fontWeightBold,
  },
  name: {
    fontWeight: theme.typography.fontWeightBold,
  },
  info: {
    flex: 1,
    marginLeft: theme.spacing(2),
  },
  viewCart: {
    width: '100%',
  },
  actions: {
    flexDirection: 'column',
    margin: theme.spacing(1, 2, 0, 2),
  },
  continue: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}))

export default function AddToCartConfirmation({
  open,
  setOpen,
  price,
  color,
  size,
  quantity,
  product,
}) {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
      <DialogTitle disableTypography>
        <Typography component="h2" variant="h6">
          Item added to cart
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Hbox align="flex-start">
          <div className={classes.image}>
            <Image
              fill
              src={get(color, 'media.thumbnail.src') || get(product, 'thumbnail.src')}
              alt={get(color, 'media.thumbnail.alt') || get(product, 'thumbnail.alt')}
            />
          </div>
          <div className={classes.info}>
            <Typography className={classes.name}>{product.name}</Typography>
            <Typography>{color.text ? `Color: ${color.text}` : ''}</Typography>
            <Typography>{size.text ? `Size: ${size.text}` : ''}</Typography>
            <Typography>{quantity ? `Qty: ${quantity}` : ''}</Typography>
            <Typography className={classes.price}>{price}</Typography>
          </div>
        </Hbox>
      </DialogContent>
      <DialogActions disableSpacing className={classes.actions}>
        <Link href="/cart">
          <Button className={classes.viewCart} variant="contained" size="large" color="primary">
            View Cart
          </Button>
        </Link>
        <a className={classes.continue} onClick={() => setOpen(false)}>
          Continue Shopping
        </a>
      </DialogActions>
    </Dialog>
  )
}
