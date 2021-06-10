import React from 'react'
import { CartButton } from 'react-storefront'

export default { title: 'CartButton' }

export const defaults = () => <CartButton href="/cart" quantity={1} />
