import React, { memo, useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Popover } from '@material-ui/core'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront/search/SearchField'
import SearchSuggestions from 'react-storefront/search/SearchSuggestions'
import SearchProvider from 'react-storefront/search/SearchProvider'

export const styles = theme => ({
  /**
   * Styles applied to the root element.
   */
  root: {
    display: 'flex',
  },
  searchinput: {
    border: '1px solid',
  },
  paper: {
    boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14)',
  },
})

const useStyles = makeStyles(styles, { name: 'RSFSearchDesktop' })

function SearchDesktop({ classes }) {
  const insideRef = useRef(false)
  const [open, setOpen] = useState(false)
  const myRef = useRef(null)
  classes = useStyles({ classes })

  const handleClickOutside = () => {
    setTimeout(() => {
      if (!insideRef.current) {
        setOpen(false)
        myRef.current.blur()
      }
      insideRef.current = false
    }, 10)
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [])

  return (
    <SearchProvider
      onFetchFinish={() => {
        setOpen(true)
      }}
      onClose={() => setOpen(false)}
    >
      <div ref={myRef} className={classes.root} onClick={() => (insideRef.current = true)}>
        <SearchForm>
          <SearchField
            onFocus={inputRef => inputRef.current.value !== '' && setOpen(true)}
            submitButtonVariant="none"
            showClearButton={false}
            classes={{ input: classes.searchinput }}
          />
        </SearchForm>
      </div>
      <Popover
        open={open}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        anchorEl={myRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          square: true,
          onClick: () => (insideRef.current = true),
          className: classes.paper,
        }}
      >
        <SearchSuggestions />
      </Popover>
    </SearchProvider>
  )
}

export default memo(SearchDesktop)
