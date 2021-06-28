import React from 'react'
import { Carousel } from 'react-storefront/carousel'

const argTypes = {
  indicators: {
    name: 'Carousel Indicators',
    type: { name: 'boolean', required: false },
    control: {
      type: 'boolean'
    }
  },
  autoplay: {
    name: 'Carousel Autoplay',
    type: { name: 'boolean', required: false },
    control: {
      type: 'boolean'
    }
  },
  interval: {
    name: 'Carousel Interval',
    type: { name: 'number', required: false },
    control: {
      type: 'number'
    }
  },
  arrows: {
    name: 'Carousel Arrow',
    type: { name: 'number', required: false },
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
  <div style={{ ...slideStyle, background: '#eb3b5a' }} key="Red">Red</div>,
  <div style={{ ...slideStyle, background: '#2d98da' }} key="Blue">Blue</div>,
  <div style={{ ...slideStyle, background: '#26de81' }} key="Green">Green</div>,
]

const Template = (args) =>
  <Carousel {...args}>
    {args.slides}
  </Carousel>

export const Default = Template.bind({});

Default.args = {
  indicators: true,
  autoplay: true,
  interval: 1000,
  arrows: 'all',
  slides: slides
}
