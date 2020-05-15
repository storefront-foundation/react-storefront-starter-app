import React, { useState, memo } from 'react'
import SearchHeader from 'react-storefront/search/SearchHeader'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront-amp/search/AmpSearchField'
import SearchDrawer from 'react-storefront-amp/search/AmpSearchDrawer'
import SearchButton from 'react-storefront-amp/search/AmpSearchButton'
import SearchSuggestions from 'react-storefront-amp/search/AmpSearchSuggestions'
import SearchProvider from 'react-storefront/search/SearchProvider'

function SearchMobile() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <SearchButton onClick={toggleDrawer} />
      <SearchDrawer open={drawerOpen} onClose={closeDrawer}>
        <SearchForm>
          <SearchHeader>
            <SearchField onChange={value => setQuery(value)} value={query} />
          </SearchHeader>
          <SearchProvider query={query} active={drawerOpen}>
            <SearchSuggestions />
          </SearchProvider>
        </SearchForm>
      </SearchDrawer>
    </>
  )
}

export default memo(SearchMobile)
