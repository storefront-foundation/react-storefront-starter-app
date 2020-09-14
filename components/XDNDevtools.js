import Head from 'next/head'

export default function XDNDevtools({ id = 'xdn_devtools' }) {
  return (
    <>
      <Head>
        <script>{`window.XDN_DEVTOOLS_TARGET = '${id}'`}</script>
        <script defer src="/xdn-devtools.js" />
        <link rel="stylesheet" href="/xdn-devtools.css" />
      </Head>
      <div id={id} />
    </>
  )
}
