import React from 'react'
import { Lazy } from 'react-storefront'
import { PWAContext } from 'react-storefront'

export default { title: 'Design System/Molecules/Lazy' }

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 200,
  background: '#7f8fa6',
  height: 500,
}

export const lazy = () => (
  <PWAContext.Provider value={{}}>
    <div style={{ fontSize: 30, textAlign: 'center' }}>
      Please scroll down
      <div>
        <Lazy>
          <div style={styles}>Hello</div>
        </Lazy>
        <Lazy>
          <div style={styles}>Hello</div>
        </Lazy>
        <Lazy>
          <div style={styles}>Hello</div>
        </Lazy>
        <Lazy>
          <div style={styles}>Hello</div>
        </Lazy>
      </div>
    </div>
  </PWAContext.Provider>
)
