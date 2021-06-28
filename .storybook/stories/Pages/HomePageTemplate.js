import Head from 'next/head'
import { Container, CssBaseline, Typography } from '@material-ui/core'
import React from 'react'
import Header from '../../../components/Header'
import NavBar from '../../../components/NavBar'
import { Carousel } from 'react-storefront/carousel'
import {ResponsiveTiles} from 'react-storefront'
import { BackToTop } from 'react-storefront'
import theme from '../../../components/theme'
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles'

const styles = theme => ({
  main: {
    paddingTop: 3,
  },
  offers: {
    paddingTop: 15
  }
})

const useStyles = makeStyles(styles)

export default function Index(args) {
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <BackToTop />
        <NavBar tabs={args.tabs}/>
        <main className={classes.main}>
          <Container maxWidth="lg">
            <Carousel {...args}>
              {args.slides}
            </Carousel>
            <div className={classes.offers}>
              <Typography variant="h3" component="h1" gutterBottom color="textPrimary">
                {args.offerTitle}
              </Typography>
              <ResponsiveTiles>
                {args.tiles.map(item => (
                  <div
                    key={item.label}
                    style={{
                      height: 150,
                      backgroundColor: item.color,
                      color: item.textColor,
                      display: 'flex',
                      fontFamily: 'Arial',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </ResponsiveTiles>
            </div>
          </Container>
        </main>
      </MuiThemeProvider>
    </>
  )
}
