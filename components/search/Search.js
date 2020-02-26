import React from 'react'
import SearchDesktop from './SearchDesktop'
import SearchMobile from './SearchMobile'
import { useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import Spacer from 'react-storefront/Spacer'

function Search() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <>
      {isSmall && <SearchMobile />}
      <Spacer />
      {!isSmall && <SearchDesktop />}
    </>
  )
}

export default Search
