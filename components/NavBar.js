import React from 'react'
import NavTab from 'react-storefront/nav/NavTab'
import NavTabs from 'react-storefront/nav/NavTabs'
import Link from 'react-storefront/link/Link'
import { Container, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('xs')]: {
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

export default function NavBar({ tabs }) {
  const classes = useStyles()

  return (
    <Paper square elevation={2}>
      <Container maxWidth="lg" className={classes.container}>
        <NavTabs>
          {tabs.map(tab => (
            <NavTab key={tab.as} href={tab.href} as={tab.as} label={tab.text}>
              {React.useMemo(
                () => (
                  <div style={{ padding: 20 }}>
                    <Link href="/s/[subcategoryId]" as="/s/1" className={classes.link}>
                      Subcategory 1
                    </Link>
                    <Link href="/s/[subcategoryId]" as="/s/2" className={classes.link}>
                      Subcategory 2
                    </Link>
                    <Link href="/s/[subcategoryId]" as="/s/3" className={classes.link}>
                      Subcategory 3
                    </Link>
                  </div>
                ),
                []
              )}
            </NavTab>
          ))}
        </NavTabs>
      </Container>
    </Paper>
  )
}

const tabs = []

for (let i = 1; i <= 10; i++) {
  tabs.push({ as: `/s/${i}`, href: '/s/[subcategoryId]', text: `Category ${i}` })
}

NavBar.defaultProps = {
  tabs,
}
