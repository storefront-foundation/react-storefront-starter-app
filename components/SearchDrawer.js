import React from 'react'
import SearchHeader from 'react-storefront/search/SearchHeader'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront-amp/search/AmpSearchField'
import AmpSearchDrawer from 'react-storefront-amp/search/AmpSearchDrawer'
import SearchSuggestions from 'react-storefront-amp/search/AmpSearchSuggestions'

export default function SearchDrawer(props) {
  return (
    <AmpSearchDrawer {...props}>
      <SearchForm>
        <SearchHeader>
          <SearchField />
        </SearchHeader>
        <SearchSuggestions />
      </SearchForm>
    </AmpSearchDrawer>
  )
}
