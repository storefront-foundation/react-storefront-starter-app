import React from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { SheetsRegistry } from 'jss'

const sheetsManager = new Map()
const sheetsRegistry = new SheetsRegistry()
const generateClassName = createGenerateClassName()

export function getLazyStyleElement(props) {
  return React.createElement(
    'style',
    Object.assign(
      {
        id: 'jss-lazy',
        key: 'jss-lazy',
        dangerouslySetInnerHTML: { __html: sheetsRegistry.toString() },
      },
      props
    )
  )
}

export function LazyStylesProvider({ children }) {
  return (
    <StylesProvider
      sheetsManager={sheetsManager}
      serverGenerateClassName={generateClassName}
      sheetsRegistry={sheetsRegistry}
    >
      {children}
    </StylesProvider>
  )
}
