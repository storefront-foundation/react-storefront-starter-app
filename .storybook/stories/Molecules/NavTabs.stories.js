import React from 'react'
import { NavTab } from 'react-storefront/nav'

export default { title: 'Design System/Molecules/NavTabs' }

export const defaults = () => (
  <div>
    <NavTab href="/c/[categoryId]" as="/c/shirts" label="Shirts"></NavTab>
    <NavTab href="/c/[categoryId]" as="/c/pants" label="Pants"></NavTab>
    <NavTab href="/c/[categoryId]" as="/c/socks" label="Socks"></NavTab>
    <NavTab href="/c/[categoryId]" as="/c/jackets" label="Jackets"></NavTab>
  </div>
)
