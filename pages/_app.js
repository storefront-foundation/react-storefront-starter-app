import React from 'react'
import 'typeface-roboto'

export default function MyApp({}) {
  return <div>Empty App</div>
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}
