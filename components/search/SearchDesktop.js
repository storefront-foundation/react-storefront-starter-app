import React, { memo, useState, useRef } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import { Popover } from '@material-ui/core'
import SearchForm from 'react-storefront/search/SearchForm'
import SearchField from 'react-storefront/search/SearchField'
import SearchSuggestions from 'react-storefront/search/SearchSuggestions'
import SearchProvider from 'react-storefront/search/SearchProvider'

export const styles = theme => {
  return {
    /**
     * Styles applied to the root element.
     */
    root: {
      display: 'flex',
    },
    searchinput: {
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: theme.spacing(1),
      margin: theme.spacing(0.5, 0, 0.5, 0),
      zIndex: 99999,
      transition: 'border-color linear 0.1s',
      '&:hover': {
        borderColor: fade(theme.palette.divider, 0.25),
      },
      '&:focus': {
        borderColor: theme.palette.primary.main,
      },
    },
    paper: {
      boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14)',
      minWidth: theme.spacing(84),
      minHeight: theme.spacing(75),
      border: `1px solid ${theme.palette.divider}`,
    },
  }
}

const useStyles = makeStyles(styles, { name: 'RSFSearchDesktop' })

function SearchDesktop({ classes }) {
  const [open, setOpen] = useState(false)
  const isFetchedRef = useRef(false)
  const myRef = useRef(null)
  classes = useStyles({ classes })

  return (
    <SearchProvider
      onFetch={() => {
        setOpen(true)
        isFetchedRef.current = true
      }}
      onClose={() => setOpen(false)}
    >
      <div ref={myRef} className={classes.root}>
        <SearchForm>
          <SearchField
            onFocus={() => {
              // We need this so that we reopen the popup when the user comes back to it
              // after closing and there is results in it.
              if (isFetchedRef.current) {
                setOpen(true)
              }
            }}
            // fetchOnFirstFocus
            submitButtonVariant="none"
            showClearButton={false}
            classes={{ input: classes.searchinput }}
          />
        </SearchForm>
        <Popover
          open={open}
          disableAutoFocus
          disableEnforceFocus
          disableRestoreFocus
          disablePortal
          keepMounted
          onClose={() => setOpen(false)}
          anchorEl={myRef.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            square: true,
            className: classes.paper,
          }}
        >
          <SearchSuggestions />
        </Popover>
      </div>
    </SearchProvider>
  )
}

export default memo(SearchDesktop)
