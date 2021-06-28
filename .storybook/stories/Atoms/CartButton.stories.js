import React from 'react'
import { CartButton } from 'react-storefront'

const argTypes = {
  cartCount: {
    name: 'Cart Count',
    type: { name: 'number', required: true },
    control: {
      type: 'number'
    }
  }
}

export default {
  component: CartButton,
  title: 'Design System/Atoms/CartButton',
  decorators: [],
  argTypes: argTypes
}

const Template = (args) => (
  <CartButton href="/cart" quantity={args.cartCount} />
)


export const Default = Template.bind({});

Default.args = {cartCount: 0}
