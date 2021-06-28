import React from 'react'

import { Drawer } from 'react-storefront/drawer'

const argTypes = {
  open: {
    name: 'Open',
    type: { name: 'boolean', required: true },
    description: 'Open Drawer',
    control: {
      type: 'boolean'
    }
  },
  fullscreen: {
    name: 'Full Screen',
    type: { name: 'boolean', required: true },
    description: 'Open Drawer',
    control: {
      type: 'boolean'
    }
  },
  anchor: {
    name: 'Anchor',
    options: ['top', 'bottom', 'left', 'right'],
    control: {
      type: 'select'
    }
  },
  title: {
    name: 'Title',
    type: { name: 'String', required: true },
  },
  showCloseButton: {
    name: 'Show Close Button',
    type: {name: 'boolean', required: false},
  }
}

export default {
  component: Drawer,
  title: 'Design System/Molecules/Drawer',
  argTypes: argTypes,
  decorators: []
}

const Template = (args) =>
  <>
    <div>Use the controls to open the drawer.</div>
    <div>controls can be used when to close the drawer.</div>
    <Drawer {...args} >
      <div
        style={{
          height: 200,
          margin: 50,
          backgroundColor: 'silver',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        This is a drawer contents
      </div>
    </Drawer>
  </>
;

export const Default = Template.bind({});

Default.args = {
  open: true,
  fullscreen: false,
  anchor: 'left',
  title: 'Example Drawer',
  showCloseButton: true
}
