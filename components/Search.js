import React, { Suspense, lazy, useState, memo } from 'react'
import SearchButton from 'react-storefront-amp/search/AmpSearchButton'
const SearchDrawer = lazy(() => import('./SearchDrawer'))

function Search() {
  const [searchOpen, setSearchOpen] = useState(false)
  const toggleSearch = () => setSearchOpen(!searchOpen)
  const closeSearch = () => setSearchOpen(false)

  return (
    <>
      <SearchButton onClick={toggleSearch} />
      {searchOpen ? (
        <Suspense fallback={<div />}>
          <SearchDrawer open={searchOpen} onClose={closeSearch} />
        </Suspense>
      ) : null}
    </>
  )
}

export default memo(Search)
