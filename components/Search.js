import React, { useState, memo } from 'react'
import SearchHeader from 'react-storefront/search/SearchHeader'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront-amp/search/AmpSearchField'
import SearchDrawer from 'react-storefront-amp/search/AmpSearchDrawer'
import SearchButton from 'react-storefront-amp/search/AmpSearchButton'
import SearchSuggestions from 'react-storefront-amp/search/AmpSearchSuggestions'

function Search() {
  const [searchOpen, setSearchOpen] = useState(false)
  const toggleSearch = () => setSearchOpen(!searchOpen)
  const closeSearch = () => setSearchOpen(false)

  return (
    <>
      <SearchButton onClick={toggleSearch} />
      <SearchDrawer open={searchOpen} onClose={closeSearch}>
        <SearchForm>
          <SearchHeader>
            <SearchField />
          </SearchHeader>
          <SearchSuggestions />
        </SearchForm>
      </SearchDrawer>
    </>
  )
}

export default memo(Search)
