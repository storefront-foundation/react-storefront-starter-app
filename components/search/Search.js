import React from 'react'
import SearchDesktop from './SearchDesktop'
import SearchMobile from './SearchMobile'
import Spacer from 'react-storefront/Spacer'
import { useAmp } from 'next/amp'

function Search() {
  const amp = useAmp()

  return (
    <>
      <SearchMobile />
      <Spacer />
      {!amp && <SearchDesktop />}
    </>
  )
}

export default Search
