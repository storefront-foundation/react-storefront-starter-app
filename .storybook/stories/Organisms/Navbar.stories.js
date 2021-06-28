
import NavBar from '../../../components/NavBar'
import { withNextRouter } from 'storybook-addon-next-router';
import React from 'react'

const argTypes = {
  tabs: {
    name: 'Navigation Bar Tabs',
  }
}

const defaultArgs = {tabs: [
    {
      as: `/s/1`,
      href: '/s/cat',
      text: `Category`,
    },     {
      as: `/s/withSubcat`,
      href: '/s/withSubcat',
      text: `With Sub-Categories`,
      items: [
        {
          as: `/s/subcat1`,
          href: '/s/subcat1',
          text: `Sub Catagory 1`
        },         {
          as: `/s/subcat2`,
          href: '/s/subcat2',
          text: `Sub Catagory 2`
        },
      ]
    }
  ]}

export default {
  component: NavBar,
  title: 'Design System/Organisms/Navigation',
  decorators: [withNextRouter],
  argTypes: argTypes,
  defaultArgs: defaultArgs
}

const Template = (args) => (
  <>
    <NavBar tabs={args.tabs}></NavBar>
  </>
)

export const Default = Template.bind({});

Default.args = defaultArgs
