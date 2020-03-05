import React from 'react'

import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { SheetsRegistry } from 'jss'

const registries = []

const generateClassName = createGenerateClassName()

export function LazyStyleElements() {
  return (
    <>
      {registries.map((registry, index) => {
        const id = `jss-lazy-${index}`
        return <style key={id} id={id} dangerouslySetInnerHTML={{ __html: registry.toString() }} />
      })}
    </>
  )
}

function LazyStylesProvider({ children }) {
  const registry = new SheetsRegistry()
  registries.push(registry)
  return (
    <StylesProvider
      sheetsManager={new Map()}
      serverGenerateClassName={generateClassName}
      sheetsRegistry={registry}
    >
      {children}
    </StylesProvider>
  )
}

const isBrowser =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'

function LazyHydrate({ hydrated, children, on, index, ...rest }) {
  const childRef = React.useRef(null)
  const [_hydrated, setHydrated] = React.useState(!isBrowser)

  if (on === 'click') {
    React.useEffect(() => {
      function hydrate() {
        setHydrated(true)
      }
      childRef.current.addEventListener('click', hydrate, {
        once: true,
        capture: true,
        passive: true,
      })
      return () => {
        childRef.current.removeEventListener('click', hydrate, { capture: true })
      }
    })
  }

  React.useEffect(() => {
    if (hydrated || _hydrated) {
      const stylesheet = window.document.getElementById(`jss-lazy-${index}`)
      if (stylesheet) {
        stylesheet.remove()
      }
    }
  })

  if (hydrated || _hydrated) {
    return (
      <div ref={childRef} style={{ display: 'contents' }} {...rest}>
        {children}
      </div>
    )
  } else {
    return (
      <div
        ref={childRef}
        style={{ display: 'contents' }}
        suppressHydrationWarning
        {...rest}
        dangerouslySetInnerHTML={{ __html: '' }}
      />
    )
  }
}

export default function({ children, ...props }) {
  return (
    <LazyHydrate {...props} index={registries.length}>
      <LazyStylesProvider>{children}</LazyStylesProvider>
    </LazyHydrate>
  )
}
