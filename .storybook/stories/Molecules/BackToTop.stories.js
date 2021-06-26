import React from 'react'
import { Pets } from '@material-ui/icons'
import { BackToTop } from 'react-storefront'

const argTypes = {
  size: {
    name: 'Size',
    type: { name: 'string', required: true },
    defaultValue: 'medium',
    options: ['small','medium','large'],
    control: {
      type: 'select'
    }
  }
};

export default {
  component: BackToTop,
  title: 'Design System/Molecules/BackToTop',
  argTypes:argTypes,
  decorators: []
};

const styles = {
  background: '#7f8fa6',
  color: '#f5f6fa',
  fontSize: 30,
  fontFamily: 'monospace',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 1500,
};

const Template = (args) => (
  <div>
    <div style={styles}>Please scroll down</div>
    <BackToTop {...args}/>
  </div>
);

export const Default = Template.bind({});

Default.args = {
  size: 'medium'
}

export const CustomIcon = Template.bind({});

CustomIcon.args = {
  size: 'medium',
  Icon: Pets
}
