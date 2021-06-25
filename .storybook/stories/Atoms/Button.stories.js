import React from 'react'
import {Button} from '@material-ui/core'

const argTypes = {
  label: {
    name: 'label',
    type: { name: 'string', required: true },
    defaultValue: 'Button',
    description: 'Text for the Button',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'Button' },
    },
    control: {
      type: 'text'
    }
  },
  variant: {
    name: 'variant',
    options: ['outlined', 'contained'],
    defaultValue: 'contained',
    description: 'Button Variants',
    control: {
      type: 'select'
    }
  },
  color: {
    name: 'color',
    options: ['primary','secondary'],
    control: {
      type: 'select'
    }
  },
  href: {
    name: 'href',
    control: {
      type: 'text'
    }
  },
  disabled: {
    name: 'disabled',
  },
  disableElevation: {
    name: 'disableElevation'
  }
}

export default {
  component: Button,
  title: 'Design System/Atoms/Button',
  argTypes: argTypes,
  decorators: [],
  parameters: { actions: { argTypesRegex: '^on.*' } },
}

const Template = (args) => <Button {...args} disabled={args.disabled} disableElevation={args.disableElevation}>{args.label}</Button>;

export const Default = Template.bind({});

Default.args = {
  label: 'Default',
  disabled: false,
  disableElevation: false,
}

Default.parameters = { pseudo: { hover: true } }

export const Primary = Template.bind({});

Primary.args = {
  ...Default.args,
  label: 'Primary',
  color: 'primary'
}

export const Secondary = Template.bind({});

Secondary.args = {
  ...Default.args,
  label: 'Secondary',
  color: 'secondary'
}

export const Disabled = Template.bind({});

Disabled.args = {
  ...Default.args,
  label: 'Disabled',
  disabled: true
}

export const Link = Template.bind({});

Link.args = {
  ...Default.args,
  label: 'Link',
  href: '#contained-buttons'
}


