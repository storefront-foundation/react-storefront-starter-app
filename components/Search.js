import React, { Suspense, lazy, useState, memo } from 'react'
import SearchButton from 'react-storefront-amp/search/AmpSearchButton'

const SearchHeader = lazy(() => import('react-storefront/search/SearchHeader'))
const SearchForm = lazy(() => import('react-storefront/search/SearchForm'))
const SearchField = lazy(() => import('react-storefront-amp/search/AmpSearchField'))
const SearchDrawer = lazy(() => import('react-storefront-amp/search/AmpSearchDrawer'))
const SearchSuggestions = lazy(() => import('react-storefront-amp/search/AmpSearchSuggestions'))

function Search() {
  const [searchOpen, setSearchOpen] = useState(false)
  const toggleSearch = () => setSearchOpen(!searchOpen)
  const closeSearch = () => setSearchOpen(false)

  return (
    <>
      <SearchButton onClick={toggleSearch} />
      {searchOpen ? (
        <Suspense fallback={<div />}>
          <SearchDrawer open={searchOpen} onClose={closeSearch}>
            <SearchForm>
              <SearchHeader>
                <SearchField />
              </SearchHeader>
              <SearchSuggestions />
            </SearchForm>
          </SearchDrawer>
        </Suspense>
      ) : null}
    </>
  )
}

export default memo(Search)
