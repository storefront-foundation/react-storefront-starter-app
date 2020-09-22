import Head from 'next/head'

export default function XDNDevtools({ id = 'xdn_devtools' }) {
  if (process.browser) {
    window.XDN_DEVTOOLS_TARGET = `#${id}`
  }

  return (
    <>
      <Head>
        {/*
          We don't SSR the devtools script tag, otherwise it loads twice
          https://github.com/vercel/next.js/issues/9070
        */}
        {process.browser && <script defer src="/xdn-devtools.js" />}
        <link rel="stylesheet" href="/xdn-devtools.css" />
      </Head>
      <div id={id} />
    </>
  )
}
