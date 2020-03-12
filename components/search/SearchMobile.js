import React, { useState, memo } from 'react'
import SearchHeader from 'react-storefront/search/SearchHeader'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront/search/SearchField'
import SearchDrawer from 'react-storefront/search/SearchDrawer'
import SearchButton from 'react-storefront/search/SearchButton'
import SearchSuggestions from 'react-storefront/search/SearchSuggestions'
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
