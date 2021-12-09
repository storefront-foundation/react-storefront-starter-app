import React, { useState, useCallback, useContext } from 'react'
import { styled } from '@mui/material/styles'
import AppBar from 'react-storefront/AppBar'
import CartButton from 'react-storefront/CartButton'
import Search from './search/Search'
import Logo from '../components/assets/react-storefront-logo.svg'
import { Container } from '@mui/material'
import Menu from 'react-storefront/menu/Menu'
import MenuButton from 'react-storefront/menu/MenuButton'
import Link from 'react-storefront/link/Link'
import SessionContext from 'react-storefront/session/SessionContext'
import get from 'lodash/get'
import PropTypes from 'prop-types'

const PREFIX = 'Header'

const classes = {
  title: `${PREFIX}-title`,
  logo: `${PREFIX}-logo`,
  toolbar: `${PREFIX}-toolbar`,
  container: `${PREFIX}-container`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.title}`]: {},

  [`& .${classes.logo}`]: {
    position: 'absolute',
    left: 10,
    top: 0,
    [theme.breakpoints.down('sm')]: {
      left: '50%',
      top: 6,
      marginLeft: -60,
    },
  },

  [`& .${classes.toolbar}`]: {
    padding: 0,
    margin: 0,
  },

  [`& .${classes.container}`]: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',

    [theme.breakpoints.down('sm')]: {
      padding: 5,
    },
  },
}))

export default function Header({ menu }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuClose = useCallback(() => setMenuOpen(false), [])
  const handleMenuButtonClick = useCallback(() => setMenuOpen(menuOpen => !menuOpen), [])
  const { session } = useContext(SessionContext)

  return (
    <Root>
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
    </Root>
  )
}

Header.propTypes = {
  menu: PropTypes.object,
}
