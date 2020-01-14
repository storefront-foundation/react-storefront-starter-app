import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0),
  },
}))

export default function Checkout() {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <div className={classes.main}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Coming soon!
        </Typography>
      </div>
    </Container>
  )
}
