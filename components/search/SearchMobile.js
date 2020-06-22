import React, { useState, memo, useCallback } from 'react'
import SearchHeader from 'react-storefront/search/SearchHeader'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront-amp/search/AmpSearchField'
import SearchDrawer from 'react-storefront-amp/search/AmpSearchDrawer'
import SearchButton from 'react-storefront-amp/search/AmpSearchButton'
import SearchSuggestions from 'react-storefront-amp/search/AmpSearchSuggestions'
import SearchProvider from 'react-storefront/search/SearchProvider'
import LazyHydrate from 'react-storefront/LazyHydrate'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  button: {
    display: 'none',
  },
  [theme.breakpoints.down('xs')]: {
    button: {
      display: 'block',
    },
  },
}))

function SearchMobile() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  const closeDrawer = () => setDrawerOpen(false)
  const classes = useStyles()
  const hydrate = useCallback(() => {
    setHydrated(true)
  }, [])

  return (
    <>
      <SearchButton className={classes.button} onClick={toggleDrawer} onTouchStart={hydrate} />
      <LazyHydrate id="search-mobile" hydrated={hydrated}>
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
      </LazyHydrate>
    </>
  )
}

export default memo(SearchMobile)
