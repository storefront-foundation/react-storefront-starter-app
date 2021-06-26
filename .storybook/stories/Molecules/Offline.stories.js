import React from 'react'
import { Pets } from '@material-ui/icons'
import { Offline } from 'react-storefront'

const argTypes = {
  heading: {
    name: 'heading',
    type: { name: 'string', required: true },
    defaultValue: 'heading',
    description: 'heading for offline',
    control: {
      type: 'text'
    }
  },
  message: {
    name: 'message',
    type: { name: 'string', required: true },
    defaultValue: 'heading',
    description: 'heading for offline',
    control: {
      type: 'text'
    }
  }
}

export default {
  component: Offline,
  title: 'Design System/Molecules/Offline',
  decorators: [],
  argTypes: argTypes,
}

const Template = (args) => <Offline {...args}/>;

export const Default = Template.bind({});

Default.args = {
  heading: "This is a heading",
  message: "This is a message"
}

export const customIcon = Template.bind({});

customIcon.args = {
  ...Default.args,
  Icon: Pets
}
