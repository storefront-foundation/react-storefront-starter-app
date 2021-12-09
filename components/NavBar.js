import React, { memo } from 'react'
import { styled } from '@mui/material/styles'
import NavTab from 'react-storefront/nav/NavTab'
import NavTabs from 'react-storefront/nav/NavTabs'
import Link from 'react-storefront/link/Link'
import { Container, Paper } from '@mui/material'
import { PropTypes } from 'prop-types'
const PREFIX = 'NavBar'

const classes = {
  container: `${PREFIX}-container`,
  link: `${PREFIX}-link`,
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  [`& .${classes.container}`]: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },

  [`& .${classes.link}`]: {
    display: 'block',
    marginTop: theme.spacing(2),
    '&:first-child': {
      marginTop: 0,
    },
  },
}))

function NavBar({ tabs }) {
  return (
    <StyledPaper square elevation={2}>
      <Container maxWidth="lg" className={classes.container}>
        <NavTabs>
          {tabs &&
            tabs.map(tab => (
              <NavTab key={tab.as} href={tab.href} as={tab.as} label={tab.text} prefetch="visible">
                {tab.items && (
                  <div style={{ padding: 20 }}>
                    {tab.items.map(item => (
                      <Link href={item.href} key={item.as} as={item.as} className={classes.link}>
                        {item.text}
                      </Link>
                    ))}
                  </div>
                )}
              </NavTab>
            ))}
        </NavTabs>
      </Container>
    </StyledPaper>
  )
}

NavBar.propTypes = {
  tabs: PropTypes.array,
}
NavBar.defaultProps = {
  tabs: [],
}

export default memo(NavBar)
