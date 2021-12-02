import React from 'react'
import SearchDesktop from './SearchDesktop'
import SearchMobile from './SearchMobile'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Spacer from 'react-storefront/Spacer'
import { useAmp } from 'next/amp'

function Search() {
  const theme = useTheme()
  const amp = useAmp()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm')) && !amp

  return (
    <>
      {!isDesktop && <SearchMobile />}
      <Spacer />
      {isDesktop && <SearchDesktop />}
    </>
  )
}

export default Search
