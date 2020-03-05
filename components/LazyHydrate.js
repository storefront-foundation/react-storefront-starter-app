import React from 'react'
import LazyHydrate from 'react-lazy-hydration'

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

export default function({ children, ...props }) {
  return (
    <LazyHydrate {...props}>
      <LazyStylesProvider>{children}</LazyStylesProvider>
    </LazyHydrate>
  )
}
