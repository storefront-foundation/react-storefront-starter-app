import React from 'react'
import { Breadcrumbs } from 'react-storefront'


export default {
  Breadcrumbs,
  title: 'Design System/Atoms/Breadcrumbs',
  decorators: []
}

const Template = (args) => (
  <Breadcrumbs
    items={[
      { text: 'one', href: '/one' },
      { text: 'two', href: '/two' },
      { text: 'three', href: '/three' },
      { text: 'four', href: '/four' },
    ]}
  />
)
export const defaults = Template.bind({});
