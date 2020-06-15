import React, { memo, useEffect, useState, useRef } from 'react'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront/search/SearchField'
import SearchSuggestions from 'react-storefront/search/SearchSuggestions'
import SearchProvider from 'react-storefront/search/SearchProvider'
import SearchPopover from 'react-storefront/search/SearchPopover'
import { makeStyles } from '@material-ui/styles'
import LazyHydrate from 'react-storefront/LazyHydrate'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      display: 'block',
    },
  },
}))

function SearchDesktop() {
  const inputRef = useRef(null)
  const activeRef = useRef(false)
  const [query, setQuery] = useState('')
  const [popoverOpen, setPopoverOpen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (!activeRef.current) {
      activeRef.current = true
    }
  }, [popoverOpen])

  return (
    <div className={classes.root}>
      <LazyHydrate id="search-desktop" on="touch">
        <SearchForm>
          <SearchField
            ref={inputRef}
            onChange={value => setQuery(value)}
            value={query}
            onFocus={() => setPopoverOpen(true)}
            submitButtonVariant="none"
            showClearButton={false}
          />
          <SearchProvider query={query} active={activeRef.current}>
            <SearchPopover
              open={popoverOpen}
              setQuery={setQuery}
              anchor={inputRef}
              onClose={() => setPopoverOpen(false)}
            >
              <SearchSuggestions />
            </SearchPopover>
          </SearchProvider>
        </SearchForm>
      </LazyHydrate>
    </div>
  )
}

export default memo(SearchDesktop)
