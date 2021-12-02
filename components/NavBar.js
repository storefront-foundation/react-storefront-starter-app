import React, { memo } from 'react'
import NavTab from 'react-storefront/nav/NavTab'
import NavTabs from 'react-storefront/nav/NavTabs'
import Link from 'react-storefront/link/Link'
import { Container, Paper } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  link: {
    display: 'block',
    marginTop: theme.spacing(2),
    '&:first-child': {
      marginTop: 0,
    },
  },
}))

function NavBar({ tabs }) {
  const classes = useStyles()

  return (
    <Paper square elevation={2}>
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
    </Paper>
  )
}

NavBar.defaultProps = {
  tabs: [],
}

export default memo(NavBar)
