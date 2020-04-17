import React, { useState, useCallback, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from 'react-storefront/AppBar'
import CartButton from 'react-storefront/CartButton'
import Search from './search/Search'
import Logo from '../components/assets/react-storefront-logo.svg'
import { Container } from '@material-ui/core'
import Menu from 'react-storefront/menu/Menu'
import MenuButton from 'react-storefront/menu/MenuButton'
import Link from 'react-storefront/link/Link'
import SessionContext from 'react-storefront/session/SessionContext'
import get from 'lodash/get'

const useStyles = makeStyles(theme => ({
  title: {},
  logo: {
    position: 'absolute',
    left: 10,
    top: 0,
    [theme.breakpoints.down('xs')]: {
      left: '50%',
      top: 6,
      marginLeft: -60,
    },
  },
  toolbar: {
    padding: 0,
    margin: 0,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
}))

export default function Header({ menu }) {
  const classes = useStyles()
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuClose = useCallback(() => setMenuOpen(false), [])
  const handleMenuButtonClick = useCallback(() => setMenuOpen(menuOpen => !menuOpen), [])
  const { session } = useContext(SessionContext)

  return (
    <>
      <AppBar>
        <Container maxWidth="lg" className={classes.container}>
          <Link href="/">
            <a>
              <Logo style={{ width: 120, height: 48 }} className={classes.logo} />
            </a>
          </Link>
          <Search />
          <CartButton quantity={get(session, 'itemsInCart')} />
          <MenuButton open={menuOpen} onClick={handleMenuButtonClick} />
        </Container>
      </AppBar>
      <Menu
        anchor="right"
        root={menu}
        open={menuOpen}
        onClose={handleMenuClose}
        // renderItem={item => <div>{item.text} (custom)</div>}
        // renderItemContent={item => <div>{item.text} (custom content)</div>}
        // renderBack={item => <div>{item.text} back</div>}
        // renderHeader={item => <div>{item.text} header</div>}
        // renderFooter={item => <div>{item.text} footer</div>}
      />
    </>
  )
}
