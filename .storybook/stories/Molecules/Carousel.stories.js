import React from 'react'
import { Carousel } from 'react-storefront/carousel'

const argTypes = {
  indicators: {
    name: 'Indicators',
    type: { name: 'boolean', required: false },
    defaultValue: true,
    control: {
      type: 'boolean'
    }
  },
  autoplay: {
    name: 'Autoplay',
    type: { name: 'boolean', required: false },
    defaultValue: true,
    control: {
      type: 'boolean'
    }
  },
  interval: {
    name: 'Interval',
    type: { name: 'number', required: false },
    defaultValue: 1000,
    control: {
      type: 'number'
    }
  },
  arrows: {
    name: 'Arrow',
    type: { name: 'number', required: false },
    defaultValue: 1000,
    options: [false, 'desktop', 'all'],
    control: {
      type: 'select'
    }
  }
}
export default { title: 'Design System/Molecules/Carousel',
  component: Carousel,
  argTypes: argTypes,
  decorators: []
}

const slideStyle = {
  width: '100%',
  height: 300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'monospace',
  fontSize: 32,
  color: 'white',
}

const slides = [
  <div style={{ ...slideStyle, background: '#eb3b5a' }}>Red</div>,
  <div style={{ ...slideStyle, background: '#2d98da' }}>Blue</div>,
  <div style={{ ...slideStyle, background: '#26de81' }}>Green</div>,
]
const Template = (args) =>
  <Carousel {...args}>
    {slides}
  </Carousel>

export const Default = Template.bind({});

Default.args = {
  indicators: true,
  autoplay: true,
  interval: 1000,
  arrows: 'all'
}
