import React from 'react'
import { LoadMask } from 'react-storefront'

const argTypes = {
  show: {
    name: 'Show',
    type: { name: 'boolean', required: true },
    control: {
      type: 'boolean'
    }
  },
  transparent: {
    name: 'Transparent',
    type: { name: 'boolean', required: true },
    control: {
      type: 'boolean'
    }
  },
  align: {
    name: 'Align',
    options: ['center', 'top'],
    control: {
      type: 'select'
    }
  },
}
export default {
  component: LoadMask,
  title: 'Design System/Molecules/LoadMask',
  argTypes:argTypes,
  decorators: [] }

const Template = (args) => (
  <div>
    <LoadMask {...args}/>
    <div style={{ padding: 30 }}>This content is being masked.</div>
    <div style={{ padding: 30, backgroundColor: 'steelblue', color: 'white' }}>
      This content is also being masked.
    </div>
  </div>
)

export const Default = Template.bind({});

Default.args = {

}
