import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles';
import get from 'lodash/get'
import { Close as CloseIcon } from '@mui/icons-material'
import Image from 'react-storefront/Image'
import Link from 'react-storefront/link/Link'
import { Hbox } from 'react-storefront/Box'

const PREFIX = 'AddToCartConfirmation';

const classes = {
  root: `${PREFIX}-root`,
  image: `${PREFIX}-image`,
  price: `${PREFIX}-price`,
  name: `${PREFIX}-name`,
  info: `${PREFIX}-info`,
  viewCart: `${PREFIX}-viewCart`,
  actions: `${PREFIX}-actions`,
  continue: `${PREFIX}-continue`,
  closeButton: `${PREFIX}-closeButton`
};

const StyledDialog = styled(Dialog)((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {},

  [`& .${classes.image}`]: {
    height: 150,
    width: 150,
    [theme.breakpoints.down('sm')]: {
      width: 100,
      height: 100,
    },
  },

  [`& .${classes.price}`]: {
    fontWeight: theme.typography.fontWeightBold,
  },

  [`& .${classes.name}`]: {
    fontWeight: theme.typography.fontWeightBold,
  },

  [`& .${classes.info}`]: {
    flex: 1,
    marginLeft: theme.spacing(2),
  },

  [`& .${classes.viewCart}`]: {
    width: '100%',
  },

  [`& .${classes.actions}`]: {
    flexDirection: 'column',
    margin: theme.spacing(1, 2, 0, 2),
  },

  [`& .${classes.continue}`]: {
    margin: theme.spacing(2, 0, 1, 0),
  },

  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  }
}));

export default function AddToCartConfirmation({
  open,
  setOpen,
  price,
  color,
  size,
  quantity,
  product,
}) {


  return (
    <StyledDialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography component="h2" variant="h6">
          Item added to cart
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => setOpen(false)}
          size="large"
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
    </StyledDialog>
  );
}
